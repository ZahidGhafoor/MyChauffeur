import { Container, Grid } from "@mui/material";
import Button from "components/atoms/Button";
import GoBack from "components/atoms/GoBack";
import Banner from "components/templates/Banner";
import BookingCards from "components/templates/BookingCards";
import "./user-details.css";
import UserImg from "assets/user.png";
import UpdateUserProfile from "./UpdateUserProfile";
import BillingAddress from "./BillingAddress";
import VisaImg from "assets/visa.png";
import PaypalImg from "assets/paypal.png";
import { MODAL, modalActions } from "redux/slices/modal";
import AdminNotes from "components/templates/AdminNotes";
import UserService from "services/user.service";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { userActions } from "redux/slices/user";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function UserDetails() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);

	useEffect(() => {
		UserService.getUser(`${id}`, dispatch);

		return () => {
			dispatch(userActions.setUser(null));
		};
	}, [id, dispatch]);

	return (
		<div>
			<Container maxWidth="lg">
				<GoBack path="/users" title="Back to Users" />
				<Banner
					heading={`User details (${
						user ? user.mc_points_balance.toFixed(2) : "0.00"
					}€)`}
				></Banner>
				<Grid container spacing={4}>
					<Grid item md={6}>
						<BookingCards heading="Profile Info">
							<br />
							{/* <Button
                color="secondary"
                variant="text"
                sx={{ position: "absolute", top: "22px", right: "7px" }}
              >
                Edit
              </Button> */}

							<div className="profile-img">
								<img src={UserImg} alt="User" loading="lazy" />
							</div>
							<br />
							<UpdateUserProfile />
						</BookingCards>
						<BookingCards heading="Admin notes">
							<AdminNotes />
						</BookingCards>
					</Grid>
					<Grid item md={6}>
						<BookingCards heading="Billing Info">
							<h4>Billing Address</h4>
							<BillingAddress />
							<hr
								style={{ border: 0, borderBottom: "1px solid #eeeeee" }}
							/>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<h4>Payment methods</h4>
								<Button
									variant="contained"
									color="primary"
									onClick={() =>
										dispatch(
											modalActions.openModal({
												type: MODAL.ADD_PAYMENT,
												data: "",
												width: "500px",
											})
										)
									}
								>
									+ Add Payment Method
								</Button>
							</div>
							<div className="wallet-card default">
								<div className="wallet-card-banner">
									<p>**** **** **** 7231</p>
									<div className="card-type-img">
										<img src={VisaImg} alt="Visa" loading="lazy" />
									</div>
								</div>
								<div className="wallet-card-footer">
									<Button
										variant="text"
										color="error"
										sx={{ textTransform: "capitalize" }}
										onClick={() =>
											dispatch(
												modalActions.openModal({
													type: MODAL.CONFIRMATION_MODAL,
													data: "remove",
													width: "500px",
												})
											)
										}
									>
										Remove
									</Button>
									<Button
										disabled
										variant="text"
										sx={{ textTransform: "capitalize" }}
									>
										Default
									</Button>
								</div>
							</div>
							<div className="wallet-card">
								<div className="wallet-card-banner">
									<p>kamranali@gmail.com</p>
									<div className="card-type-img">
										<img src={PaypalImg} alt="Visa" loading="lazy" />
									</div>
								</div>
								<div className="wallet-card-footer">
									<Button
										variant="text"
										color="error"
										sx={{ textTransform: "capitalize" }}
										onClick={() =>
											dispatch(
												modalActions.openModal({
													type: MODAL.CONFIRMATION_MODAL,
													data: "remove",
													width: "500px",
												})
											)
										}
									>
										Remove
									</Button>
									<Button
										variant="text"
										color="secondary"
										sx={{ textTransform: "capitalize" }}
										onClick={() =>
											dispatch(
												modalActions.openModal({
													type: MODAL.CONFIRMATION_MODAL,
													data: "default",
													width: "500px",
												})
											)
										}
									>
										Make default
									</Button>
								</div>
							</div>
						</BookingCards>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
