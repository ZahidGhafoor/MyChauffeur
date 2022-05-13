import { useEffect } from "react";
import Button from "components/atoms/Button";
import GoBack from "components/atoms/GoBack";
import VehicleProfile from "./VehicleProfile";
import Banner from "components/templates/Banner";
import styles from "./VehicleDetails.module.css";
import VehicleDocuments from "./VehicleDocuments";
import { Container, Divider } from "@mui/material";
import VehicleService from "services/vehicle.service";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { vehicleActions } from "redux/slices/vehicle";

export default function VehicleDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const vehicle = useAppSelector((state) => state.vehicle.vehicle);

	useEffect(() => {
		VehicleService.getVehicle(id || "", dispatch);
		return () => {
			dispatch(vehicleActions.setVehicle(null));
		};
	}, [id, dispatch]);

	return (
		<Container>
			<GoBack path="/vehicles" title="Back to Vehicles" />
			<Banner heading="Vehicle details" />
			{!vehicle ? null : vehicle?.data === "Not Found" ? (
				<p>Vehicle Not Found</p>
			) : (
				<div className={styles.detailsBox}>
					<Button
						size="small"
						variant="text"
						color="primary"
						onClick={() => navigate(`/update-vehicle/${vehicle._id}`)}
						sx={{ position: "absolute", right: "15px", top: "15px" }}
					>
						Edit
					</Button>
					<VehicleProfile vehicle={vehicle} />
					<Divider variant="middle" />
					<br />
					<VehicleDocuments vehicle={vehicle} />
				</div>
			)}
		</Container>
	);
}
