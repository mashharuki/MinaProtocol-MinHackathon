# Mina zkApp: PROJECT_NAME

This template uses TypeScript.

## How to build

```sh
npm run build
```

## How to run tests

```sh
npm run test
npm run testw # watch mode
```

## How to run coverage

```sh
npm run coverage
```

## How to deploy

```bash
zk deploy devwallet
```

デプロイした記録

```bash
  ┌─────────────────┬─────────────────────────────────────────────────────────────────────────┐
  │ Deploy alias    │ devwallet                                                               │
  ├─────────────────┼─────────────────────────────────────────────────────────────────────────┤
  │ Network kind    │ testnet                                                                 │
  ├─────────────────┼─────────────────────────────────────────────────────────────────────────┤
  │ URL             │ https://api.minascan.io/node/devnet/v1/graphql                          │
  ├─────────────────┼─────────────────────────────────────────────────────────────────────────┤
  │ Fee payer       │ Alias         : devwallet                                               │
  │                 │ Account       : B62qoFHxcia11kauLdy6f9B8yfB9QUkMRDTJhrXoKEgkuDzDSGU9MgU │
  ├─────────────────┼─────────────────────────────────────────────────────────────────────────┤
  │ zkApp           │ Smart contract: Square                                                  │
  │                 │ Account       : B62qpinSPMRa5wx3DLiQqizKWaRYuZ7tWMtUcEuAgCpU8SsfNiUFgq6 │
  ├─────────────────┼─────────────────────────────────────────────────────────────────────────┤
  │ Transaction fee │ 0.1 Mina                                                                │
  └─────────────────┴─────────────────────────────────────────────────────────────────────────┘

  Are you sure you want to send (yes/no)? · yes
✔ Send to network

Success! Deploy transaction sent.

Next step:
  Your smart contract will be live (or updated)
  at B62qpinSPMRa5wx3DLiQqizKWaRYuZ7tWMtUcEuAgCpU8SsfNiUFgq6
  as soon as the transaction is included in a block:
  https://minascan.io/devnet/tx/5Ju726SDTmXAoBTcRCXGL2Bf9ejmHm5vReuwMiZN8YD1k6ZzJ4Xv?type=zk-tx
```

## License

[Apache-2.0](LICENSE)
