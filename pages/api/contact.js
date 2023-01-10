import nodemailer from 'nodemailer';

export default function handler(req, res) {
  console.log('Contact component');
  console.log(req.body);

  const { name, email, phone, message, sendEmailTo } = req.body;

  /*
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'madapeterr@gmail.com',
      subject: `Contact form submission from ${name}`,
      html: `<p>You have a contact form submission</p><br>
        <p><strong>Email: </strong> ${email}</p><br>
        <p><strong>Message: </strong> ${message}</p><br>
      `,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || error.toString() });
  }
  */
  //return res.status(200).json({ error: '' });

  res.status(200).json({ name: 'John Doe' });
}
