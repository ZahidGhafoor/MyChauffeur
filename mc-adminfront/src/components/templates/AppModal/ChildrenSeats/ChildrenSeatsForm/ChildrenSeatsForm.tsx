import { fields } from ".";
import { Stack } from "@mui/material";
import { reduxForm } from "redux-form";
import Button from "components/atoms/Button";
import { modalActions } from "redux/slices/modal";
import FieldError from "components/atoms/FieldError";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import ReduxFormFields from "components/molecules/ReduxFormFields";

function ChildrenSeatsForm({ handleSubmit }: any) {
	const form = "ChildrenSeatsForm";
	const dispatch = useAppDispatch();
	const values: any = useAppSelector((state) => state.form?.[form]);
	const error =
		values?.fields &&
		values?.syncErrors &&
		values?.syncErrors?.one_to_three_years;

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<ReduxFormFields fields={fields} />
				<br />
				{error && <FieldError error={error} />}
				<br />
				<Stack direction="row" spacing={2}>
					<Button
						color="secondary"
						variant="outlined"
						onClick={() => dispatch(modalActions.closeModal())}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						disableElevation
						variant="contained"
						color="primary"
					>
						Save
					</Button>
				</Stack>
			</form>
		</div>
	);
}

export default reduxForm({ form: "ChildrenSeatsForm" })(ChildrenSeatsForm);
