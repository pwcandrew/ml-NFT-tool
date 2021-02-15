# NFT Frontend Component

Web app to facilitate in launching NFT to Ethereum network and Matic network with the in-browser Metamask extension.

The target network is determined by Metamask current connection.

## Metamask connected to Matic

To get Metamask connected to Matic, please set the `Custom RPC` with the following info:

- `Network Name`: `Matic Mumbai Testnet` or `Matic Mainnet`
- `New RPC URL`: `https://rpc-mumbai.maticvigil.com` or `https://rpc-mainnet.maticvigil.com`
- `Chain ID`: `80001` or `137`
- `Currency symbol`: `MATIC`
- `Block explorer URL`: `https://mumbai-explorer.matic.today` or `https://explorer-mainnet.maticvigil.com`

## Installation

`npm i`

## Deployment

`pm2 start script_deploy.sh`

The frontend server is listenning at port `8080` (as specified in the `.env` file)

**Notice**

`pm2` tool needs to be installed (if not yet) with this cmd `npm i pm2 -g`

## Start With Development Mode

For development on localhost, please use the below command to start

`npm start`
