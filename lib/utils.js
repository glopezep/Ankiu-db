import crypto from 'crypto';

function encrypt(password) {
  const shasum = crypto.createHash('sha256');
  shasum.update(password);
  return shasum.digest('hex');
}

export default {
  encrypt,
};
