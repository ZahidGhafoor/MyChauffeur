import { Container, Grid } from "@mui/material";
import GoBack from "components/atoms/GoBack";
import Banner from "components/templates/Banner";
import Coupons from "pages/Coupons";
import UpdateCampaign from "pages/UpdateCampaign";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { campaignActions } from "redux/slices/campaign";
import CampaignService from "services/campaign.service";

export default function CampaignDetails() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.campaign.loading);
	const campaign = useAppSelector((state) => state.campaign.campaign);

	useEffect(() => {
		CampaignService.getCampaign(`${id}`, dispatch);

		return () => {
			dispatch(campaignActions.setCampaign(null));
		};
	}, [id, dispatch]);

	return (
		<div>
			<Container maxWidth="xl">
				<GoBack path="/campaigns" title="Back to Campaigns" />
				<Banner heading="Campaign" />
				{loading ? (
					"Loading..."
				) : !campaign || campaign?.data === "Not Found" ? (
					"Campaign Not Found!"
				) : (
					<Grid container>
						<Grid item xs={12} lg={4}>
							<div className="form">
								<UpdateCampaign />
							</div>
						</Grid>
						<Grid item xs={12} lg={8}>
							<Coupons />
						</Grid>
					</Grid>
				)}
			</Container>
		</div>
	);
}
