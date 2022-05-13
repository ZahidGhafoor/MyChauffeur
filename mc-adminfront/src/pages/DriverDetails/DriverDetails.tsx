import { useEffect } from "react";
import { Container, Divider, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import DriverProfile from "./DriverProfile";
import GoBack from "components/atoms/GoBack";
import Button from "components/atoms/Button";
import DriverDocuments from "./DriverDocuments";
import styles from "./DriverDetails.module.css";
import Banner from "components/templates/Banner";
import DriverService from "services/driver.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { driverActions } from "redux/slices/driver";
import { MODAL, modalActions } from "redux/slices/modal";

export default function DriverDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const driver = useAppSelector((state) => state.driver.driver);

	useEffect(() => {
		DriverService.getDriver(id || "", dispatch);
		return () => {
			dispatch(driverActions.setDriver(null));
		};
	}, [id, dispatch]);

	return (
		<Container>
			<GoBack path="/chauffeurs" title="Back to Chauffeurs" />
			<Banner heading="Chauffeur details" />
			{!driver ? null : driver?.data === "Not Found" ? (
				<p>Chauffeur Not Found</p>
			) : (
				<div className={styles.detailsBox}>
					<Stack
						alignItems="end"
						sx={{ position: "absolute", right: "15px" }}
					>
						<Button
							size="small"
							variant="text"
							color="primary"
							onClick={() => navigate(`/update-chauffeur/${driver._id}`)}
						>
							Edit
						</Button>
						<Button
							size="small"
							color="primary"
							variant="outlined"
							onClick={() => {
								dispatch(
									modalActions.openModal({
										type: MODAL.DISABLE_DRIVER,
										data: driver,
										width: "500px",
									})
								);
							}}
						>
							{driver.is_enabled ? "Disable" : "Enable"} Chauffuer
						</Button>
					</Stack>
					<DriverProfile driver={driver} />
					<Divider variant="middle" />
					<br />
					<DriverDocuments driver={driver} />
				</div>
			)}
		</Container>
	);
}
