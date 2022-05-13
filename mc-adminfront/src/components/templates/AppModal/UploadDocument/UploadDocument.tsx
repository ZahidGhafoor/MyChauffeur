import ImageService from "services/image.service";
import DriverService from "services/driver.service";
import UploadDocumentForm from "./UploadDocumentForm";
import VehicleService from "services/vehicle.service";
import PartnerService from "services/partner.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function UploadDocument() {
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.modal.data);

	const handleSubmit = async (values: any) => {
		const formData = new FormData();
		const { image, expiry_date } = values;
		const { id, var_name, type, expiry_date_required } = data;
		let img = await ImageService.getImageFileFromBlob(image);

		formData.append("image", img);
		formData.append("name", var_name);
		formData.append("expiry_date", "false");

		if (expiry_date_required)
			formData.append("expiry_date", expiry_date?.date);

		if (type === "driver")
			DriverService.uploadDriverDocs(`${id}`, formData, dispatch);
		else if (type === "vehicle")
			VehicleService.uploadVehicleDocs(`${id}`, formData, dispatch);
		else if (type === "partner")
			PartnerService.uploadPartnerDocs(`${id}`, formData, dispatch);
	};

	return (
		<div>
			<h3>Upload Document</h3>
			<UploadDocumentForm onSubmit={handleSubmit} />
		</div>
	);
}
