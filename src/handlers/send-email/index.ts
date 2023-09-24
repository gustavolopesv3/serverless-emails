import { SQSEvent } from "aws-lambda";
import emailProvider from "../../providers/email";
import mongodb from "../../providers/db/mongodb";

async function handler(event: SQSEvent) {
    await mongodb.connect();

  const responses = Promise.all(
    event.Records.map(async (record) => {
      try {
        const body = JSON.parse(record.body);
        const { to, subject, variables, template } = body;
        await emailProvider.sendEmail({
            to,
            subject,
            template,
            variables
        });

        return {
          success: true,
          body: JSON.stringify(body),
        };
      } catch (error) {
        return {
          success: false,
          body: JSON.stringify(error),
        };
      }
    })
  );

  console.log(await responses);
    return responses;
}

const mockData = {
  Records: [
    {
      body: JSON.stringify({
        to: "teste1",
        subject: "Teste 1",
        template: 'EXAMPLE',
        variables: {
            name: "Gustavo Lopes",
            message: "Teste de envio de email1",
            },
      }),
    },
    {
      body: JSON.stringify({
        to: "teste2@email.com",
        subject: "Teste 2",
        template: 'EXAMPLE',
        variables: {
            name: "Gustavo Lopes",
            message: "Teste de envio de email2",
            },
      }),
    },
  ],
} as SQSEvent;

handler(mockData);
