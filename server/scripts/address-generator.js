const secp = require('ethereum-cryptography/secp256k1');
const {getHexAddressFromPublicKey} = require('../helpers');

const generateAddress = () => {
    const privateKey = secp.utils.randomPrivateKey();
    const publicKey = secp.getPublicKey(privateKey);
    return getHexAddressFromPublicKey(publicKey);
}

console.log('Generated address===', generateAddress());