import cryto from 'crypto';
var algorithm = "aes-192-cbc"; //algorithm to use
var password = "its a secret";
const key = crypto.scryptSync(password, 'salt', 24); //create key
var text= "this is the text to be encrypted"; //text to be encrypted

const iv = Buffer.alloc(16, 0);
const cipher = crypto.createCipheriv(algorithm, key, iv);
const decipher = crypto.createDecipheriv(algorithm, key, iv);

function encrypt(text){
    var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex'); // encrypted text
    return encrypted
}

function decrypt(text){
    var decrypted = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text
    return decrypted
}

console.log(encrypt('thus a boy'))

export {encrypt, decrypt}