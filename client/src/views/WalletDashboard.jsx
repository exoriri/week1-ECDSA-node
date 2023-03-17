import { useEffect, useState } from "react";
import Wallet from "../Wallet";
import Transfer from "../Transfer";
import server from '../server';
import Loader from "../components/Loader";

const fakeDelayedResponse = (data) => {
    return new Promise((res) => {
        setTimeout(() => {
            res(data);
        }, 1000)
    })
};

const WalletDashboard = ({ address, privateKey }) => {
  const [balance, setBalance] = useState(0);
  const [isPageLoading, setPageLoading] = useState(true);

  const onTransferMoney = () => {
    
  };

  const loadBalance = async () => {
    const res = await server.get(`/balance/${address}`);
    const balance = await fakeDelayedResponse(res.data.balance);
    setBalance(balance);
    setPageLoading(false);
  };
  
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  useEffect(() => {
    loadBalance();
  },[]);

  if (isPageLoading) {
    return <Loader />;
  }

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
      />
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
};

export default WalletDashboard;
