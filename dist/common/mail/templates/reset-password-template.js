"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSubject = exports.resetPasswordHtml = void 0;
const resetPasswordHtml = `
  <p>Hello,</p>
  <p>Please click on <a href="%url%/reset-password?token=%token%">this link</a> to reset your account password. The link will expire at %expires_at%.</p>
  <p>If you did not request a password reset, please ignore this email.</p>
  <p>Best regards,</p>
  <p>Novo Nordisk</p>
`;
exports.resetPasswordHtml = resetPasswordHtml;
const resetPasswordSubject = 'Reset password';
exports.resetPasswordSubject = resetPasswordSubject;
//# sourceMappingURL=reset-password-template.js.map