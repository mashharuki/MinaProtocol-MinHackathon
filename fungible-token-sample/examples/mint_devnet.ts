import * as dotenv from "dotenv";
import {Mina, PrivateKey, PublicKey, UInt64} from "o1js";
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

// トークン発行前のトークン保有量を取得
const ownerBalanceBeforeMint = (await token.getBalanceOf(owner)).toBigInt();
console.log("owner balance before mint:", ownerBalanceBeforeMint);

console.log("Minting token");

// Mint token transaction
const mintTx = await Mina.transaction(
  {
    sender: owner,
    fee,
  },
  async () => {
    //AccountUpdate.fundNewAccount(owner, 2);
    await token.mint(owner, new UInt64(2e9));
  }
);
await mintTx.prove();
mintTx.sign([ownerKey, adminKey]);
const mintTxResult = await mintTx.send().then((v) => v.wait());
console.log("Mint tx result:", mintTxResult.toPretty());

console.log(
  `See transaction at https://minascan.io/devnet/tx/${mintTxResult.hash}`
);

console.log("Mint token done");

// トークン発行後のトークン保有量を取得
const ownerBalanceAfterMint = (await token.getBalanceOf(owner)).toBigInt();
console.log("owner balance after mint:", ownerBalanceAfterMint);
