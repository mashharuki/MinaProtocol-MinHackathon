import {PrivateKey} from "o1js";

// 新しくキーペアを生成する
const {privateKey: tokenKey, publicKey: tokenAddress} =
  PrivateKey.randomKeypair();

console.log(`Private Key: ${tokenKey.toBase58()}`);
console.log(`Public Key: ${tokenAddress.toBase58()}`);
