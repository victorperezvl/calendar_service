const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const secretKey = process.env.CRYPTO_KEY; 
const iv = crypto.randomBytes(16);

//Encrypt
function encryptToken(token) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(token);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}
//Decrypt
function decryptToken(encryptedToken) {
  const [ivHex, encryptedHex] = encryptedToken.split(':');
  const ivBuffer = Buffer.from(ivHex, 'hex');
  const encryptedBuffer = Buffer.from(encryptedHex, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), ivBuffer);
  let decrypted = decipher.update(encryptedBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
