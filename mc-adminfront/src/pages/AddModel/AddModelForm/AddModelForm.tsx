import { fields } from ".";
import { reduxForm } from "redux-form";
import Calculations from "./Calculations";
import Button from "components/atoms/Button";
import ReduxFormFields from "components/molecules/ReduxFormFields";

function AddModelForm({ handleSubmit }: any) {
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<ReduxFormFields fields={fields} />
				<br />
				<Button color="primary" variant="contained" type="submit">
					Submit
				</Button>
			</form>
			<Calculations />
		</div>
	);
}

export default reduxForm({ form: "AddModelForm" })(AddModelForm);
