import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import { Authentification } from "./views/Authentication";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [pk, setPk] = useState(null);

  if (!pk) {
    return <Authentification />
  }

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
