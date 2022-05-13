import GoBack from "components/atoms/GoBack";
import AddPartnerForm from "./AddPartnerForm";
import Container from "@mui/material/Container";
import Banner from "components/templates/Banner";
import UpdatePartnerForm from "./UpdatePartnerForm";
import PartnerService from "services/partner.service";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import CircleLoader from "components/atoms/CircleLoader";

export default function AddPartner() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const partner = useAppSelector((state) => state.partner.partner);
	const loading = useAppSelector((state) => state.formLoader.loading);

	const handleSubmit = (values: any) => {
		const {
			address,
			city_ids,
			country_code,
			bank_details,
			company_details,
			billing_address,
		} = values;
		let data = {
			address,
			country_code,
			bank_details,
			billing_address,
			city_ids: city_ids.map((city: any) => city.value),
			...company_details,
		};
		if (data.phone?.data) {
			data.country = data.phone.data.countryCode;
			data.country_code = `+${data.phone.data.dialCode}`;
			data.phone = `+${data.phone.value}`;
		} else {
			data.country = "false";
			data.country_code = "false";
			data.phone = data.phone.value;
		}

		if (id)
			PartnerService.updatePartner(`${id}`, data, dispatch, navigate);
		else PartnerService.addPartner(data, dispatch, navigate);
	};

	return (
		<div>
			<Container>
				<GoBack
					path={`${id ? `/partner-details/${id}` : "/partners"}`}
					title={`Back to ${id ? "Partner Details" : "Partners"} `}
				/>
				<Banner heading={`${id ? "Update" : "Add"} Partner`} />
				<div className="form">
					{loading && <CircleLoader />}
					{partner?.data === "Not Found" ? (
						<p>Partner Not Found</p>
					) : (
						<AddPartnerForm onSubmit={handleSubmit} />
					)}
					{id && <UpdatePartnerForm id={id} />}
				</div>
			</Container>
		</div>
	);
}
