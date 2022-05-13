import { Container } from "@mui/material";
import { useNavigate } from "react-router";
import DriversList from "./DriversList";
import Button from "components/atoms/Button";
import Banner from "components/templates/Banner";
export default function Drivers() {
	const navigate = useNavigate();
	return (
		<div>
			<Container maxWidth="lg">
				<Banner heading="Chauffeurs">
					<Button
						color="primary"
						variant="contained"
						onClick={() => navigate("/add-chauffeur")}
					>
						Add Chauffeur
					</Button>
				</Banner>
				<DriversList />
			</Container>
		</div>
	);
}
