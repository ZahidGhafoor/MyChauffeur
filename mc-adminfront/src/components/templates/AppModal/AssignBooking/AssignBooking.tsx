import AssignBookingForm from "./AssignBookingForm";
import BookingService from "services/booking.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function AssignBooking() {
	const dispatch = useAppDispatch();
	const _id = useAppSelector((state) => state.booking.booking?._id);

	const handleSubmit = async (values: any) => {
		const data = { partner_id: values.partner, driver_id: values.driver };
		BookingService.assignBooking(_id, data, dispatch);
	};

	return (
		<div>
			<h3>Assign Booking</h3>
			<p>Select partner and chauffuer to assign this booking.</p>
			<AssignBookingForm onSubmit={handleSubmit} />
		</div>
	);
}
