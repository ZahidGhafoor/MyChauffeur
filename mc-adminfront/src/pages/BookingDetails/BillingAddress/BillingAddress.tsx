import Button from "components/atoms/Button";
import { useAppSelector } from "redux/hooks";
import BookingCards from "components/templates/BookingCards";

export default function BillingAddress() {
	let billing_address = null;
	const booking = useAppSelector((state) => state.booking.booking);

	if (booking.billing_address?.name)
		billing_address = booking.billing_address;
	else if (booking.user_details?.billing_address?.name)
		billing_address = booking.user_details.billing_address;
	else return null;

	return (
		<BookingCards heading="Billing Address">
			<Button
				color="primary"
				variant="text"
				sx={{ position: "absolute", top: "22px", right: "15px" }}
			>
				Edit
			</Button>
			<div className="card-main">
				<div className="card-inner-heading">
					<p className="heading">Name</p>
					<p className="text">{billing_address.name}</p>
				</div>
				<div className="card-inner-heading">
					<p className="heading">Street</p>
					<p className="text">{billing_address.street_address}</p>
				</div>
				<div className="card-inner-heading">
					<p className="heading">Postal code</p>
					<p className="text">{billing_address.postal_number}</p>
				</div>
				<div className="card-inner-heading">
					<p className="heading">City</p>
					<p className="text">{billing_address.city}</p>
				</div>
				<div className="card-inner-heading">
					<p className="heading">Country</p>
					<p className="text">{billing_address.country}</p>
				</div>
			</div>
		</BookingCards>
	);
}
