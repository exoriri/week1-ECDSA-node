import { TextField, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";

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

const fields = Array(12).fill(0);

export const Authentification = () => {
  return (
    <Container>
      <Typography variant="h4" component="h2">
        Type your Secret Recovery Phrase
      </Typography>
      <InputGrid>
        {fields.map((field, i) => (
          <TextField
            required
            id="outlined-basic"
            label={`Enter phrase ${i + 1}`}
            variant="outlined"
          />
        ))}
      </InputGrid>
      <Button variant="contained">Confirm</Button>
    </Container>
  );
};
