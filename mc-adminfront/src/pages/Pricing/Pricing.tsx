import PricingList from "./PricingList";
import { Container } from "@mui/material";
import { useNavigate } from "react-router";
import Button from "components/atoms/Button";
import Banner from "components/templates/Banner";

export default function Pricing() {
	const navigate = useNavigate();

	return (
		<div>
			<Container maxWidth="lg">
				<Banner heading="Pricings">
					<Button
						color="primary"
						variant="contained"
						onClick={() => navigate("/add-pricing")}
					>
						Add Pricing
					</Button>
				</Banner>
				<PricingList />
			</Container>
		</div>
	);
}
