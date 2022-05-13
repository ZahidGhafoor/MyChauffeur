import { useEffect } from "react";
import { change } from "redux-form";
import { useNavigate } from "react-router-dom";
import DriverService from "services/driver.service";
import { driverActions } from "redux/slices/driver";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function UpdateDriverForm({ id }: any) {
	const form = "AddDriverForm";
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const driver = useAppSelector((state) => state.driver.driver);
	const partnerOptions = useAppSelector(
		(state) => state.partner.partnerOptions
	);

	useEffect(() => {
		DriverService.getDriver(id || "", dispatch);

		return () => {
			dispatch(driverActions.setDriver(null));
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (
			partnerOptions.length === 0 ||
			!driver ||
			driver?.data === "Not Found"
		)
			return;

		const {
			title,
			email,
			phone,
			languages,
			last_name,
			first_name,
			partner_id,
			country_code,
		} = driver;

		dispatch(change(form, "title", title));
		dispatch(change(form, "email", email));
		dispatch(change(form, "last_name", last_name));
		dispatch(change(form, "first_name", first_name));
		dispatch(change(form, "partner_id", partner_id?._id));
		dispatch(change(form, "phone", { value: phone }));
		dispatch(change(form, "country_code", country_code));

		if (languages)
			dispatch(
				change(
					form,
					"languages",
					languages.map((language: any) => ({
						value: language,
						label: language,
					}))
				)
			);
	}, [driver, partnerOptions, navigate, dispatch]);

	return null;
}
