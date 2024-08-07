import * as dotenv from "dotenv";
import {AccountUpdate, Mina, PrivateKey, PublicKey, UInt64} from "o1js";
import {FungibleToken} from "./../index.js";

dotenv.config();

const {PRIVATE_KEY} = process.env;

const Network = Mina.Network("https://api.minascan.io/node/devnet/v1/graphql");
Mina.setActiveInstance(Network);

class MyToken extends FungibleToken {}

const {privateKey: tokenKey, publicKey: tokenAddress} =
  PrivateKey.randomKeypair();
const token = new MyToken(tokenAddress);

// deployer
const deployerKey = PrivateKey.fromBase58(PRIVATE_KEY!);
const ownerKey = PrivateKey.fromBase58(PRIVATE_KEY!);
const owner = PublicKey.fromPrivateKey(ownerKey);
const deployer = PublicKey.fromPrivateKey(deployerKey);

const fee = 100_000_000;

console.log("Minting token");

// Mint token transaction
const mintTx = await Mina.transaction(
  {
    sender: owner,
    fee,
  },
  async () => {
    AccountUpdate.fundNewAccount(owner, 1);
    await token.mint(owner, new UInt64(2e9));
  }
);
await mintTx.prove();
mintTx.sign([ownerKey, tokenKey]);
const mintTxResult = await mintTx.send().then((v) => v.wait());
console.log("Mint tx result:", mintTxResult.toPretty());
