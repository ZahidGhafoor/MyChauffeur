import UserImg from "assets/user.png";
import { useAppSelector } from "redux/hooks";
import StarRateIcon from "@mui/icons-material/StarRate";
import BookingCards from "components/templates/BookingCards";

export default function DriverCard() {
	const booking = useAppSelector((state) => state.booking.booking);

	if (!booking.driver_details) return null;

	return (
		<BookingCards heading="Chauffeur Info">
			<div className="driver-img">
				<img
					width="60px"
					height="60px"
					alt="UserImg"
					loading="lazy"
					src={booking.driver_details.profile_pic.url || UserImg}
				/>
				<div className="card-rating-icon">
					<div>{booking.driver_details.ratings.rating}</div>
					<div>
						<StarRateIcon fontSize="small" color="secondary" />
					</div>
				</div>
			</div>
			<div className="card-main">
				<div className="card-inner-heading">
					<p className="heading">Name</p>
					<p className="text">
						{booking.driver_details.title}{" "}
						{booking.driver_details.first_name}{" "}
						{booking.driver_details.last_name}
					</p>
				</div>
				<div className="card-inner-heading">
					<p className="heading">Phone</p>
					<p className="text">{booking.driver_details.phone}</p>
				</div>
				<div className="card-inner-heading">
					<p className="heading">Email</p>
					<p className="text">{booking.driver_details.email}</p>
				</div>
				<div className="card-inner-heading">
					<p className="heading">Vehicle</p>
					<p className="text">{booking.vehicle_details?.license_plate}</p>
				</div>
			</div>
		</BookingCards>
	);
}
