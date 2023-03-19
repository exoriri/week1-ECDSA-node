import { Button } from "@mui/material";

function Wallet({ address, balance, logout }) {
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <div className="balance">{address}</div>
      </label>

      <div className="balance" style={{ marginTop: 0 }}>Balance: {balance}</div>

      <Button 
        style={{ marginTop: 10, textAlign: 'left', alignSelf: 'flex-start' }} 
        variant="text"
        onClick={logout}
      >
        Log out
      </Button>
    </div>
  );
}

export default Wallet;
