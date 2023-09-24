import nodemailer, { getTestMessageUrl } from "nodemailer";
import path from "path";
import fs from "fs";
import handlebarts from 'handlebars'
import EmailRepository from "./email.repository";

type EmailTemplate = 'EXAMPLE'

interface IEmailProps {
  to: string;
  subject: string;
  variables: object;
  template: EmailTemplate;
}

class EmailProvider {
  private static instance: EmailProvider | null = null;
  private transporter: nodemailer.Transporter | undefined;
  private transporterReady: Promise<void>;
  repository: EmailRepository;

  private constructor() {
    this.repository = new EmailRepository();

    this.transporterReady = this.createTransporter().catch((err) => {
      console.error("Failed to create transporter. " + err.message);
      process.exit(1);
    });
  }

  public static getInstance(): EmailProvider {
    if (!this.instance) {
      this.instance = new EmailProvider();
    }
    return this.instance;
  }

  private async createTransporter(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      nodemailer.createTestAccount((err, account) => {
        if (err) {
          console.error("Failed to create a testing account. " + err.message);
          reject(err);
        }

        this.transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        resolve();
      });
    });
  }

  async sendEmail(dataEmail: IEmailProps) {
    const { to, subject, variables, template } = dataEmail;
    try {
      await this.transporterReady;
      if (!this.transporter) {
        throw new Error("Transporter is not defined");
      }

      const html = this.getEmailTemplate(template, variables);

      const info = await this.transporter.sendMail({
        from: "gustavo.lopesv3@gmail.com",
        to,
        subject,
        html: html,
      });

      await this.repository.saveEmailRegister({
        success: true,
        body: html,
        recipient: to,
        subject: subject,
        timestamp: new Date(),
        responseProvider: info,
      });
      console.log("Preview URL: %s", getTestMessageUrl(info));

      return info;
    } catch (error) {
      await this.repository.saveEmailRegister({
        success: false,
        body: '',
        recipient: to,
        subject: subject,
        timestamp: new Date(),
        responseProvider: {},
        error: error
      });
      throw error;
    }
  }

  getEmailTemplate(template: EmailTemplate, variables: object) {
    const mappedTemplates = {
      EXAMPLE: "example.hbs",
    };

    const pathTamplte = path.resolve("src", "templates", mappedTemplates[template]);
    console.log(pathTamplte);

    const templateFileContent = fs.readFileSync(pathTamplte).toString("utf-8");

    const mailTemplateParse = handlebarts.compile(templateFileContent);

    const html = mailTemplateParse(variables);

    return html;

  }
}

const emailProvider = EmailProvider.getInstance();

export default emailProvider;
