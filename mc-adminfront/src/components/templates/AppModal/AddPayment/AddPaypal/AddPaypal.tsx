import { Button } from "@mui/material";
import "./Add-paypal.css";

export default function AddPaypal() {
  return (
    <div className="add-paypal">
      <Button
        fullWidth
        size="large"
        variant="contained"
        color="secondary"
        sx={{ maxWidth: "300px" }}
      >
        Paypal
      </Button>
    </div>
  );
}
