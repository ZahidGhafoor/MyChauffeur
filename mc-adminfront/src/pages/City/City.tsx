import CityList from "./CityList";
import { Container } from "@mui/material";
import { useNavigate } from "react-router";
import Button from "components/atoms/Button";
import Banner from "components/templates/Banner";
export default function City() {
	const navigate = useNavigate();
	return (
		<div>
			<Container maxWidth="lg">
				<Banner heading="City">
					<Button
						color="primary"
						variant="contained"
						onClick={() => navigate("/add-city")}
					>
						Add City
					</Button>
				</Banner>
				<CityList />
			</Container>
		</div>
	);
}
