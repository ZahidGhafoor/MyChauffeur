import ModelsList from "./ModelsList";
import { Container } from "@mui/material";
import { useNavigate } from "react-router";
import Button from "components/atoms/Button";
import Banner from "components/templates/Banner";

export default function Models() {
	const navigate = useNavigate();

	return (
		<div>
			<Container maxWidth="lg">
				<Banner heading="Models">
					<Button
						color="primary"
						variant="contained"
						onClick={() => navigate("/add-model")}
					>
						Add Model
					</Button>
				</Banner>
				<ModelsList />
			</Container>
		</div>
	);
}
