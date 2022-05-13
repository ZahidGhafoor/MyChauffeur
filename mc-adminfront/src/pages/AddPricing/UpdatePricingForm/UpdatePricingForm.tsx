import { change } from "redux-form";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PricingService from "services/pricing.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { pricingActions } from "redux/slices/pricing";

export default function UpdatePricingForm({ id }: any) {
	const isSet = useRef(false);
	const isSetC = useRef(false);
	const form = "AddPricingForm";
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const pricing = useAppSelector((state) => state.pricing.pricing);
	const cityOptions = useAppSelector((state) => state.city.cityOptions);
	const classesOptions = useAppSelector(
		(state) => state.class.classesOptions
	);
	const city_id = useAppSelector(
		(state) => state.form?.[form]?.values?.city_id
	);

	useEffect(() => {
		PricingService.getPricing(`${id}`, dispatch);

		return () => {
			dispatch(pricingActions.setPricing(null));
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (
			isSet.current ||
			cityOptions.length === 0 ||
			!pricing ||
			pricing?.data === "Not Found"
		)
			return;

		const { tax, city_id, base_rate, trip_rates, per_hour_rate, extra } =
			pricing;

		dispatch(change(form, "tax", tax));
		dispatch(change(form, "city_id", city_id));
		dispatch(change(form, "trip_rates.zero_to_ten", base_rate));
		dispatch(change(form, "hourly_rates.price", per_hour_rate));

		if (trip_rates) {
			dispatch(
				change(form, "trip_rates.ten_to_thirty", trip_rates.ten_to_thirty)
			);
			dispatch(
				change(
					form,
					"trip_rates.thirty_to_fifty",
					trip_rates.thirty_to_fifty
				)
			);
			dispatch(
				change(
					form,
					"trip_rates.fifty_to_hundred",
					trip_rates.fifty_to_hundred
				)
			);
			dispatch(
				change(
					form,
					"trip_rates.more_than_hundred",
					trip_rates.more_than_hundred
				)
			);
		}

		if (extra) {
			dispatch(
				change(
					form,
					"extra.waiting_cost_per_min",
					extra.waiting_cost_per_min
				)
			);
			dispatch(
				change(
					form,
					"extra.airport_pickup_cost",
					extra.airport_pickup_cost
				)
			);
		}

		isSet.current = true;
	}, [pricing, navigate, dispatch, cityOptions]);

	useEffect(() => {
		if (
			!city_id ||
			!pricing ||
			!isSet.current ||
			isSetC.current ||
			classesOptions.length === 0
		)
			return;

		setTimeout(() => {
			dispatch(change(form, "class_id", pricing.class_id));
		}, 0);

		isSetC.current = true;
	}, [city_id, pricing, dispatch, classesOptions]);

	return null;
}
