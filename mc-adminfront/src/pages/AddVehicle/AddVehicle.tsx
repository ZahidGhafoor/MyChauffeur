import GoBack from "components/atoms/GoBack";
import AddVehicleForm from "./AddVehicleForm";
import Container from "@mui/material/Container";
import Banner from "components/templates/Banner";
import UpdateVehicleForm from "./UpdateVehicleForm";
import VehicleService from "services/vehicle.service";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import CircleLoader from "components/atoms/CircleLoader";

export default function AddVehicle() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const vehicle = useAppSelector((state) => state.vehicle.vehicle);
	const loading = useAppSelector((state) => state.formLoader.loading);
	const modelsDetails = useAppSelector(
		(state) => state.class.modelsDetails
	);

	const handleSubmit = async (values: any) => {
		let data = { ...values };

		data.model = modelsDetails[data.model_id].name;
		data.class_id = modelsDetails[data.model_id].class_id;

		delete data.class;

		if (id) {
			delete data.partner_id;

			VehicleService.updatevehicle(`${id}`, data, dispatch, navigate);
		} else VehicleService.addVehicle(data, dispatch, navigate);
	};

	return (
		<div>
			<Container>
				<GoBack
					path={`${
						id && vehicle?.data !== "Not Found"
							? `/vehicle-details/${id}`
							: "/vehicles"
					}`}
					title={`Back to ${
						id && vehicle?.data !== "Not Found"
							? "Vehicle Details"
							: "Vehicles"
					} `}
				/>
				<Banner heading={`${id ? "Update" : "Add"} Vehicle`} />
				<div className="form">
					{loading && <CircleLoader />}
					{vehicle?.data === "Not Found" ? (
						<p>Vehicle Not Found</p>
					) : (
						<AddVehicleForm onSubmit={handleSubmit} />
					)}
					{id && <UpdateVehicleForm id={id} />}
				</div>
			</Container>
		</div>
	);
}
