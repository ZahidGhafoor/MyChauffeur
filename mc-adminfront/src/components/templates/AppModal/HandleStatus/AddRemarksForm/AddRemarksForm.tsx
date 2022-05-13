import { fields } from ".";
import { reduxForm } from "redux-form";
import Button from "components/atoms/Button";
import { modalActions } from "redux/slices/modal";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import ReduxFormFields from "components/molecules/ReduxFormFields";

function AddRemarksForm({ handleSubmit }: any) {
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.modal.data);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				{data.form === "Rejected" && <ReduxFormFields fields={fields} />}
				<br />
				<Button
					variant="outlined"
					sx={{ marginRight: "10px" }}
					onClick={() => dispatch(modalActions.closeModal())}
				>
					No
				</Button>
				<Button variant="contained" type="submit">
					Yes
				</Button>
			</form>
		</div>
	);
}
export default reduxForm({ form: "AddRemarksForm" })(AddRemarksForm);
