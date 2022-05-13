import {
	Pagination,
	Stack,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import BasicMenu from "components/atoms/BasicMenu";
import ClassChip from "components/atoms/ClassChip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MODAL, modalActions } from "redux/slices/modal";
import { useEffect } from "react";
import BookingService from "services/booking.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
	StyledTableCell,
	StyledTableRow,
} from "components/templates/Tables";
import TableLoadingWrapper from "components/templates/TableLoadingWrapper";
import DateService from "utils/date.util";
import { BookingsListProps } from ".";
import Chip from "components/atoms/Chip";
import BookingFilters from "../BookingFilters";
import { bookingActions } from "redux/slices/booking";

export default function BookingsList({
	type,
	showFilters,
}: BookingsListProps) {
	const dispatch = useAppDispatch();
	const refresh = useAppSelector((state) => state.booking.refresh);
	const refreshLoader = useAppSelector(
		(state) => state.booking.refreshLoader
	);
	const count = useAppSelector((state) => state.booking[type].count);
	const loading = useAppSelector((state) => state.booking[type].loading);
	const filters = useAppSelector((state) => state.booking[type].filters);
	const bookings = useAppSelector((state) => state.booking[type].bookings);

	useEffect(() => {
		return () => {
			dispatch(bookingActions.resetPage(type));
		};
	}, [dispatch, type]);

	useEffect(() => {
		const data = showFilters ? filters : null;
		BookingService.getBookings(type, data, dispatch);
	}, [type, filters, refresh, dispatch, showFilters]);

	return (
		<>
			{showFilters && <BookingFilters type={type} />}

			{!refreshLoader && (
				<div className="pagination-list">
					<p>{count > 0 && `${count} Booking${count > 1 ? "s" : ""}`}</p>
					{showFilters && count > 0 && (
						<Pagination
							page={filters.page}
							count={Math.ceil(count / filters.page_size)}
							onChange={(_e, page) =>
								dispatch(bookingActions.setPage({ type, page }))
							}
						/>
					)}
				</div>
			)}

			<TableContainer>
				<Table
					sx={{
						minWidth: "100%",
						borderCollapse: "separate",
						borderBottomWidth: "0px",
						borderSpacing: "0 10px",
					}}
					aria-label="customized table"
				>
					<TableLoadingWrapper
						loading={loading}
						length={refreshLoader ? 0 : bookings.length}
						coloumns={type === "planned" || type === "completed" ? 8 : 7}
						message={
							type === "market"
								? "We couldn't find any booking in the market"
								: type === "admin"
								? "You haven't added any booking yet"
								: type === "planned"
								? "We couldn't find any planned booking"
								: "We couldn't find any completed booking"
						}
					>
						<TableHead>
							<TableRow>
								<StyledTableCell>ID</StyledTableCell>
								<StyledTableCell sx={{ whiteSpace: "nowrap" }}>
									Date &amp; Time
								</StyledTableCell>
								<StyledTableCell>Customer</StyledTableCell>
								<StyledTableCell>Route</StyledTableCell>
								<StyledTableCell>Class</StyledTableCell>
								<StyledTableCell>Price</StyledTableCell>
								{(type === "planned" || type === "completed") && (
									<StyledTableCell sx={{ whiteSpace: "nowrap" }}>
										{type === "planned" ? "Accepted" : "Completed"} by
									</StyledTableCell>
								)}
								<StyledTableCell align="center">Action</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{bookings.map((booking, index) => (
								<StyledTableRow key={index}>
									<StyledTableCell>
										{booking.booking_number}
									</StyledTableCell>
									<StyledTableCell sx={{ whiteSpace: "nowrap" }}>
										{DateService.getShortDateString(booking.date)}
										<br />
										{DateService.getTimeString(booking.date)}
									</StyledTableCell>
									<StyledTableCell>
										{booking.booking_for_someone ? (
											<>
												{booking.booking_for_details.title}{" "}
												{booking.booking_for_details.first_name}{" "}
												{booking.booking_for_details.last_name}
											</>
										) : (
											<>
												{booking.user_details.title}{" "}
												{booking.user_details.first_name}{" "}
												{booking.user_details.last_name}
											</>
										)}
										<br />
										{booking.booking_for_someone ? (
											<>{booking.booking_for_details.phone}</>
										) : (
											<>{booking.user_details.phone}</>
										)}
									</StyledTableCell>
									<StyledTableCell>
										{booking.pickup.address} <br />
										{booking.trip_type === "trip" ? (
											booking.destination.address
										) : (
											<>{booking.duration} hours</>
										)}
									</StyledTableCell>
									<StyledTableCell>
										<ClassChip label={booking.class_name} size="small" />
									</StyledTableCell>
									<StyledTableCell sx={{ whiteSpace: "nowrap" }}>
										<b>
											{booking.price_details.brutto_price.toFixed?.(2)}€
										</b>
										<br />
										<span style={{ whiteSpace: "nowrap" }}>
											{booking.trip_type === "trip" &&
												booking.distance_in_km.toFixed?.(2) + " km"}
										</span>
									</StyledTableCell>
									{(type === "planned" || type === "completed") && (
										<StyledTableCell>
											{booking.partner_details ? (
												<>
													{booking.partner_details.title}{" "}
													{booking.partner_details.first_name}{" "}
													{booking.partner_details.last_name}
												</>
											) : (
												<span style={{ color: "rgb(183, 33, 54)" }}>
													No partner assigned
												</span>
											)}
											<br />
											{booking.is_assigned ? (
												<>
													{booking.driver_details ? (
														<>
															{booking.driver_details.title}{" "}
															{booking.driver_details.first_name}{" "}
															{booking.driver_details.last_name}
														</>
													) : (
														<span style={{ color: "rgb(183, 33, 54)" }}>
															No chauffeur details
														</span>
													)}
												</>
											) : (
												<span style={{ color: "rgb(183, 33, 54)" }}>
													No chauffeur assigned
												</span>
											)}
										</StyledTableCell>
									)}
									<StyledTableCell align="center">
										{(type === "planned" || type === "completed") && (
											<>
												<Chip status={booking.current_status} /> <br />
											</>
										)}
										<Stack
											direction="row"
											alignItems="center"
											justifyContent="center"
										>
											<Link
												className="detail-link"
												to={`/booking-details/${booking._id}`}
											>
												Details
											</Link>
											{(type === "admin" || type === "market") && (
												<BasicMenu
													list={[
														{
															text:
																type === "market"
																	? "Accept from Market"
																	: "Send to Market",
															onClick: () =>
																dispatch(
																	modalActions.openModal({
																		type: MODAL.MARKET_TRANSFER,
																		data: {
																			type: type,
																			data: booking._id,
																		},
																		width: "500px",
																	})
																),
														},
													]}
													avatar={false}
												>
													<MoreVertIcon />
												</BasicMenu>
											)}
										</Stack>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</TableLoadingWrapper>
				</Table>
			</TableContainer>

			{!refreshLoader && showFilters && count > 0 && (
				<Pagination
					page={filters.page}
					count={Math.ceil(count / filters.page_size)}
					onChange={(_e, page) =>
						dispatch(bookingActions.setPage({ type, page }))
					}
				/>
			)}
		</>
	);
}
