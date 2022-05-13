import { useEffect } from "react";
import { change } from "redux-form";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { classActions } from "redux/slices/class";

export default function Calculations() {
	const form = "AddPricingForm";
	const dispatch = useAppDispatch();
	const classesByCity = useAppSelector(
		(state) => state.class.classesByCity
	);
	const city_id = useAppSelector(
		(state) => state.form?.[form]?.values?.city_id
	);

	useEffect(() => {
		dispatch(change(form, "class_id", ""));
		dispatch(classActions.setClassesOptionsByCityId(city_id));
	}, [city_id, classesByCity, dispatch]);

	return null;
}
