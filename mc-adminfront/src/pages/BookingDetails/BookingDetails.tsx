import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "components/atoms/Button";
import GoBack from "components/atoms/GoBack";
import Banner from "components/templates/Banner";
import BookingService from "services/booking.service";
import { bookingActions } from "redux/slices/booking";
import { Container, Grid, Stack } from "@mui/material";
import { MODAL, modalActions } from "redux/slices/modal";
import CircleLoader from "components/atoms/CircleLoader";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import FileDownloadOutlined from "@mui/icons-material/FileDownloadOutlined";

import MapCard from "./MapCard";
import TripCard from "./TripCard";
import UserCard from "./UserCard";
import NotesCard from "./NotesCard";
import DriverCard from "./DriverCard";
import StatusCard from "./StatusCard";
import PartnerCard from "./PartnerCard";
import PaymentCard from "./PaymentCard";
import BillingAddress from "./BillingAddress";

export default function BookingDetails() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const booking = useAppSelector((state) => state.booking.booking);
	const loading = useAppSelector((state) => state.booking.loading);

	useEffect(() => {
		BookingService.getBooking(`${id}`, dispatch);

		return () => {
			dispatch(bookingActions.setBooking(null));
		};
	}, [id, dispatch]);

	return (
		<Container>
			<GoBack path="/bookings" title="Back to Bookings" />
			<Banner heading="Booking details">
				{booking?._id && (
					<Stack
						rowGap={2}
						spacing={2}
						direction="row"
						flexWrap="wrap"
						alignItems="center"
						justifyContent="flex-start"
					>
						<Button
							variant="contained"
							color="primary"
							onClick={() =>
								dispatch(
									modalActions.openModal({
										type: MODAL.ASSIGN_BOOKING,
										data: id,
										width: "500px",
									})
								)
							}
						>
							Assign
						</Button>
						{booking.is_assigned && (
							<Button
								variant="contained"
								color="primary"
								onClick={() =>
									dispatch(
										modalActions.openModal({
											width: "500px",
											type: MODAL.CONFIRMATION_FORM,
											data: {
												id: booking._id,
												type: MODAL.UNASSIGN_BOOKING,
												heading: "Unassign Booking",
												message:
													"Do you really want to unassign this booking?",
											},
										})
									)
								}
							>
								Unassign
							</Button>
						)}
						<Button
							variant="contained"
							color="primary"
							onClick={() =>
								dispatch(
									modalActions.openModal({
										type: MODAL.UPDATE_BOOKING_STATUS,
										data: id,
										width: "500px",
									})
								)
							}
						>
							Update Status
						</Button>
						{(booking.current_status === "posted" ||
							booking.current_status === "pending") && (
							<Button
								variant="contained"
								color="primary"
								onClick={() =>
									dispatch(
										modalActions.openModal({
											type: MODAL.MARKET_TRANSFER,
											data: {
												type:
													booking.current_status === "posted"
														? "market"
														: "admin",
												data: id,
											},
											width: "500px",
										})
									)
								}
							>
								{booking.current_status === "posted"
									? "Accept from market"
									: "Send to Market"}
							</Button>
						)}
						<Button
							color="error"
							variant="contained"
							onClick={() =>
								dispatch(
									modalActions.openModal({
										data: null,
										width: "500px",
										type: MODAL.CANCEL_BOOKING,
									})
								)
							}
						>
							Cancel
						</Button>
					</Stack>
				)}
			</Banner>
			{booking?._id && (
				<div style={{ padding: "0 0 5px" }}>
					<Stack
						rowGap={2}
						spacing={2}
						direction="row"
						flexWrap="wrap"
						alignItems="center"
						justifyContent="flex-end"
					>
						{booking.current_status === "finished" && booking.invoice && (
							<Button
								variant="text"
								color="primary"
								size="small"
								onClick={() => window.open(booking.invoice, "_blank")}
								sx={{ textTransform: "capitalize", fontWeight: "600" }}
							>
								<FileDownloadOutlined
									fontSize="small"
									sx={{ marginRight: "6px" }}
								/>
								Download invoice
							</Button>
						)}
					</Stack>
				</div>
			)}
			<div style={{ minHeight: "60vh", position: "relative" }}>
				{loading ? (
					<CircleLoader />
				) : booking?._id ? (
					<Grid container columnSpacing={4}>
						<Grid item xs={12} md={8}>
							<TripCard />
							<StatusCard />
							<Grid container spacing={4}>
								<Grid item xs={12} md={6}>
									<NotesCard />
								</Grid>
								<Grid item xs={12} md={6}>
									<MapCard />
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} md={4}>
							<UserCard />
							<PartnerCard />
							<DriverCard />
							<PaymentCard />
							<BillingAddress />
						</Grid>
					</Grid>
				) : (
					"Booking Not Found!"
				)}
			</div>
		</Container>
	);
}
