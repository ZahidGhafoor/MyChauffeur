import { Link } from "react-router-dom";
import Chip from "components/atoms/Chip";
import DateService from "utils/date.util";
import ObjectService from "utils/object.util";
import { useAppSelector } from "redux/hooks";
import StarIcon from "@mui/icons-material/Star";
import { Box, Grid, Rating } from "@mui/material";
import ClassChip from "components/atoms/ClassChip";
import BookingCards from "components/templates/BookingCards";

export default function TripCard() {
	const booking = useAppSelector((state) => state.booking.booking);

	return (
		<BookingCards heading="Booking Info">
			<Link
				className="detail-link"
				to={`/update-booking/${booking._id}`}
				style={{ position: "absolute", top: "22px", right: "7px" }}
			>
				Edit
			</Link>
			<div className="card-main">
				<div className="card-box">
					<Grid container>
						<Grid item xs={12} md={4}>
							<div className="card-inner-heading">
								<p className="heading">Booking Id</p>
								<p className="text">{booking.booking_number}</p>
							</div>
							<div className="card-inner-heading">
								<p className="heading">Date &amp; Time</p>
								<p className="text">
									{DateService.getDateTimeString(booking.date)}
								</p>
							</div>
						</Grid>
						<Grid item xs={12} md={4}>
							{booking.distance_in_km > 0 && (
								<div className="card-inner-heading">
									<p className="heading">Distance</p>
									<p className="text">{booking.distance_in_km} km</p>
								</div>
							)}
						</Grid>
						<Grid item xs={12} md={4} sx={{ textAlign: "right" }}>
							<div className="card-inner-heading">
								<ClassChip label={booking.class_name} size="small" />
							</div>
							<br />
							<div className="card-inner-heading">
								<Chip status={booking.current_status} />
							</div>
						</Grid>
					</Grid>
				</div>

				<div className="card-box">
					<div className="card-inner-heading">
						<p className="heading">Pickup</p>
						<p>
							{booking.pickup.title}
							<br />
							{booking.pickup.address}
						</p>
					</div>
					{booking.destination.title ? (
						<div className="card-inner-heading">
							<p className="heading">Destination</p>
							<p>
								{booking.destination.title}
								<br />
								{booking.destination.address}
							</p>
						</div>
					) : (
						<div className="card-inner-heading">
							<p className="heading">Duration</p>
							<p>{booking.duration} hours</p>
						</div>
					)}
				</div>

				{booking.booking_for_someone && (
					<div className="card-box">
						<h4 className="card-small-heading">Guest</h4>
						<Grid container alignItems="center">
							<Grid item xs={12} md={4}>
								<div className="card-inner-heading">
									<p className="heading">Name</p>
									<p className="text">
										{booking.booking_for_details.title}{" "}
										{booking.booking_for_details.first_name}{" "}
										{booking.booking_for_details.last_name}
									</p>
								</div>
							</Grid>
							<Grid item xs={12} md={4}>
								<div className="card-inner-heading">
									<p className="heading">Phone</p>
									<p className="text">
										{booking.booking_for_details.phone}
									</p>
								</div>
							</Grid>
							{booking.booking_for_details.email && (
								<Grid item xs={12} md={4}>
									<div className="card-inner-heading">
										<p className="heading">Email</p>
										<p className="text">
											{booking.booking_for_details.email}
										</p>
									</div>
								</Grid>
							)}
						</Grid>
					</div>
				)}
				<div className="card-box">
					<h4 className="card-small-heading">Additional Info</h4>
					<Grid container alignItems="center">
						{booking.additional_info.pickup_sign && (
							<Grid item xs={12} md={4}>
								<div className="card-inner-heading">
									<p className="heading">Pickup sign</p>
									<p className="text with-icon">
										<span>{booking.additional_info.pickup_sign}</span>
									</p>
								</div>
							</Grid>
						)}
						{booking.flight_number && (
							<Grid item xs={12} md={4}>
								<div className="card-inner-heading">
									<p className="heading">Flight No.</p>
									<p className="text with-icon">
										<span>{booking.flight_number}</span>
									</p>
								</div>
							</Grid>
						)}
					</Grid>
					{booking.additional_info.notes && (
						<div className="card-inner-heading">
							<p className="heading">Notes for Chauffeur</p>
							<p className="text">{booking.additional_info.notes}</p>
						</div>
					)}
					{ObjectService.getObjectPropertiesSum(
						booking.additional_info.child_seats
					) > 0 && (
						<div className="card-inner-heading">
							<p className="heading">Children Seats</p>
							<p className="text">
								<>
									{booking.additional_info.child_seats
										?.one_to_three_years > 0 && (
										<>
											<span>
												1-3 years (9-18kg):{" "}
												<b>
													{
														booking.additional_info.child_seats
															?.one_to_three_years
													}
												</b>
											</span>
											<br />
										</>
									)}
									{booking.additional_info.child_seats
										?.three_to_six_years > 0 && (
										<>
											<span>
												3-6 years (15-25kg):{" "}
												<b>
													{
														booking.additional_info.child_seats
															?.three_to_six_years
													}
												</b>
											</span>
											<br />
										</>
									)}
									{booking.additional_info.child_seats
										?.six_to_twelve_years > 0 && (
										<span>
											6-12 years (22-36kg):{" "}
											<b>
												{
													booking.additional_info.child_seats
														?.six_to_twelve_years
												}
											</b>
										</span>
									)}
								</>
							</p>
						</div>
					)}
				</div>

				{booking.ratings &&
					(Number(booking.ratings.driver) > 0 ||
						Number(booking.ratings.vehicle) > 0 ||
						booking.ratings.comment) && (
						<div className="card-box">
							<h4 className="card-small-heading">Rating</h4>
							<Grid container alignItems="center">
								{Number(booking.ratings.driver) > 0 && (
									<Grid item xs={12}>
										<div className="card-inner-heading">
											<Box sx={{ display: "flex", alignItems: "center" }}>
												<span style={{ whiteSpace: "pre" }}>
													Chauffeur{"  "}
												</span>
												<Rating
													readOnly
													value={Number(booking.ratings.driver)}
													emptyIcon={
														<StarIcon
															fontSize="inherit"
															style={{ opacity: 0.55 }}
														/>
													}
												/>
											</Box>
										</div>
									</Grid>
								)}
								{Number(booking.ratings.vehicle) > 0 && (
									<Grid item xs={12}>
										<div className="card-inner-heading">
											<Box sx={{ display: "flex", alignItems: "center" }}>
												<span style={{ whiteSpace: "pre" }}>
													Vehicle{"       "}
												</span>
												<Rating
													readOnly
													value={Number(booking.ratings.vehicle)}
													emptyIcon={
														<StarIcon
															fontSize="inherit"
															style={{ opacity: 0.55 }}
														/>
													}
												/>
											</Box>
										</div>
									</Grid>
								)}
								{booking.ratings.comment && (
									<Grid item xs={12}>
										<div className="card-inner-heading">
											<p className="heading">Comments</p>
											<p className="text">{booking.ratings.comment}</p>
										</div>
									</Grid>
								)}
							</Grid>
						</div>
					)}
			</div>
		</BookingCards>
	);
}
