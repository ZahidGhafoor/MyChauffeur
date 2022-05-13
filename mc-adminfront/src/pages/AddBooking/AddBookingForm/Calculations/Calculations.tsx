import { useEffect } from "react";
import { change } from "redux-form";
import MapService from "services/map.service";
import { classActions } from "redux/slices/class";
import { pricingActions } from "redux/slices/pricing";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function Calculations() {
	const form = "AddBookingForm";
	const dispatch = useAppDispatch();
	const pricing = useAppSelector((state) => state.pricing.pricing);
	const hourly = useAppSelector(
		(state) => state.form?.[form]?.values?.hourly
	);
	const distance = useAppSelector(
		(state) => state.form?.[form]?.values?.distance
	);
	const duration = useAppSelector(
		(state) => state.form?.[form]?.values?.duration
	);
	const class_id = useAppSelector(
		(state) => state.form?.[form]?.values?.class_id
	);
	const first_name = useAppSelector(
		(state) => state.form?.[form]?.values?.first_name
	);
	const last_name = useAppSelector(
		(state) => state.form?.[form]?.values?.last_name
	);
	const airport = useAppSelector(
		(state) => state.form?.[form]?.values?.pickup?.details?.airport
	);
	const pickup = useAppSelector(
		(state) => state.form?.[form]?.values?.pickup
	);
	const destination = useAppSelector(
		(state) => state.form?.[form]?.values?.destination
	);

	// onChange Hourly
	useEffect(() => {
		if (hourly) {
			dispatch(change(form, "distance", ""));
			dispatch(change(form, "destination", ""));
		} else dispatch(change(form, "duration", ""));
	}, [hourly, dispatch]);

	// Empty Flight Number
	useEffect(() => {
		if (airport) return;

		dispatch(change(form, "flight_number", ""));
	}, [airport, dispatch]);

	// Set Pickup Sign
	useEffect(() => {
		if (!last_name && !first_name) return;

		dispatch(
			change(form, "pickup_sign", `${first_name || ""} ${last_name || ""}`)
		);
	}, [last_name, first_name, dispatch]);

	// Clear Values
	useEffect(() => {
		dispatch(change(form, "price", ""));
		dispatch(change(form, "class_id", ""));
		dispatch(change(form, "distance", ""));

		dispatch(classActions.clear());
		dispatch(pricingActions.setPricing(null));
	}, [hourly, pickup, destination, dispatch]);

	// Set Price
	useEffect(() => {
		if (hourly) {
			if (!duration) return;
		} else if (!distance) return;
		if (!pricing || pricing?.data) return;

		let price = 0;

		if (airport) price += pricing.extra.airport_pickup_cost;
		if (hourly) {
			price += duration * pricing.per_hour_rate;
			const max_km = Number(process.env.REACT_APP_MAX_KM_PER_HOUR) || 0;
			dispatch(change(form, "max_km", duration * max_km));
		} else {
			price += pricing.base_rate;

			if (distance > 0 && distance <= 10) {
			} else if (distance > 10 && distance <= 30)
				price += (distance - 10) * pricing.trip_rates.ten_to_thirty;
			else if (distance > 30 && distance <= 50)
				price += (distance - 10) * pricing.trip_rates.thirty_to_fifty;
			else if (distance > 50 && distance <= 100)
				price += (distance - 10) * pricing.trip_rates.fifty_to_hundred;
			else if (distance > 100)
				price += (distance - 10) * pricing.trip_rates.more_than_hundred;
		}

		const price_details = {
			VAT: pricing.tax,
			netto_price: price.toFixed(2),
			brutto_price: (price * (1 + pricing.tax / 100)).toFixed(2),
		};

		dispatch(change(form, "price", price_details.brutto_price));
		dispatch(change(form, "price_details", price_details));
	}, [hourly, airport, duration, distance, pricing, dispatch]);

	// Set Pricing
	useEffect(() => {
		if (!class_id) return;

		dispatch(change(form, "price", ""));
		dispatch(pricingActions.setPricingByClass(class_id));
	}, [class_id, dispatch]);

	// Set Classes
	useEffect(() => {
		if (!pickup?.details?.city) return;

		let cities = [pickup.details.city.toLowerCase().trim()];

		if (hourly) dispatch(classActions.setClassesOptionsByCity(cities));
		else {
			if (!destination?.details?.city) return;

			cities.push(destination.details.city.toLowerCase().trim());
			dispatch(classActions.setClassesOptionsByCity(cities));
		}
	}, [hourly, pickup, destination, dispatch]);

	// Calculate Distance
	useEffect(() => {
		if (!(pickup?.details?.place_id && destination?.details?.place_id))
			return;

		const calculateDistance = async () => {
			const res: any = await MapService.calculateDistance(
				pickup.details.place_id,
				destination.details.place_id
			);
			const distance = res !== false ? res.toFixed(2) : "";
			dispatch(change(form, "distance", distance));
		};

		calculateDistance();
	}, [pickup, destination, dispatch]);

	return null;
}
