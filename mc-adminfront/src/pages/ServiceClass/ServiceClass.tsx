import { Container } from "@mui/material";
import { useNavigate } from "react-router";
import Button from "components/atoms/Button";
import Banner from "components/templates/Banner";
import ServiceClassList from "./ServiceClassList";
export default function ServiceClass() {
	const navigate = useNavigate();
	return (
		<div>
			<Container maxWidth="lg">
				<Banner heading="Service Class">
					<Button
						color="primary"
						variant="contained"
						onClick={() => navigate("/add-class")}
					>
						Add Class
					</Button>
				</Banner>
				<ServiceClassList />
			</Container>
		</div>
	);
}
