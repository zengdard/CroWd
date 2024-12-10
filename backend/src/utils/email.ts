import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'noreply@example.com',
    to: email,
    subject: 'Vérifiez votre adresse email',
    html: `
      <h1>Bienvenue sur notre plateforme</h1>
      <p>Cliquez sur le lien suivant pour vérifier votre adresse email :</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
    `
  });
}; 