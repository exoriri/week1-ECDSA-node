import server from "../server";

function Wallet({ address, setAddress, balance, setBalance }) {
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <div className="balance">{address}</div>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
