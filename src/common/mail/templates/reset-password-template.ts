type ResetPasswordTemplate = {
  email: string;
  url: string;
  token: string;
  expires_at: string;
};

const resetPasswordHtml = `
  <p>Hello,</p>
  <p>Please click on <a href="%url%/reset-password?token=%token%">this link</a> to reset your account password. The link will expire at %expires_at%.</p>
  <p>If you did not request a password reset, please ignore this email.</p>
  <p>Best regards,</p>
  <p>Novo Nordisk</p>
`;

const resetPasswordSubject = 'Reset password';

export { resetPasswordHtml, resetPasswordSubject, ResetPasswordTemplate };
