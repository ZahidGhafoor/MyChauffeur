import { useEffect, useRef } from "react";
import { change } from "redux-form";
import { useNavigate } from "react-router-dom";
import { bookingActions } from "redux/slices/booking";
import BookingService from "services/booking.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import DateService from "utils/date.util";

export default function UpdateBookingForm({ id }: any) {
	const isSet = useRef(false);
	const isSetC = useRef(false);
	const isSetP = useRef(false);
	const form = "AddBookingForm";
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const classes = useAppSelector((state) => state.class.classes);
	const pricing = useAppSelector((state) => state.pricing.pricing);
	const pricings = useAppSelector((state) => state.pricing.pricings);
	const booking = useAppSelector((state) => state.booking.booking);
	const classesOptions = useAppSelector(
		(state) => state.class.classesOptions
	);

	useEffect(() => {
		BookingService.getBooking(`${id}`, dispatch);

		return () => {
			dispatch(bookingActions.setBooking(null));
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (
			isSet.current ||
			!booking ||
			booking.data === "Not Found" ||
			pricings.length === 0 ||
			classes.length === 0
		)
			return;

		const {
			date,
			pickup,
			duration,
			city_name,
			trip_type,
			destination,
			pickup_type,
			user_details,
			distance_in_km,
			additional_info,
			booking_for_someone,
			booking_for_details,
		} = booking;

		const max_km = Number(process.env.REACT_APP_MAX_KM_PER_HOUR) || 0;

		dispatch(change(form, "duration", duration));
		dispatch(change(form, "distance", distance_in_km));
		dispatch(change(form, "max_km", duration * max_km));
		dispatch(change(form, "hourly", trip_type === "hourly"));

		if (date) {
			dispatch(
				change(form, "date", {
					error: false,
					date: DateService.getDateTimeString(date),
				})
			);
			dispatch(
				change(form, "time", {
					error: false,
					date: DateService.getDateTimeString(date),
				})
			);
		}

		if (pickup) {
			const { title, place_id, address, coordinates } = pickup;
			dispatch(
				change(form, "pickup", {
					value: address,
					details: {
						place_id,
						name: title,
						route: "route",
						city: city_name,
						formatted_address: address,
						airport: pickup_type === "airport",
						geometry: { location: coordinates },
					},
				})
			);
		}
		if (trip_type !== "hourly" && destination) {
			const { title, place_id, address, coordinates } = destination;
			dispatch(
				change(form, "destination", {
					value: address,
					details: {
						place_id,
						name: title,
						route: "route",
						city: city_name,
						formatted_address: address,
						geometry: { location: coordinates },
					},
				})
			);
		}

		const { notes, pickup_sign, child_seats } = additional_info;

		dispatch(change(form, "notes", notes));
		dispatch(change(form, "pickup_sign", pickup_sign));
		dispatch(change(form, "child_seats", child_seats));

		if (booking_for_someone) {
			const { email, phone, title, last_name, first_name, country_code } =
				booking_for_details;

			dispatch(change(form, "title", title));
			dispatch(change(form, "email", email));
			dispatch(change(form, "last_name", last_name));
			dispatch(change(form, "first_name", first_name));
			dispatch(change(form, "phone", { value: phone }));
			dispatch(change(form, "country_code", country_code));
		} else {
			const { email, phone, title, last_name, first_name } = user_details;

			dispatch(change(form, "title", title));
			dispatch(change(form, "email", email));
			dispatch(change(form, "last_name", last_name));
			dispatch(change(form, "first_name", first_name));
			dispatch(change(form, "phone", { value: phone }));
			dispatch(change(form, "country_code", "country_code"));
		}

		isSet.current = true;
	}, [pricings.length, classes.length, booking, navigate, dispatch]);

	useEffect(() => {
		if (
			isSetC.current ||
			!isSet.current ||
			pricings.length === 0 ||
			classesOptions.length === 0
		)
			return;

		const { class_id, flight_number } = booking;

		dispatch(change(form, "class_id", class_id));
		dispatch(change(form, "flight_number", flight_number));

		isSetC.current = true;
	}, [pricings, booking, classesOptions.length, dispatch]);

	useEffect(() => {
		if (isSetP.current || !isSetC.current || !pricing) return;

		const { price_details } = booking;
		const { VAT, brutto_price, netto_price } = price_details;
		const price_detail = { VAT, netto_price, brutto_price };

		setTimeout(() => {
			dispatch(change(form, "price", brutto_price));
			dispatch(change(form, "price_details", price_detail));
		}, 1000);

		isSetP.current = true;
	}, [pricing, booking, classesOptions.length, dispatch]);

	return null;
}
