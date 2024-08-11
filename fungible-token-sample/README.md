# `mina-fungible-token`

Standard implementation of fungible tokens in Mina, as per
[RFC14: Fungible Token Standard on Mina](https://github.com/o1-labs/rfcs/blob/main/0014-fungible-token-standard.md).

This implementation is currently a beta. We do not expect the API to change anytime soon. We are
awaiting an audit of the code before removing the beta status.

## Running tests

```sh
npm run test
```

If you want disable proof generation during testing, you can do so via

```sh
SKIP_PROOFS=true npm run test
```

The tests will run much faster that way, which is nice when you're testing locally while developing.
Note that this will skip one test does

## Running [Examples](./examples)

```sh
npm i
npm run task examples/<example-file-name>.ts
```

## genereate net KeyPair

```bash
npm run task examples/generate_key.ts
```

## Deploy Contract

```bash
npm run task examples/e2e.eg.ts
```

## Deploy devnet

```bash
npm run task examples/deploy_devnet.ts
```

```bash
Deploying token
See transaction at https://minascan.io/devnet/tx/5JuCziR1eSAAz3ocpf8Mv8RSNu8p9QSpHtywQrBY5LgoXhTdMw1F
Waiting for transaction to be included in a block
```

Deployed Token

[MashTN - xR7E8xvJo2bX2kFGLSqrA9XTrdZRq1L89BdLxt9N3gCGqonqyn](https://minascan.io/devnet/token/xR7E8xvJo2bX2kFGLSqrA9XTrdZRq1L89BdLxt9N3gCGqonqyn/zk-txs)

## mint Token

```bash
npm run task examples/mint_devnet.ts
```

```bash
owner balance before mint: 0n
Minting token
See transaction at https://minascan.io/devnet/tx/5Jur32w1Xc6juesY9hGNbV4AAfABsWxK22RrMNvUiWnNuzbatuwY
Mint token done
owner balance after mint: 0n
```

[mintTx](https://minascan.io/devnet/tx/5Jur32w1Xc6juesY9hGNbV4AAfABsWxK22RrMNvUiWnNuzbatuwY)

## trasnfer Token

```bash
npm run task examples/transfer_devnet.ts
```

```bash
Transferring tokens from owner to admin
See transaction at https://minascan.io/devnet/tx/5JumaqMFAF1MeygQHmCvb9662rGC6FtB43z9URbEpEMzvG2TtZFL
Transfer token done
```

[transferTx](https://minascan.io/devnet/tx/5JumaqMFAF1MeygQHmCvb9662rGC6FtB43z9URbEpEMzvG2TtZFL)

## Token Holder Info

[Token Holder Info](https://minascan.io/devnet/token/xR7E8xvJo2bX2kFGLSqrA9XTrdZRq1L89BdLxt9N3gCGqonqyn/holders)

## License

`mina-fungible-token` is [Apache licensed](LICENSE).
