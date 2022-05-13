import { Container, Grid } from "@mui/material";
import TableBanner from "components/atoms/TableBanner";
import AddCoupon from "./AddCoupon";
import AddRandomCoupon from "./AddRandomCoupon";
import CouponsList from "./CouponsList";

export default function Coupons() {
	return (
		<div>
			<Container>
				<TableBanner heading="Coupons">
					<Grid container justifyContent="space-between">
						<Grid item md={5}>
							<AddCoupon />
						</Grid>
						<Grid item md={5}>
							<AddRandomCoupon />
						</Grid>
					</Grid>
				</TableBanner>
				<CouponsList />
			</Container>
		</div>
	);
}
