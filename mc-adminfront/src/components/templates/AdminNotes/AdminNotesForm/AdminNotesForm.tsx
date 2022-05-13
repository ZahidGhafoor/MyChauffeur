import { fields } from ".";
import { reduxForm } from "redux-form";
import Button from "components/atoms/Button";
import ReduxFormFields from "components/molecules/ReduxFormFields";

function AdminNotesForm({ handleSubmit }: any) {
  return (
    <div style={{marginTop: "20px"}}>
      <form onSubmit={handleSubmit}>
        <ReduxFormFields fields={fields} />
        <Button
          fullWidth
          color="primary"
          variant="contained"
          disableElevation
          type="submit"
          sx={{marginTop: "10px"}}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default reduxForm({ form: "AdminNotesForm" })(AdminNotesForm);
