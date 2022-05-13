import { useAppSelector } from "redux/hooks";
import BookingCards from "components/templates/BookingCards";

export default function PartnerCard() {
	const booking = useAppSelector((state) => state.booking.booking);

	if (!booking.partner_details) return null;

	return (
		<BookingCards heading="Partner Info">
			<div className="card-main">
				<div className="card-inner-heading">
					<p className="heading">Name</p>
					<p className="text">
						{booking.partner_details.title}{" "}
						{booking.partner_details.first_name}{" "}
						{booking.partner_details.last_name}
					</p>
				</div>
				<div className="card-inner-heading">
					<p className="heading">Phone</p>
					<p className="text">{booking.partner_details.phone}</p>
				</div>
				<div className="card-inner-heading">
					<p className="heading">Email</p>
					<p className="text">{booking.partner_details.email}</p>
				</div>
				{booking.partner_price_details && (
					<>
						<div className="card-inner-heading">
							<p className="heading">Accepted Price</p>
							<p className="text">
								{booking.partner_price_details.netto.toFixed(2)}€
							</p>
						</div>
						<div className="card-inner-heading">
							<p className="heading">Tip</p>
							<p className="text">
								{booking.partner_price_details.tip.toFixed(2)}€
							</p>
						</div>
					</>
				)}
			</div>
		</BookingCards>
	);
}
