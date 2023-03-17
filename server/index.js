const express = require("express");
const app = express();
const cors = require("cors");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex } = require("ethereum-cryptography/utils");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x1": {
    secretPhrase: ['than', 'example', 'Icons', 'Use', 'button', 'Complex', 'Documents', 'library', 'Limitations', 'Cursor', 'Experimental', 'person'],
    balance: 100
  },
  "0x2": {
    secretPhrase: ['advanced', 'functions', 'message', 'considered', 'study', 'helpful', 'cryptography', 'where', 'digital', 'Computing', 'possible', 'important'],
    balance: 50
  },
  "0x3": {
    secretPhrase: ['encryption', 'party', 'private', 'algorithms', 'assumed', 'same', 'Signing', 'Community', 'reach', 'connect', 'Pace', 'choose'],
    balance: 50
  },
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.post('/authenticate-wallet', (req, res) => {
  const { phrase } = req.body;
  
  const foundWalletKey = Object.keys(balances).find(key => {
    return JSON.stringify(phrase) === JSON.stringify(balances[key].secretPhrase)
  });
  
  if (!foundWalletKey) {
    res.status(403).send({ message: '12-key phrase is invalid' });
  } else {
    const pk = secp.utils.randomPrivateKey();
    const pubKey = secp.getPublicKey(pk);

    const pubKeyBytes = pubKey.slice(1, pubKey.length);
    //ethereum address
    const address = keccak256(pubKeyBytes).slice(-20);
    
    //next two lines changing strange address to correct one
    balances[address] = balances[foundWalletKey];
    delete balances[foundWalletKey];

    res.status(200).send({ privateKey: toHex(sha256(pk)), address })
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
