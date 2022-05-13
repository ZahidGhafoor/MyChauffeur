import { fields } from ".";
import { reduxForm } from "redux-form";
import Button from "components/atoms/Button";
import { useAppDispatch } from "redux/hooks";
import { modalActions } from "redux/slices/modal";
import ReduxFormFields from "components/molecules/ReduxFormFields";

function AddNotesForm({ handleSubmit }: any) {
	const dispatch = useAppDispatch();

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<ReduxFormFields fields={fields} />
				<br />
				<Button
					variant="outlined"
					sx={{ marginRight: "10px" }}
					onClick={() => dispatch(modalActions.closeModal())}
				>
					Cancel
				</Button>
				<Button type="submit" variant="contained">
					Submit
				</Button>
			</form>
		</div>
	);
}

export default reduxForm({ form: "AddNotesForm" })(AddNotesForm);
