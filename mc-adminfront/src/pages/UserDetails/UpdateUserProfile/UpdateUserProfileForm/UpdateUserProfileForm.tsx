import Button from "components/atoms/Button";
import ReduxFormFields from "components/molecules/ReduxFormFields";
import { reduxForm } from "redux-form";
import { fields } from ".";

function UpdateUserProfileForm({ handleSubmit }: any) {
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
					Update
				</Button>
			</form>
		</div>
	);
}

export default reduxForm({ form: "UpdateUserProfileForm" })(
	UpdateUserProfileForm
);
