# MinaProtocol-MinHackathon

This repo for MinaProtocol-MinHackathon

## About this project

I created a meme coin on Mina Protocol for a mini hackathon!

## Update Point in MinaProtocol-MinHackathon

- script to generate a new key pair
- script to deploy a fungible token to the devnet
- script to mint a fungible token
- script to transfer fungible tokens

## How to work

Please run these scripts within the `fungible-token-sample` directory.

- install 

  ```bash
  npm i
  ```

- Generate a new key pair.

  ```bash
  npm run task examples/generate_key.ts
  ```

- Deploy to the devnet.

  ```bash
  npm run task examples/deploy_devnet.ts
  ```

  [deployed Tx](https://minascan.io/devnet/tx/5JuCziR1eSAAz3ocpf8Mv8RSNu8p9QSpHtywQrBY5LgoXhTdMw1F)

  Deployed Token

  - [MashTN - xR7E8xvJo2bX2kFGLSqrA9XTrdZRq1L89BdLxt9N3gCGqonqyn](https://minascan.io/devnet/token/xR7E8xvJo2bX2kFGLSqrA9XTrdZRq1L89BdLxt9N3gCGqonqyn/zk-txs)

- Mint a fungible token.

  ```bash
  npm run task examples/mint_devnet.ts
  ```

  [Mint Tx](https://minascan.io/devnet/tx/5Jur32w1Xc6juesY9hGNbV4AAfABsWxK22RrMNvUiWnNuzbatuwY)

- Transfer fungible tokens.

  ```bash
  npm run task examples/transfer_devnet.ts
  ```
  
  [Transfer Tx](https://minascan.io/devnet/tx/5JumaqMFAF1MeygQHmCvb9662rGC6FtB43z9URbEpEMzvG2TtZFL)
  
  [List of token holders](https://minascan.io/devnet/token/xR7E8xvJo2bX2kFGLSqrA9XTrdZRq1L89BdLxt9N3gCGqonqyn/holders)

### 参考文献

1. [writing-a-zkapp](https://docs.minaprotocol.com/zkapps/writing-a-zkapp)
2. [zkapp-development-frameworks](https://docs.minaprotocol.com/zkapps/zkapp-development-frameworks)
3. [GitHub - mina-fungible-token](https://github.com/MinaFoundation/mina-fungible-token)
4. [Mina Fungible Token Documentation](https://minafoundation.github.io/mina-fungible-token/deploy.html)
5. [examples/zkapps/](https://github.com/o1-labs/docs2/tree/main/examples/zkapps/)
6. [Mina Foundation Online Workshop for Building ZKApps with o1js](https://www.youtube.com/watch?v=LLule5GUkkg&t=4116s)
7. [作成した開発用ウォレット](https://minascan.io/devnet/tx/5JuPC4hhNb83ufKmuRtj97jSSbdDURLTwTb6vmJL6k3Bv7Zi6uA7)
8. [ファウセット用リンク](https://faucet.minaprotocol.com/?address=B62qoFHxcia11kauLdy6f9B8yfB9QUkMRDTJhrXoKEgkuDzDSGU9MgU&explorer=minascan)
9. [mina-fungible-token Docs](https://minafoundation.github.io/mina-fungible-token/)
10. [interacting-with-zkapps-server-side](https://docs.minaprotocol.com/zkapps/tutorials/interacting-with-zkapps-server-side)
11. [Tutorial 4: Build a zkApp UI in the Browser with React](https://docs.minaprotocol.com/zkapps/tutorials/zkapp-ui-with-react)