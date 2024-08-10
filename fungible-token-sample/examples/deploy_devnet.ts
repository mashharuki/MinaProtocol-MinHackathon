import * as dotenv from "dotenv";
import {
  AccountUpdate,
  Bool,
  Mina,
  PrivateKey,
  PublicKey,
  UInt64,
  UInt8,
} from "o1js";
import {FungibleToken, FungibleTokenAdmin} from "./../index.js";

dotenv.config();

const {PRIVATE_KEY, TOKEN_PRIVATE_KEY, TOKEN_PUBLIC_KEY, ADMIN_PRIVATE_KEY} =
  process.env;

const Network = Mina.Network("https://api.minascan.io/node/devnet/v1/graphql");
Mina.setActiveInstance(Network);

class MyToken extends FungibleToken {}

// comiple
await FungibleTokenAdmin.compile();
await FungibleToken.compile();
await MyToken.compile();

console.log("Compiling done");

// トークン用のキーペアを生成
const {privateKey: tokenKey, publicKey: tokenAddress} =
  PrivateKey.randomKeypair();

console.log(`Token Private Key: ${tokenKey.toBase58()}`);
console.log(`Token Public Key: ${tokenAddress.toBase58()}`);
const token = new MyToken(tokenAddress);

// admin用のキーペアを生成
const {privateKey: adminKey, publicKey: adminAddress} =
  PrivateKey.randomKeypair();

console.log(`AdminFungibleToken Private Key: ${adminKey.toBase58()}`);
console.log(`AdminFungibleToken Public Key: ${adminAddress.toBase58()}`);

// deployer
const deployerKey = PrivateKey.fromBase58(PRIVATE_KEY!);
const ownerKey = PrivateKey.fromBase58(PRIVATE_KEY!);
const admin = PrivateKey.fromBase58(ADMIN_PRIVATE_KEY!);
const owner = PublicKey.fromPrivateKey(ownerKey);
const deployer = PublicKey.fromPrivateKey(deployerKey);
const adminer = PublicKey.fromPrivateKey(admin);

const fungibleTokenAdmin = new FungibleTokenAdmin(adminAddress);

const supply = UInt64.from(21_000_000);
const symbol = "MashTN";
const src =
  "https://github.com/MinaFoundation/mina-fungible-token/blob/main/FungibleToken.ts";

const fee = 100_000_000;

console.log("Deploying token");

// deploy the token
const tx = await Mina.transaction({sender: deployer, fee}, async () => {
  AccountUpdate.fundNewAccount(deployer, 3);
  await fungibleTokenAdmin.deploy({adminPublicKey: adminAddress});
  await token.deploy({
    symbol,
    src,
  });
  await token.initialize(adminAddress, UInt8.from(9), Bool(false));
});

await tx.prove();
// sign & send Tx
tx.sign([deployerKey, tokenKey, adminKey]);
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

/*
console.log("deploying FungibleTokenAdmin");

// deploy the FungiTokenAdmin
const tx2 = await Mina.transaction({sender: adminer, fee}, async () => {
  AccountUpdate.fundNewAccount(adminer, 1);
  fungibleTokenAdmin.deploy({adminPublicKey: adminAddress});
  token.initialize(adminAddress, UInt8.from(9), Bool(false));
});

await tx2.prove();
// sign & send Tx
tx2.sign([admin, deployerKey, adminKey]);
let pendingTransaction2 = await tx2.send();

if (pendingTransaction2.status === "rejected") {
  console.log("error sending transaction (see above)");
  process.exit(0);
}

console.log(
  `See transaction at https://minascan.io/devnet/tx/${pendingTransaction2.hash}`
);
console.log("Waiting for transaction to be included in a block");
await pendingTransaction2.wait();

console.log("FungibleTokenAdmin deployed!!!!");
*/
