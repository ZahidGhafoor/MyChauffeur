import format from "date-fns/format";
import { useEffect, useState } from "react";
import GoBack from "components/atoms/GoBack";
import AddBookingForm from "./AddBookingForm";
import Container from "@mui/material/Container";
import Banner from "components/templates/Banner";
import UpdateBookingForm from "./UpdateBookingForm";
import BookingService from "services/booking.service";
import PricingService from "services/pricing.service";
import CircleLoader from "components/atoms/CircleLoader";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function AddBooking() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const booking = useAppSelector((state) => state.booking.booking);
	const classesOptions = useAppSelector(
		(state) => state.class.classesOptions
	);

	useEffect(() => {
		PricingService.getAllPricings(dispatch);
	}, [dispatch]);

	const handleSubmit = async (values: any) => {
		let data = { ...values };
		const date = new Date(data.date.date).toDateString();
		const time = new Date(data.time.date).toTimeString();

		data.time_stamp = format(
			new Date(`${date} ${time}`),
			"yyyy-MM-dd HH:mm:ss.SSSSSS"
		);

		data.trip_type = data?.hourly ? "hourly" : "trip";
		data.pickup_type = data?.pickup?.details?.airport
			? "airport"
			: "place";

		data.city_name = [data?.pickup?.details?.city];

		if (!data?.hourly)
			data.city_name.push(data?.destination?.details?.city);
		else data.distance = 0;

		if (data.phone?.data) {
			data.phone = `+${values.phone.value}`;
			data.country = values.phone.data.countryCode;
			data.country_code = `+${values.phone.data.dialCode}`;
		} else {
			data.country = "country";
			data.phone = values.phone.value;
			data.country_code = "country_code";
		}

		const {
			phone,
			email,
			title,
			country,
			last_name,
			first_name,
			country_code,
		} = data;

		data.booking_for_details = {
			phone,
			email,
			title,
			country,
			last_name,
			first_name,
			country_code,
		};

		const { pickup, destination } = data;

		data.pickup = {
			title: pickup?.details?.name,
			place_id: pickup?.details?.place_id,
			address: pickup?.details?.formatted_address,
			coordinates: {
				lat: pickup?.details?.geometry?.location?.lat,
				lng: pickup?.details?.geometry?.location?.lng,
			},
		};
		data.destination = {
			title: destination?.details?.name,
			place_id: destination?.details?.place_id,
			address: destination?.details?.formatted_address,
			coordinates: {
				lat: destination?.details?.geometry?.location?.lat,
				lng: destination?.details?.geometry?.location?.lng,
			},
		};

		const { notes, pickup_sign, child_seats } = data;

		data.additional_info = { notes, pickup_sign, child_seats };
		data.distance = Number(data.distance);

		for (const classs of classesOptions) {
			if (data.class_id === classs.value) {
				data.class_name = classs.label;
				break;
			}
		}

		delete data.date;
		delete data.time;
		delete data.email;
		delete data.phone;
		delete data.title;
		delete data.notes;
		delete data.country;
		delete data.last_name;
		delete data.first_name;
		delete data.pickup_sign;
		delete data.child_seats;
		delete data.country_code;

		setLoading(true);

		if (id)
			await BookingService.updateBooking(
				`${id}`,
				data,
				dispatch,
				navigate
			);
		else await BookingService.addBooking(data, dispatch, navigate);

		setLoading(false);
	};

	return (
		<div>
			<Container>
				<GoBack path="/bookings" title="Back to Bookings" />
				<Banner heading={`${id ? "Update" : "Add"} Booking`} />
				<div className="form">
					{loading && <CircleLoader />}
					{booking?.data === "Not Found" ? (
						<p>Booking Not Found</p>
					) : (
						<AddBookingForm onSubmit={handleSubmit} />
					)}
					{id && <UpdateBookingForm id={id} />}
				</div>
			</Container>
		</div>
	);
}
