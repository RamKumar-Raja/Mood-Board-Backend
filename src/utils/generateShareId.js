import { randomBytes } from 'crypto';

export const generateShareId = () => {
  return randomBytes(8).toString('hex');
};
