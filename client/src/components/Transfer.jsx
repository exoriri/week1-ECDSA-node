import { Button } from "@mui/material";

function Transfer({ recipientAddress, amount, setRecipient, onAmountChange, transfer }) {
  const setValue = (setter) => (evt) => setter(evt.target.value);

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="Enter numeric amount"
          value={amount}
          onChange={onAmountChange}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipientAddress}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <Button style={{ marginTop: 10 }} type="submit" variant="contained">
        Transfer
      </Button>
    </form>
  );
}

export default Transfer;
