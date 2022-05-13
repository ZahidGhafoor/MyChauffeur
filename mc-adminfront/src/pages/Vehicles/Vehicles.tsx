import { Container } from "@mui/material";
import VehiclesList from "./VehiclesList";
import { useNavigate } from "react-router";
import Button from "components/atoms/Button";
import Banner from "components/templates/Banner";
export default function Drivers() {
	const navigate = useNavigate();
	return (
		<div>
			<Container maxWidth="lg">
				<Banner heading="Vehicles">
					<Button
						color="primary"
						variant="contained"
						onClick={() => navigate("/add-vehicle")}
					>
						Add Vehicle
					</Button>
				</Banner>
				<VehiclesList />
			</Container>
		</div>
	);
}
