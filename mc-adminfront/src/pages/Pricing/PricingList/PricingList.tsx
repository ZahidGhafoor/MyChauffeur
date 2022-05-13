import "./Pricing.css";

import Grid from "@mui/material/Grid";
import { Fragment, useEffect } from "react";
import Button from "components/atoms/Button";
import { useNavigate } from "react-router-dom";
import PricingService from "services/pricing.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import TableLoadingWrapper from "components/templates/TableLoadingWrapper";

export default function PricingList() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.pricing.loading);
	const pricings = useAppSelector((state) => state.pricing.pricings);
	const pricingsByCity = useAppSelector(
		(state) => state.pricing.pricingsByCity
	);

	useEffect(() => {
		PricingService.getAllPricings(dispatch);
	}, [dispatch]);

	return (
		<TableLoadingWrapper
			container
			coloumns={3}
			loading={loading}
			length={pricings.length}
			message="There is no pricing availabel yet"
		>
			{Object.keys(pricingsByCity).map((city_name, index) => (
				<Fragment key={index}>
					<h2 style={{ textTransform: "capitalize" }}>
						{pricingsByCity[city_name].city_name}
					</h2>
					{pricingsByCity[city_name].pricings.map((pricing: any) => (
						<div className="pricing-card" key={pricing._id}>
							<h3 style={{ textTransform: "capitalize" }}>
								{pricing.class_id.name}
							</h3>
							<Button
								size="small"
								color="primary"
								variant="outlined"
								onClick={() => navigate(`/update-pricing/${pricing._id}`)}
								sx={{
									position: "absolute",
									top: "30px",
									right: "30px",
								}}
							>
								Edit pricing
							</Button>
							<Grid container spacing={1}>
								<Grid item xs={12} md={6}>
									<div className="table-data">
										<h4>Trip</h4>
										<Grid container>
											<Grid item xs={12} md={6}>
												<p>
													Upto 10 km:{" "}
													<b>{pricing.base_rate.toFixed(2)}€</b>
												</p>
											</Grid>
											<Grid item xs={12} md={6}>
												<p>
													10 km to 30 km:{" "}
													<b>
														{pricing.trip_rates.ten_to_thirty.toFixed(2)}€
													</b>
												</p>
											</Grid>
											<Grid item xs={12} md={6}>
												<p>
													30 km to 50 km:{" "}
													<b>
														{pricing.trip_rates.thirty_to_fifty.toFixed(2)}
														€
													</b>
												</p>
											</Grid>
											<Grid item xs={12} md={6}>
												<p>
													50 km to 100 km:{" "}
													<b>
														{pricing.trip_rates.fifty_to_hundred.toFixed(
															2
														)}
														€
													</b>
												</p>
											</Grid>
											<Grid item xs={12} md={6}>
												<p>
													More than 100 km:{" "}
													<b>
														{pricing.trip_rates.more_than_hundred.toFixed(
															2
														)}{" "}
														€
													</b>
												</p>
											</Grid>
										</Grid>
									</div>
								</Grid>
								<Grid item xs={12} md={3}>
									<div className="table-data">
										<h4>Hourly</h4>
										<p>
											Price per hour:{" "}
											<b>{pricing.per_hour_rate.toFixed(2)}€</b>
										</p>
										<p>
											Max km/h:{" "}
											<b>{process.env.REACT_APP_MAX_KM_PER_HOUR} km</b>
										</p>
									</div>
								</Grid>
								<Grid item xs={12} md={3}>
									<div className="table-data">
										<h4>Extra</h4>
										<p>
											Waiting time:{" "}
											<b>
												{pricing.extra.waiting_cost_per_min.toFixed(2)}€
											</b>
										</p>
										<p>
											Airport pickup:{" "}
											<b>
												{pricing.extra.airport_pickup_cost.toFixed(2)}€
											</b>
										</p>
									</div>
								</Grid>
							</Grid>
						</div>
					))}
				</Fragment>
			))}
		</TableLoadingWrapper>
	);
}
