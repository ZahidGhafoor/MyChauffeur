import { useAppSelector } from "redux/hooks";
import BookingCards from "components/templates/BookingCards";

export default function PaymentCard() {
	const booking = useAppSelector((state) => state.booking.booking);

	return (
		<BookingCards heading="Payment Info">
			<div className="card-main">
				<div className="card-box">
					<div className="card-inner-price">
						<p className="card-inner-price-heading">Netto</p>
						<p className="card-inner-price-amount">
							{booking.price_details.netto_price.toFixed(2)}€
						</p>
					</div>
					<div className="card-inner-price">
						<p className="card-inner-price-heading">19% VAT.</p>
						<p className="card-inner-price-amount">
							{(
								booking.price_details.brutto_price -
								booking.price_details.netto_price
							).toFixed(2)}
							€
						</p>
					</div>
				</div>
				<div className="card-box">
					<div className="card-inner-price">
						<p className="card-inner-price-heading">Brutto</p>
						<p className="card-inner-price-amount">
							{booking.price_details.brutto_price.toFixed(2)}€
						</p>
					</div>
				</div>
				<div className="card-box">
					<div className="card-inner-price">
						<p className="card-inner-price-heading">Payed using</p>
						<p className="card-inner-price-options">
							{booking.payment_detail?.card_id ? "Card" : "PayPal"}
						</p>
					</div>
				</div>
			</div>
		</BookingCards>
	);
}
