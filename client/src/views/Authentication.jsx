import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';
import { TextField, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import server from "../server";

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin: 20px 0;
`;

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const PHRASE_LENGTH = 12;

const fields = Array(PHRASE_LENGTH).fill(0);

export const Authentification = ({ setWalletData }) => {
  const [phrase, setPhrase] = useState([
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
  ]);

  const handlePhraseChange = (e) => {
    const index = e.target.name;
    const changingPhrase = [...phrase];
    changingPhrase[index] = e.target.value;
    setPhrase(changingPhrase);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const pk = secp.utils.randomPrivateKey();
    const pubKey = secp.getPublicKey(pk);

    try {
      const response = await server.post('/authenticate-wallet',{
          phrase,
          publicKey: toHex(pubKey)
      });
      setWalletData(pk, response.data.address);
    } catch(e){
      alert('Error on submitting phrase. Please, contact developer');
    }

  };

  return (
    <Container>
      <Typography variant="h4" component="h2">
        Type your Secret Recovery Phrase
      </Typography>
      <form name="twelve-phrases" onSubmit={onSubmit}>
        <InputGrid>
          {fields.map((field, i) => (
            <TextField
              required
              key={`phrase-${i}`}
              id="outlined-basic"
              label={`Enter phrase ${i + 1}`}
              variant="outlined"
              value={phrase[i]}
              name={i.toString()}
              onChange={handlePhraseChange}
            />
          ))}
        </InputGrid>
        <Button type="submit" variant="contained">
          Confirm
        </Button>
      </form>
    </Container>
  );
};
