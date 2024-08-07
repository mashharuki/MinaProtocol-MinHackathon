import * as dotenv from "dotenv";
import {AccountUpdate, Mina, PrivateKey, PublicKey, UInt64} from "o1js";
import {FungibleToken} from "./../index.js";

dotenv.config();

const {PRIVATE_KEY} = process.env;

const Network = Mina.Network("https://api.minascan.io/node/devnet/v1/graphql");
Mina.setActiveInstance(Network);

class MyToken extends FungibleToken {}

// comiple
await FungibleToken.compile();
await MyToken.compile();

console.log("Compiling done");

const {privateKey: tokenKey, publicKey: tokenAddress} =
  PrivateKey.randomKeypair();
const token = new MyToken(tokenAddress);

// deployer
const deployerKey = PrivateKey.fromBase58(PRIVATE_KEY!);
const ownerKey = PrivateKey.fromBase58(PRIVATE_KEY!);
const owner = PublicKey.fromPrivateKey(ownerKey);
const deployer = PublicKey.fromPrivateKey(deployerKey);

const supply = UInt64.from(21_000_000);
const symbol = "MYTKN";
const src =
  "https://github.com/MinaFoundation/mina-fungible-token/blob/main/FungibleToken.ts";

const fee = 100_000_000;

console.log("Deploying token");

// deploy the token
const tx = await Mina.transaction({sender: deployer, fee}, async () => {
  AccountUpdate.fundNewAccount(deployer, 1);
  token.deploy({
    symbol,
    src,
  });
});
// sign & send Tx
tx.sign([deployerKey, tokenKey]);
await tx.prove();
let pendingTransaction = await tx.send();

if (pendingTransaction.status === "rejected") {
  console.log("error sending transaction (see above)");
  process.exit(0);
}

console.log(
  `See transaction at https://minascan.io/devnet/tx/${pendingTransaction.hash}`
);
console.log("Waiting for transaction to be included in a block");
await pendingTransaction.wait();

console.log("Token deployed!!!!");
