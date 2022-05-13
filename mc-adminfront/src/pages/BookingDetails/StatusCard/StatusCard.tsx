import DateService from "utils/date.util";
import { useAppSelector } from "redux/hooks";
import BookingCards from "components/templates/BookingCards";

export default function StatusCard() {
	const booking = useAppSelector((state) => state.booking.booking);

	return (
		<BookingCards heading="Status Updates">
			<div className="card-main">
				{booking.logs.map(({ _id, time, message }: any) => (
					<div key={_id} className="card-inner-heading">
						<span className="heading">
							{DateService.getFormattedDateTime(time)}
						</span>{" "}
						<span className="text">{message}</span>
					</div>
				))}
				<div className="status-extras">
					<div className="card-inner-heading">
						<p className="heading">Waiting time</p>
						<p className="text">
							{DateService.getDurationString(booking.waiting_time)}
						</p>
					</div>
					<div className="card-inner-heading">
						<p className="heading">Extra Km</p>
						<p className="text">{booking.extra_km} km</p>
					</div>
				</div>
			</div>
		</BookingCards>
	);
}
