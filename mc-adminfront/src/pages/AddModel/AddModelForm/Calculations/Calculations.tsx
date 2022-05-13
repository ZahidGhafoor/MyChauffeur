import { useEffect } from "react";
import { change } from "redux-form";
import { classActions } from "redux/slices/class";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function Calculations() {
	const form = "AddModelForm";
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
