import mongoose, { Document, Schema } from 'mongoose';

export interface IEmail {
  recipient: string;
  subject: string;
  body: string;
  timestamp: Date;
  responseProvider: Object
}

interface EmailDocument extends IEmail, Document {
  success: boolean;
  error: any;
}

const EmailSchema = new Schema<EmailDocument>({
  success: Boolean,
  error: Object,
  recipient: String,
  subject: String,
  body: String,
  timestamp: Date,
  responseProvider: Object
});

const EmailModel = mongoose.model<EmailDocument>('Email', EmailSchema);

export default EmailModel;
