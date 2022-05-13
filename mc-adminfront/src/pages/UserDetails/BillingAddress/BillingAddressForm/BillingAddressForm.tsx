import { reduxForm } from "redux-form";
import Button from "components/atoms/Button";
import ReduxFormFields from "components/molecules/ReduxFormFields";
import { fields } from ".";

function BillingAddressForm({ handleSubmit }: any) {
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<ReduxFormFields fields={fields} />
				<br />
				<Button
					type="submit"
					color="primary"
					disableElevation
					variant="contained"
				>
					Save
				</Button>
			</form>
		</div>
	);
}

export default reduxForm({ form: "BillingAddressForm" })(
	BillingAddressForm
);
