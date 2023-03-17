import "./App.scss";
import { useEffect, useState } from "react";
import { Authentification } from "./views/Authentication";
import WalletDashboard from "./views/WalletDashboard";

function App() {
  const [walletData, setWalletData] = useState({
    privateKey: null,
    address: null
  });

  if (!walletData.privateKey) {
    return <Authentification 
      setPk={(pk) => setWalletData((prevState) => ({ 
        ...prevState, privateKey: pk 
      }))}
      setAddress={address => {
        setWalletData((prevState) =>({
          ...prevState,
          address,
        }))
      }}
    />
  };

  return (
    <WalletDashboard 
      privateKey={walletData.privateKey}
      address={walletData.address}
    />
  );
}

export default App;
