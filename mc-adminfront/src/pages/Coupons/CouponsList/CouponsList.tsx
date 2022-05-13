import { useNavigate } from "react-router";
import Button from "components/atoms/Button";
import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableContainer,
} from "@mui/material";
import SwitchButton from "components/atoms/SwitchButton";
import {
	StyledTableCell,
	StyledTableRow,
} from "components/templates/Tables";
import { useAppSelector } from "redux/hooks";
import TableLoadingWrapper from "components/templates/TableLoadingWrapper";

export default function CouponsList() {
	const navigate = useNavigate();
	const loading = useAppSelector((state) => state.campaign.loading);
	const campaign = useAppSelector((state) => state.campaign.campaign);

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
					coloumns={4}
					loading={loading}
					message="No coupons are added yet"
					length={!campaign ? 0 : 1}
				>
					<TableHead>
						<TableRow>
							<StyledTableCell>Coupon Code</StyledTableCell>
							<StyledTableCell>Used</StyledTableCell>
							<StyledTableCell>Status</StyledTableCell>
							<StyledTableCell align="center">Action</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{campaign?.coupons.map((coupon: any) => (
							<StyledTableRow key={coupon._id}>
								<StyledTableCell>{coupon.code}</StyledTableCell>
								<StyledTableCell>
									{coupon.used ? "Yes" : "No"}
								</StyledTableCell>
								<StyledTableCell>
									<SwitchButton
										label={
											coupon.status === "active" ? "Active" : "Inactive"
										}
										checked={coupon.status === "active" ? true : false}
									/>
								</StyledTableCell>
								<StyledTableCell align="center">
									<Button
										size="small"
										variant="text"
										color="error"
										onClick={() => navigate(`/update-coupon`)}
									>
										Delete
									</Button>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</TableLoadingWrapper>
			</Table>
		</TableContainer>
	);
}
