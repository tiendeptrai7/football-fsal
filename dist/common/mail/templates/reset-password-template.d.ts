type ResetPasswordTemplate = {
    email: string;
    url: string;
    token: string;
    expires_at: string;
};
declare const resetPasswordHtml = "\n  <p>Hello,</p>\n  <p>Please click on <a href=\"%url%/reset-password?token=%token%\">this link</a> to reset your account password. The link will expire at %expires_at%.</p>\n  <p>If you did not request a password reset, please ignore this email.</p>\n  <p>Best regards,</p>\n  <p>Novo Nordisk</p>\n";
declare const resetPasswordSubject = "Reset password";
export { resetPasswordHtml, resetPasswordSubject, ResetPasswordTemplate };
