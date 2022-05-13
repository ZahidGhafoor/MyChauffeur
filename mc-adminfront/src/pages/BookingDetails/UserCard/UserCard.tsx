import { useAppSelector } from "redux/hooks";
import BookingCards from "components/templates/BookingCards";

export default function UserCard() {
	const booking = useAppSelector((state) => state.booking.booking);

	if (booking.booking_for_someone) return null;

	return (
		<BookingCards heading="Customer Info">
			<div className="card-main">
				<div className="card-inner-heading">
					<p className="heading">Name</p>
					<p className="text">
						{booking.user_details.title} {booking.user_details.first_name}{" "}
						{booking.user_details.last_name}
					</p>
				</div>
				<div className="card-inner-heading">
					<p className="heading">Phone</p>
					<p className="text"> {booking.user_details.phone}</p>
				</div>
				<div className="card-inner-heading">
					<p className="heading">Email</p>
					<p className="text">{booking.user_details.email}</p>
				</div>
			</div>
		</BookingCards>
	);
}
