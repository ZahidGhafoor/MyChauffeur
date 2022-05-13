import { reduxForm } from "redux-form";
import Button from "components/atoms/Button";
import ReduxFormFields from "components/molecules/ReduxFormFields";
import { fields } from ".";

function AddPaymentForm({ handleSubmit }: any) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ReduxFormFields fields={fields} />
        <br />
        <Button
          color="secondary"
          disableElevation
          size="large"
          variant="contained"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default reduxForm({ form: "AddPaymentForm" })(AddPaymentForm);
