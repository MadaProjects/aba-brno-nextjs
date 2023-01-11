import nodemailer from 'nodemailer';

const sendEmail = async (req, res) => {};

export default async function handler(req, res) {
  const { name, email, phone, message, sendEmailTo } = req.body;

  const primaryEmailRecipient = sendEmailTo
    ? sendEmailTo
    : process.env.MAIN_EMAIL;
  const primaryEmailRecipientCC = process.env.SEND_CC_EMAIL;

  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  try {
    const info = await transporter.sendMail({
      from: '"Example Team" <from@example.com>',
      to: primaryEmailRecipient,
      cc: primaryEmailRecipientCC,
      subject: `Nova zpráva z ABA Brno`,
      html: `<p>You have a contact form submission</p><br>
        <p><strong>Jméno: </strong> ${name}</p><br>
        <p><strong>Email: </strong> ${email}</p><br>
        <p><strong>Telefon: </strong> ${phone}</p><br>
        <p><strong>Zpráva: </strong> ${message}</p><br>
      `,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || error.toString() });
  }

  return res.status(200).json({ message: 'Zprava úspěšně odeslána' });
}
