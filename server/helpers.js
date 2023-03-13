import {utf8ToBytes} from 'ethereum-cryptography/utils';
import {keccak256} from 'ethereum-cryptography';
export const hashMessage = () => keccak256(utf8ToBytes(msg));