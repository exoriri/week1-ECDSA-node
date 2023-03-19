import "./App.scss";
import { useEffect, useState } from "react";
import { Authentification } from "./views/Authentication";
import WalletDashboard from "./views/WalletDashboard";

const INITIAL_WALLET_DATA = {
  privateKey: null,
  address: null
};

function App() {
  const [walletData, setWalletData] = useState(INITIAL_WALLET_DATA);

  const onLogout = () => {
    setWalletData(INITIAL_WALLET_DATA);
  };

  if (!walletData.privateKey) {
    return <Authentification 
      setWalletData={(pk, address) => setWalletData({
        privateKey: pk,
        address
      })}
    />
  };

  return (
    <WalletDashboard 
      logout={onLogout}
      privateKey={walletData.privateKey}
      address={walletData.address}
    />
  );
}

export default App;
