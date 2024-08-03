import { AccountUpdate, Field, Mina, PrivateKey } from 'o1js';
import { Square } from './Square.js';

const useProof = false;
const Local = await Mina.LocalBlockchain({ proofsEnabled: useProof });
Mina.setActiveInstance(Local);
const deployerAccount = Local.testAccounts[0];
const deployerKey = deployerAccount.key;
const senderAccount = Local.testAccounts[1];
const senderKey = senderAccount.key;

// 鍵ペアを生成
const zkAppPrivateKey = PrivateKey.random();
const zkAppAddress = zkAppPrivateKey.toPublicKey();

// create an instance of Square - and deploy it to zkAppAddress
const zkAppInstance = new Square(zkAppAddress);

// コントラクトをデプロイ用のトランザクションを作成
const deployTxn = await Mina.transaction(deployerAccount, async () => {
  AccountUpdate.fundNewAccount(deployerAccount);
  await zkAppInstance.deploy();
});
// トランザクションに署名して送信
await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();

// get the initial state of Square after deployment
const num0 = zkAppInstance.num.get();
console.log('state after init:', num0.toString());

// コントラクトの update メソッドを呼び出すトランザクションを作成する。
const txn1 = await Mina.transaction(senderAccount, async () => {
  await zkAppInstance.update(Field(9));
});

await txn1.prove();
// トランザクションに署名して送信
await txn1.sign([senderKey]).send();

const num1 = zkAppInstance.num.get();
console.log('state after txn1:', num1.toString());
