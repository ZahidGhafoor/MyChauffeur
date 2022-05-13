import CircleLoader from "components/atoms/CircleLoader";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import CampaignService from "services/campaign.service";
import AddRandomCouponForm from "./AddRandomCouponForm";

export default function AddRandomCoupon() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.campaign.loading);

	const handleSubmit = async (values: any) => {
		CampaignService.addCoupons({ ...values, campaign_id: id }, dispatch);
	};

	return (
		<div style={{ position: "relative" }}>
			{loading && <CircleLoader />}
			<AddRandomCouponForm onSubmit={handleSubmit} />
		</div>
	);
}
