## ECDSA Node

This project is a modified version of https://github.com/alchemyplatform/ecdsa-node. Main goal of project is to create web application that allows us to make secure transactions between client/server using Public Key Cryptography.

### Only users with existing wallet address and private key are allowed to make a transaction.
Before showing wallet inrerface to user, I implemented "fake authentication with mnemoic password". All mnemoic passwords to specific wallets can be in `server/index.js`.

**HINT**

To not writing full mnemoic by your hands you can copy it from `server/index.js` in `balances` object. Then, past it in `client/src/views/Authentication.jsx` to `prase` state.

***

When we click `confirm` button, I created a function which generates private key and public key. This private key allows to sign transaction and alogside with public key send transaction to server. Private key is generated on client and is not sended anywhere, so it can not be comprimised.

###Transeffing assets
After transaction created on `client` side it is sended to server with `POST`. On server using `secp.recoverPublicKey` from ethereum cryptography library we recover public key. Then, recovered public key compares with saved public key. This comparing gives understanding if transaction is authorized or not.


 
