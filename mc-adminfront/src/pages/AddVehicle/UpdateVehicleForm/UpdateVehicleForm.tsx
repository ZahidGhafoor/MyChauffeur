import { change } from "redux-form";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import VehicleService from "services/vehicle.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { vehicleActions } from "redux/slices/vehicle";

export default function UpdateVehicleForm({ id }: any) {
	const isSet = useRef(false);
	const isSetY = useRef(false);
	const form = "AddVehicleForm";
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const vehicle = useAppSelector((state) => state.vehicle.vehicle);
	const modelOptions = useAppSelector((state) => state.class.modelOptions);
	const year = useAppSelector((state) => state.form?.[form]?.values?.year);
	const partnerOptions = useAppSelector(
		(state) => state.partner.partnerOptions
	);

	useEffect(() => {
		VehicleService.getVehicle(id || "", dispatch);

		return () => {
			dispatch(vehicleActions.setVehicle(null));
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (
			isSet.current ||
			partnerOptions.length === 0 ||
			modelOptions.length === 0 ||
			!vehicle ||
			vehicle?.data === "Not Found"
		)
			return;

		const { model_id, color, license_plate, class_id, partner_id } =
			vehicle;

		dispatch(change(form, "color", color));
		dispatch(change(form, "model_id", model_id));
		dispatch(change(form, "class", class_id.name));
		dispatch(change(form, "partner_id", partner_id._id));
		dispatch(change(form, "license_plate", license_plate));

		isSet.current = true;
	}, [vehicle, partnerOptions, navigate, dispatch, modelOptions]);

	useEffect(() => {
		if (
			!year ||
			!vehicle ||
			!isSet.current ||
			isSetY.current ||
			modelOptions.length === 0
		)
			return;

		dispatch(change(form, "year", vehicle.year));

		isSetY.current = true;
	}, [year, vehicle, dispatch, modelOptions]);

	return null;
}
