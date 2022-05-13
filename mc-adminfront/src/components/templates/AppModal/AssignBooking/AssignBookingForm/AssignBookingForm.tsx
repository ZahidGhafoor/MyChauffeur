import { fields } from ".";
import { reduxForm } from "redux-form";
import Button from "components/atoms/Button";
import { modalActions } from "redux/slices/modal";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import UpdateAssignBookingForm from "../UpdateAssignBookingForm";
import ReduxFormFields from "components/molecules/ReduxFormFields";

function AssignBooking({ handleSubmit }: any) {
	const dispatch = useAppDispatch();
	const partner_id = useAppSelector(
		(state) => state.booking.booking?.partner_id
	);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<ReduxFormFields fields={fields} />
				<br />
				<Button
					variant="outlined"
					onClick={() => dispatch(modalActions.closeModal())}
					sx={{ marginRight: "10px" }}
				>
					Cancel
				</Button>
				<Button type="submit" variant="contained">
					Submit
				</Button>
				{partner_id && <UpdateAssignBookingForm />}
			</form>
		</div>
	);
}

export default reduxForm({ form: "AssignBooking" })(AssignBooking);
