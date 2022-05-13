import CancelBookingForm from "./CancelBookingForm";
import BookingService from "services/booking.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function CancelBooking() {
	const dispatch = useAppDispatch();
	const _id = useAppSelector((state) => state.booking.booking?._id);

	const handleSubmit = async (values: any) => {
		let data = { ...values };

		data.is_refund = data.is_refund ? data.is_refund : false;
		data.isMail_user = data.isMail_user ? data.isMail_user : false;
		data.isText_user = data.isText_user ? data.isText_user : false;
		data.isPay_driver = data.isPay_driver ? data.isPay_driver : false;
		data.isMail_driver = data.isMail_driver ? data.isMail_driver : false;

		if (!data.isPay_driver) data.driver_price = 0;
		else data.driver_price = Number(data.driver_price);

		BookingService.cancelBooking(_id, data, dispatch);
	};

	return (
		<div>
			<h3>Cancel Booking</h3>
			<CancelBookingForm onSubmit={handleSubmit} />
		</div>
	);
}
