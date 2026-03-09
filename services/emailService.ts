import emailjs from "@emailjs/browser";

interface EmailData {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (data: EmailData): Promise<void> => {
  emailjs.init("Qj8YaSMY_iXhIdf5z"); // safe to call once or here

  await emailjs.send(
    "service_xx2l4pm",      // 🔹 Service ID
    "template_gzvngog",         // 🔹 Template ID
    {
      from_name: data.name,
      from_email: data.email,
      reply_to: data.email,
      message: data.message,
    }
  );
};
