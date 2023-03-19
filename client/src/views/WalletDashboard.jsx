import { useEffect, useState } from "react";
import * as secp from 'ethereum-cryptography/secp256k1';
import { keccak256}  from 'ethereum-cryptography/keccak';
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils';
import Wallet from "../components/Wallet";
import Transfer from "../components/Transfer";
import server from '../server';
import Loader from "../components/Loader/Loader";

import styled from '@emotion/styled';

/**
 * Addresses:
 * 265d5b8b5fe4c94eb52fd10c4da7bd8010b77576
 * 0dfecc0b74d17eb6677b486aa0d8c4411c6a6ae5
 * 8ff770bfb85947595bdd0b48281c86978987ecdc
*/

const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const fakeDelayedResponse = (data) => {
    return new Promise((res) => {
        setTimeout(() => {
            res(data);
        }, 1500)
    })
};

const WalletDashboard = ({ address, privateKey, logout }) => {
  const [balance, setBalance] = useState(0);
  const [isPageLoading, setPageLoading] = useState(true);
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  
  const onTransferMoney = async (e) => {
    e.preventDefault();
    const transaction = {
      sender: address,
      recipient,
      amount: parseInt(sendAmount, 10)
    };
    const transactionBytes = utf8ToBytes(JSON.stringify(transaction));
    const hashedTrasaction = keccak256(transactionBytes);
    
    const [sign, recBit] = await secp.sign(hashedTrasaction, privateKey, { recovered: true });

    try {
      const res = await server.post('/send', {
        transaction,
        sign: toHex(sign),
        recBit,
        privateKey
      });
      setBalance(res.data.balance);
      alert('Transferred successfully')
    } 
    catch (e) {
      alert(e.response.data.message);
    }
  
  };
  const loadBalance = async () => {
    const res = await server.get(`/balance/${address}`);
    const balance = await fakeDelayedResponse(res.data.balance);
    setBalance(balance);
    setPageLoading(false);
  };

  const onAmountChange = (e) => {
    let {value} = e.target;
    value = value.replace(/[^0-9]/g, '');
    setSendAmount(value);
  };

  useEffect(() => {
    loadBalance();
  },[]);

  if (isPageLoading) {
    return <LoaderContainer>
      <Loader />
    </LoaderContainer>;
  }

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        logout={logout}
      />
      <Transfer 
        amount={sendAmount}
        address={address} 
        recipientAddress={recipient}
        onAmountChange={onAmountChange}
        setRecipient={setRecipient} 
        transfer={onTransferMoney}
      />
    </div>
  );
};

export default WalletDashboard;
