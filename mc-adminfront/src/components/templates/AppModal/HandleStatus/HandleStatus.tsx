import AddRemarksForm from "./AddRemarksForm";
import DriverService from "services/driver.service";
import VehicleService from "services/vehicle.service";
import PartnerService from "services/partner.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function HandleStatus() {
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.modal.data);

	const handleSubmit = (values: any) => {
		const { id, var_name, type, form, doc } = data;
		let formData = { status: form.toLowerCase(), ...values };

		if (doc) {
			formData.name = var_name;

			if (type === "driver")
				DriverService.updateDriverDocsStatus(`${id}`, formData, dispatch);
			else if (type === "vehicle")
				VehicleService.updateVehicleDocsStatus(
					`${id}`,
					formData,
					dispatch
				);
			else if (type === "partner")
				PartnerService.updatePartnerDocsStatus(
					`${id}`,
					formData,
					dispatch
				);
		} else {
			if (type === "driver")
				DriverService.updateDriverStatus(`${id}`, formData, dispatch);
			else if (type === "vehicle")
				VehicleService.updateVehicleStatus(`${id}`, formData, dispatch);
			else if (type === "partner")
				PartnerService.updatePartnerStatus(`${id}`, formData, dispatch);
		}
	};

	return (
		<div>
			<h3>Status Update</h3>
			<p>
				This status will be <b>{data.form}</b>. Do you really want to do
				this?
			</p>
			<AddRemarksForm onSubmit={handleSubmit} />
		</div>
	);
}
