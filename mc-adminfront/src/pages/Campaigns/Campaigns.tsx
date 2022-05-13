import { Container } from "@mui/material";
import { useNavigate } from "react-router";
import CampaignsList from "./CampaignsList";
import Button from "components/atoms/Button";
import Banner from "components/templates/Banner";

export default function Campaigns() {
	const navigate = useNavigate();

	return (
		<div>
			<Container maxWidth="lg">
				<Banner heading="Campaigns">
					<Button
						color="primary"
						variant="contained"
						onClick={() => navigate("/add-campaign")}
					>
						Add Campaign
					</Button>
				</Banner>
				<CampaignsList />
			</Container>
		</div>
	);
}
