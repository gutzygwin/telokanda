const crypto = require('crypto')

function encrypt(text){
    var cipher = crypto.createCipher('aes-256-cbc',process.env.REACT_APP_SECRET_KEY)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }
  
  function decrypt(text){
    var decipher = crypto.createDecipher('aes-256-cbc',process.env.REACT_APP_SECRET_KEY)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }
  

module.exports = {
    encrypt,
    decrypt
}