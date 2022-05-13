import BookingService from "services/booking.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import UpdateBookingStatusForm from "./UpdateBookingStatusForm";

export default function UpdateBookingStatus() {
	const dispatch = useAppDispatch();
	const _id = useAppSelector((state) => state.booking.booking?._id);

	const handleSubmit = async (values: any) => {
		let data = { ...values };

		data.isPay_driver = data.isPay_driver ? data.isPay_driver : false;

		if (!data.isPay_driver) data.driver_price = 0;
		else data.driver_price = Number(data.driver_price);

		BookingService.updateBookingStatus(_id, data, dispatch);
	};

	return (
		<div>
			<h3>Update Booking Status</h3>
			<UpdateBookingStatusForm onSubmit={handleSubmit} />
		</div>
	);
}
