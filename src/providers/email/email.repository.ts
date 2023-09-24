import EmailModel, { IEmail } from "./email.model";

interface ISaveEmailRegister extends IEmail {
    success: boolean;
    error?: any;
}

class EmailRepository {
    constructor() {
     }

    async saveEmailRegister(data: ISaveEmailRegister) {
        const emailModel = new EmailModel(data);
        return emailModel.save();
    }
}

export default EmailRepository