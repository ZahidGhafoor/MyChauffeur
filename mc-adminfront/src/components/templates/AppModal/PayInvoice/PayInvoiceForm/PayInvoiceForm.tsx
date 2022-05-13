import { fields } from ".";
import { useEffect } from "react";
import { useAppDispatch } from "redux/hooks";
import Button from "components/atoms/Button";
import { change, reduxForm } from "redux-form";
import { modalActions } from "redux/slices/modal";
import ReduxFormFields from "components/molecules/ReduxFormFields";

function PayInvoiceForm({ form, handleSubmit }: any) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(change(form, "payment_method", "Bank"));
	}, [dispatch, form]);

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

export default reduxForm({ form: "PayInvoiceForm" })(PayInvoiceForm);
