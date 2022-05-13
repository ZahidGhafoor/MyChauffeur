import { change } from "redux-form";
import { useAppDispatch } from "redux/hooks";
import { modalActions } from "redux/slices/modal";
import ChildrenSeatsForm from "./ChildrenSeatsForm";

export default function ChildrenSeats() {
	const dispatch = useAppDispatch();

	const handleSubmit = (values: any) => {
		const form = "AddBookingForm";
		dispatch(change(form, "child_seats", values));
		dispatch(modalActions.closeModal());
	};

	return (
		<div>
			<h3>How many children seats?</h3>
			<ChildrenSeatsForm onSubmit={handleSubmit} />
		</div>
	);
}
