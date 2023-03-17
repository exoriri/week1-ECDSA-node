import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) {
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input 
          placeholder="Type an address, for example: 0x1" 
          value={address}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
