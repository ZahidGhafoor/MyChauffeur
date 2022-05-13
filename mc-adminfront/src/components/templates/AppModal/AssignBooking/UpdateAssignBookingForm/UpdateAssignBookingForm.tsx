import { useEffect } from "react";
import { change } from "redux-form";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function UpdateAssignBookingForm() {
	const form = "AssignBooking";
	const dispatch = useAppDispatch();
	const booking = useAppSelector((state) => state.booking.booking);

	useEffect(() => {
		dispatch(change(form, "driver", booking?.driver_id));
		dispatch(change(form, "partner", booking?.partner_id));
	}, [booking?.driver_id, booking?.partner_id, dispatch]);

	return null;
}
