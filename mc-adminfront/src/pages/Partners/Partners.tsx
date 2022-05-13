import { Container } from "@mui/material";
import PartnersList from "./PartnersList";
import { useNavigate } from "react-router";
import Button from "components/atoms/Button";
import Banner from "components/templates/Banner";
export default function Partners() {
	const navigate = useNavigate();
	return (
		<div>
			<Container maxWidth="lg">
				<Banner heading="Partners">
					<Button
						color="primary"
						variant="contained"
						onClick={() => navigate("/add-partner")}
					>
						Add Partner
					</Button>
				</Banner>
				<PartnersList />
			</Container>
		</div>
	);
}
