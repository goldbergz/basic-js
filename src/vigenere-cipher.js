const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error("Incorrect arguments!");
    }
    return this.process(message, key, true);
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error("Incorrect arguments!");
    }
    return this.process(encryptedMessage, key, false);
  }

  process(text, key, isEncrypt) {
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const shift = isEncrypt ? 1 : -1;
    text = text.toUpperCase();
    key = key.toUpperCase();
    let result = '';
    let keyIndex = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (ALPHABET.includes(char)) {
        const textCharIndex = ALPHABET.indexOf(char);
        const keyCharIndex = ALPHABET.indexOf(key[keyIndex % key.length]);
        const newIndex = (textCharIndex + shift * keyCharIndex + 26) % 26;
        result += ALPHABET[newIndex];
        keyIndex++;
      } else {
        result += char;
      }
    }
    if (!this.isDirect) {
      result = result.split('').reverse().join('');
    }
    return result;
  }
}

module.exports = {
  VigenereCipheringMachine
};
