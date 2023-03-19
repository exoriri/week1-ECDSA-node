const {utf8ToBytes, toHex} = require('ethereum-cryptography/utils');
const {keccak256} = require('ethereum-cryptography/keccak');

const hashMessage = (msg) => keccak256(utf8ToBytes(msg));
const getHexAddressFromPublicKey = (pubKey) => {
    const pubKeyBytes = pubKey.slice(1, pubKey.length);
    //ethereum address
    const address = keccak256(pubKeyBytes).slice(-20);
    const hexAddress = toHex(address);

    return hexAddress;
}

module.exports = {
    hashMessage,
    getHexAddressFromPublicKey
}