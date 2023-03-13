import { keccak256 } from 'ethereum-cryptography/keccak';
import utf8ToBytes from 'ethereum-cryptography/utils';
export default function hashMessage(msg) {
    return keccak256(utf8ToBytes(msg));
};