const express = require("express");
const app = express();
const cors = require("cors");
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { hashMessage, getHexAddressFromPublicKey } = require("./helpers");

const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "265d5b8b5fe4c94eb52fd10c4da7bd8010b77576": {
    //hardcoded mnemonic
    secretPhrase: [
      "than",
      "example",
      "Icons",
      "Use",
      "button",
      "Complex",
      "Documents",
      "library",
      "Limitations",
      "Cursor",
      "Experimental",
      "person",
    ],
    balance: 100,
    publicKey: "",
  },
  "0dfecc0b74d17eb6677b486aa0d8c4411c6a6ae5": {
    //hardcoded mnemonic
    secretPhrase: [
      "advanced",
      "functions",
      "message",
      "considered",
      "study",
      "helpful",
      "cryptography",
      "where",
      "digital",
      "Computing",
      "possible",
      "important",
    ],
    balance: 50,
    publicKey: "",
  },
  "8ff770bfb85947595bdd0b48281c86978987ecdc": {
    //hardcoded mnemonic
    secretPhrase: [
      "encryption",
      "party",
      "private",
      "algorithms",
      "assumed",
      "same",
      "Signing",
      "Community",
      "reach",
      "connect",
      "Pace",
      "choose",
    ],
    balance: 50,
    publicKey: "",
  },
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address].balance || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { transaction, sign, recBit } = req.body;
  const { sender, recipient, amount } = transaction;

  const hashedTransaction = hashMessage(
    JSON.stringify({
      sender,
      recipient,
      amount,
    })
  );

  if (sender === recipient) {
    return res.status(400).send({
      message: 'You cannot transfer money to yourself!'
    })
  };

  const signedTransaction = new Uint8Array(Buffer.from(sign, "hex"));

  const pubKey = secp.recoverPublicKey(
    hashedTransaction,
    signedTransaction,
    parseInt(recBit, 10)
  );

  const wallet = balances[sender];
  const recipientWallet = balances[recipient];


  if (!wallet || !toHex(pubKey) === toHex(wallet.publicKey)) {
    return res.status(403).send({
      message: "You are not allowed to make a transaction",
    });
  }

  if (!recipientWallet) {
    return res.status(403).send({
      message: "Recepient address not found",
    });
  }

  if (wallet.balance < amount) {
    return res.status(400).send({ message: "Not enough funds!" });
  } else {
    wallet.balance -= amount;
    recipientWallet.balance += amount;
    return res.status(200).send({ balance: wallet.balance });
  }
});

app.post("/authenticate-wallet", (req, res) => {
  const { phrase, publicKey } = req.body;

  const foundWalletKey = Object.keys(balances).find((key) => {
    return (
      JSON.stringify(phrase) === JSON.stringify(balances[key].secretPhrase)
    );
  });

  if (!foundWalletKey) {
    res.status(403).send({ message: "12-key phrase is invalid" });
  } else {
    balances[foundWalletKey].publicKey = new Uint8Array(
      Buffer.from(publicKey, "hex")
    );

    res.status(200).send({ address: foundWalletKey });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
