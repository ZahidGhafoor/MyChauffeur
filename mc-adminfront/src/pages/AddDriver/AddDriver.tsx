import AddDriverForm from "./AddDriverForm";
import GoBack from "components/atoms/GoBack";
import Container from "@mui/material/Container";
import Banner from "components/templates/Banner";
import UpdateDriverForm from "./UpdateDriverForm";
import DriverService from "services/driver.service";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import CircleLoader from "components/atoms/CircleLoader";

export default function AddDriver() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const driver = useAppSelector((state) => state.driver.driver);
	const loading = useAppSelector((state) => state.formLoader.loading);

	const handleSubmit = (values: any) => {
		let data = { ...values };

		data.city = "berlin";
		data.languages = data.languages.map((language: any) => language.value);

		if (data.phone?.data) {
			data.phone = `+${values.phone.value}`;
			data.country = values.phone.data.countryCode;
			data.country_code = `+${values.phone.data.dialCode}`;
		} else {
			data.country = "false";
			data.phone = values.phone.value;
			data.country_code = driver.country_code;
		}

		if (id) {
			DriverService.updateDriver(`${id}`, data, dispatch, navigate);
		} else DriverService.addDriver(data, dispatch, navigate);
	};

	return (
		<div>
			<Container>
				<GoBack
					path={`${
						id && driver?.data !== "Not Found"
							? `/chauffeur-details/${id}`
							: "/chauffeurs"
					}`}
					title={`Back to ${
						id && driver?.data !== "Not Found"
							? "Chauffeur Details"
							: "Chauffeurs"
					} `}
				/>
				<Banner heading={`${id ? "Update" : "Add"} Chauffeur`} />
				<div className="form">
					{loading && <CircleLoader />}
					{driver?.data === "Not Found" ? (
						<p>Chauffeur Not Found</p>
					) : (
						<AddDriverForm onSubmit={handleSubmit} />
					)}
					{id && <UpdateDriverForm id={id} />}
				</div>
			</Container>
		</div>
	);
}
