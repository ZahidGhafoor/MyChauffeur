import format from "date-fns/format";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import GoBack from "components/atoms/GoBack";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import AddCampaignForm from "./AddCampaignForm";
import Banner from "components/templates/Banner";
import CampaignService from "services/campaign.service";
import CircleLoader from "components/atoms/CircleLoader";

export default function AddCampaign() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.formLoader.loading);

	const handleSubmit = async (values: any) => {
		let data = { ...values };

		data.status = data.status ? "active" : "inactive";
		data.start_date = format(
			new Date(data.date.date[0]),
			"yyyy-MM-dd HH:mm:ss.SSSSSS"
		);
		data.end_date = format(
			new Date(data.date.date[1]),
			"yyyy-MM-dd HH:mm:ss.SSSSSS"
		);

		delete data.date;

		CampaignService.addCampaign(data, dispatch, navigate);
	};

	return (
		<div>
			<Container>
				<GoBack path="/campaigns" title="Back to Campaigns" />
				<Banner heading="Add Campaign" />
				<div className="form">
					{loading && <CircleLoader />}
					<AddCampaignForm onSubmit={handleSubmit} />
				</div>
			</Container>
		</div>
	);
}
