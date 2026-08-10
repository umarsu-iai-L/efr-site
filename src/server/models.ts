import mongoose from "mongoose";

interface ContactUsDocument {
  name: string;
  phone: string;
  email: string;
  message: string;
  submittedat: Date;
}

interface EmailSubscriptionDocument {
  email: string;
  subscribedAt: Date;
}

const contactUsSchema = new mongoose.Schema<ContactUsDocument>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, default: "" },
  submittedat: { type: Date, default: Date.now },
});

const emailSubscriptionSchema = new mongoose.Schema<EmailSubscriptionDocument>({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});

export const ContactUs =
  (mongoose.models.ContactUs as mongoose.Model<ContactUsDocument>) ||
  mongoose.model<ContactUsDocument>("ContactUs", contactUsSchema);
export const EmailSubscription =
  (mongoose.models.EmailSubscription as mongoose.Model<EmailSubscriptionDocument>) ||
  mongoose.model<EmailSubscriptionDocument>(
    "EmailSubscription",
    emailSubscriptionSchema,
  );
