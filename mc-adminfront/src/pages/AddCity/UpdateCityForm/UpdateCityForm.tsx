import { useEffect } from "react";
import { change } from "redux-form";
import { useNavigate } from "react-router-dom";
import CityService from "services/city.service";
import { cityActions } from "redux/slices/city";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function UpdateCityForm({ id }: any) {
	const form = "AddCityForm";
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const city = useAppSelector((state) => state.city.city);

	useEffect(() => {
		CityService.getCity(`${id}`, dispatch);
		return () => {
			dispatch(cityActions.setCity(null));
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (!city || city?.data === "Not Found") return;
		const { name, is_active } = city;
		dispatch(change(form, "name", name));
		dispatch(change(form, "is_active", is_active));
	}, [city, navigate, dispatch]);

	return null;
}
