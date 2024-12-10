import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

interface TOTPResponse {
  base32: string;
  qrCode: string;
}

export const generateTOTP = async (): Promise<TOTPResponse> => {
  const secret = speakeasy.generateSecret({
    name: process.env.APP_NAME || 'CrowdFunding'
  });

  const qrCode = await QRCode.toDataURL(secret.otpauth_url || '');

  return {
    base32: secret.base32,
    qrCode
  };
};

export const verifyTOTP = (secret: string, token: string): boolean => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token
  });
}; 