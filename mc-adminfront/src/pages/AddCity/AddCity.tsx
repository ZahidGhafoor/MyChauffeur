import AddCityForm from "./AddCityForm";
import GoBack from "components/atoms/GoBack";
import UpdateCityForm from "./UpdateCityForm";
import Container from "@mui/material/Container";
import CityService from "services/city.service";
import Banner from "components/templates/Banner";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import CircleLoader from "components/atoms/CircleLoader";

export default function AddCity() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const city = useAppSelector((state) => state.city.city);
	const loading = useAppSelector((state) => state.formLoader.loading);

	const handleSubmit = async (values: any) => {
		let data = { ...values };
		data.is_active = data.is_active ? data.is_active : false;

		if (id) CityService.updateCity(`${id}`, data, dispatch, navigate);
		else CityService.addCity(data, dispatch, navigate);
	};

	return (
		<div>
			<Container>
				<GoBack path="/city" title="Back to City" />
				<Banner heading={`${id ? "Update" : "Add"} City`} />
				<div className="form">
					{loading && <CircleLoader />}
					{city?.data === "Not Found" ? (
						<p>City Not Found</p>
					) : (
						<AddCityForm onSubmit={handleSubmit} />
					)}
					{id && <UpdateCityForm id={id} />}
				</div>
			</Container>
		</div>
	);
}
