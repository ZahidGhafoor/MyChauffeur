import { change } from "redux-form";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ClassService from "services/class.service";
import { classActions } from "redux/slices/class";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function UpdateClassForm({ id }: any) {
	const isSet = useRef(false);
	const form = "AddClassForm";
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const classs = useAppSelector((state) => state.class.classs);
	const cityOptions = useAppSelector((state) => state.city.cityOptions);

	useEffect(() => {
		ClassService.getClass(`${id}`, dispatch);
		return () => {
			dispatch(classActions.setClass(null));
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (isSet.current || cityOptions.length === 0 || !classs) return;
		if (classs?.data === "Not Found") return;
		const {
			name,
			text,
			rank,
			image,
			city_id,
			max_bags,
			is_active,
			max_persons,
		} = classs;
		dispatch(change(form, "name", name));
		dispatch(change(form, "text", text));
		dispatch(change(form, "rank", rank));
		dispatch(change(form, "image", { image }));
		dispatch(change(form, "max_bags", max_bags));
		dispatch(change(form, "city_id", city_id._id));
		dispatch(change(form, "is_active", is_active));
		dispatch(change(form, "max_persons", max_persons));
		isSet.current = true;
	}, [classs, cityOptions, navigate, dispatch]);

	return null;
}
