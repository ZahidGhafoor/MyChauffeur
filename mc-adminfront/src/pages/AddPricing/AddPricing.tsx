import GoBack from "components/atoms/GoBack";
import AddPricingForm from "./AddPricingForm";
import Container from "@mui/material/Container";
import Banner from "components/templates/Banner";
import UpdatePricingForm from "./UpdatePricingForm";
import PricingService from "services/pricing.service";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import CircleLoader from "components/atoms/CircleLoader";

export default function AddPricing() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const pricing = useAppSelector((state) => state.pricing.pricing);
	const loading = useAppSelector((state) => state.formLoader.loading);

	const handleSubmit = async (values: any) => {
		let data = { ...values };

		data.base_rate = values.trip_rates.zero_to_ten;
		data.per_hour_rate = values.hourly_rates.price;

		delete data.hourly_rates;

		if (id)
			PricingService.updatePricing(`${id}`, data, dispatch, navigate);
		else PricingService.addPricing(data, dispatch, navigate);
	};

	return (
		<div>
			<Container>
				<GoBack path="/pricing" title="Back to Pricing" />
				<Banner heading={`${id ? "Update" : "Add"} Pricing`} />
				<div className="form">
					{loading && <CircleLoader />}
					{pricing?.data === "Not Found" ? (
						<p>Pricing Not Found</p>
					) : (
						<AddPricingForm onSubmit={handleSubmit} />
					)}
					{id && <UpdatePricingForm id={id} />}
				</div>
			</Container>
		</div>
	);
}
