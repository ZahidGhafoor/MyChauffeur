import Chip from "components/atoms/Chip";
import Button from "components/atoms/Button";
import {
	StyledTableCell,
	StyledTableRow,
} from "components/templates/Tables";
import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableContainer,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import CampaignService from "services/campaign.service";
import { useEffect } from "react";
import TableLoadingWrapper from "components/templates/TableLoadingWrapper";
import { Link } from "react-router-dom";

export default function CampaignsList() {
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.campaign.loading);
	const campaigns = useAppSelector((state) => state.campaign.campaigns);

	useEffect(() => {
		CampaignService.getCampaigns(dispatch);
	}, [dispatch]);

	return (
		<TableContainer>
			<Table
				aria-label="customized table"
				sx={{
					minWidth: "100%",
					borderSpacing: "0 10px",
					borderBottomWidth: "0px",
					borderCollapse: "separate",
				}}
			>
				<TableLoadingWrapper
					coloumns={6}
					loading={loading}
					message="There is no campaign added yet"
					length={campaigns.length}
				>
					<TableHead>
						<TableRow>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Type</StyledTableCell>
							<StyledTableCell>Min order</StyledTableCell>
							<StyledTableCell>Discount</StyledTableCell>
							<StyledTableCell>Status</StyledTableCell>
							<StyledTableCell align="center">Action</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{campaigns.map((campaign) => (
							<StyledTableRow key={campaign._id}>
								<StyledTableCell>{campaign.title}</StyledTableCell>
								<StyledTableCell>{campaign.usage_type}</StyledTableCell>
								<StyledTableCell>
									{campaign.minimum_price.toFixed(2)}€
								</StyledTableCell>
								<StyledTableCell>
									{campaign.discount.value.toFixed(2)}
									{campaign.discount.type === "amount" ? "€" : "%"}
								</StyledTableCell>
								<StyledTableCell>
									<Chip
										status={
											campaign.status === "active" ? "active" : "On hold"
										}
									/>
								</StyledTableCell>
								<StyledTableCell align="center">
									<Button size="small" variant="text" color="error">
										Delete
									</Button>
									<Link
										className="detail-link"
										to={`/campaign-details/${campaign._id}`}
									>
										Details
									</Link>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</TableLoadingWrapper>
			</Table>
		</TableContainer>
	);
}
