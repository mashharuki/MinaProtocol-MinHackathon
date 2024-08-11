import * as dotenv from "dotenv";
import {AccountUpdate, Mina, PrivateKey, PublicKey, UInt64} from "o1js";
import {FungibleToken, FungibleTokenAdmin} from "./../index.js";

dotenv.config();

const {
  PRIVATE_KEY,
  TOKEN_PRIVATE_KEY,
  TOKEN_PUBLIC_KEY,
  ADMIN_PRIVATE_KEY,
  ADMIN_PUBLIC_KEY,
} = process.env;

const Network = Mina.Network("https://api.minascan.io/node/devnet/v1/graphql");
Mina.setActiveInstance(Network);

class MyToken extends FungibleToken {}
// comiple
await FungibleTokenAdmin.compile();
await FungibleToken.compile();
await MyToken.compile();

// トークン用のキー情報を設定
const tokenKey = PrivateKey.fromBase58(TOKEN_PRIVATE_KEY!);
const tokenAddress = PublicKey.fromBase58(TOKEN_PUBLIC_KEY!);
// Adminコントラクト用のキー情報を設定
const adminKey = PrivateKey.fromBase58(ADMIN_PRIVATE_KEY!);
const adminAddress = PublicKey.fromBase58(ADMIN_PUBLIC_KEY!);

// コントラクトのインスタンスを生成
const token = new MyToken(tokenAddress);
const fungibleTokenAdmin = new FungibleTokenAdmin(adminAddress);

// deployer
const deployerKey = PrivateKey.fromBase58(PRIVATE_KEY!);
const ownerKey = PrivateKey.fromBase58(PRIVATE_KEY!);
const owner = PublicKey.fromPrivateKey(ownerKey);

const fee = 100_000_000;

// トークン移転前のトークン保有量を取得
const ownerBalanceBeforeTransfer = (await token.getBalanceOf(owner)).toBigInt();
console.log("owner balance before transfer:", ownerBalanceBeforeTransfer);

const adminBalanceBeforeTransfer = (
  await token.getBalanceOf(adminAddress)
).toBigInt();
console.log("owner balance before transfer:", adminBalanceBeforeTransfer);

console.log("Transferring tokens from owner to admin");
const transferTx = await Mina.transaction(
  {
    sender: owner,
    fee,
  },
  async () => {
    AccountUpdate.fundNewAccount(owner, 1);
    await token.transfer(owner, adminAddress, new UInt64(1e9));
  }
);
await transferTx.prove();
transferTx.sign([ownerKey]);
const transferTxResult = await transferTx.send().then((v) => v.wait());
console.log("Transfer tx result:", transferTxResult.toPretty());

console.log(
  `See transaction at https://minascan.io/devnet/tx/${transferTxResult.hash}`
);

console.log("Transfer token done");

// トークン移転後のトークン保有量を取得
const ownerBalanceAfterTransfer = (await token.getBalanceOf(owner)).toBigInt();
console.log("owner balance before transfer:", ownerBalanceAfterTransfer);

const adminBalanceAfterTransfer = (
  await token.getBalanceOf(adminAddress)
).toBigInt();
console.log("owner balance before transfer:", adminBalanceAfterTransfer);
