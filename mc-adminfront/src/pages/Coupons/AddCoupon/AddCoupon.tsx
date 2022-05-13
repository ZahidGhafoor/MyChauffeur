import AddCouponForm from "./AddCouponForm";
import { useParams } from "react-router-dom";
import CampaignService from "services/campaign.service";
import CircleLoader from "components/atoms/CircleLoader";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function AddCoupon() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.campaign.loading);

	const handleSubmit = async (values: any) => {
		CampaignService.addCoupon({ ...values, campaign_id: id }, dispatch);
	};

	return (
		<div style={{ position: "relative" }}>
			{loading && <CircleLoader />}
			<AddCouponForm onSubmit={handleSubmit} />
		</div>
	);
}
