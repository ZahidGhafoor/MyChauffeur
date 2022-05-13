import { change } from "redux-form";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ModelService from "services/model.service";
import { modelActions } from "redux/slices/model";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function UpdateModelForm({ id }: any) {
	const form = "AddModelForm";
	const isSet = useRef(false);
	const isSetC = useRef(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const model = useAppSelector((state) => state.model.model);
	const cityOptions = useAppSelector((state) => state.city.cityOptions);
	const classesOptions = useAppSelector(
		(state) => state.class.classesOptions
	);
	const city_id = useAppSelector(
		(state) => state.form?.[form]?.values?.city_id
	);

	useEffect(() => {
		ModelService.getModel(`${id}`, dispatch);

		return () => {
			dispatch(modelActions.setModel(null));
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (
			isSet.current ||
			cityOptions.length === 0 ||
			!model ||
			model?.data === "Not Found"
		)
			return;

		const { name, city_id, max_age, is_active } = model;

		dispatch(change(form, "name", name));
		dispatch(change(form, "city_id", city_id));
		dispatch(change(form, "max_age", max_age));
		dispatch(change(form, "is_active", is_active));

		isSet.current = true;
	}, [model, navigate, dispatch, cityOptions]);

	useEffect(() => {
		if (
			!city_id ||
			!model ||
			!isSet.current ||
			isSetC.current ||
			classesOptions.length === 0
		)
			return;

		setTimeout(() => {
			dispatch(change(form, "class_id", model.class_id));
		}, 0);

		isSetC.current = true;
	}, [city_id, model, dispatch, classesOptions]);

	return null;
}
