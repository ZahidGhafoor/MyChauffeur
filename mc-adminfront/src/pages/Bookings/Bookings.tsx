import { Container } from "@mui/material";
import BookingsList from "./BookingsList";
import Tabs from "components/templates/Tabs";
import Button from "components/atoms/Button";
import { useNavigate } from "react-router-dom";
import Banner from "components/templates/Banner";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { bookingActions } from "redux/slices/booking";

export default function Bookings() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const tab = useAppSelector((state) => state.booking.tab);

	return (
		<div>
			<Container maxWidth="lg">
				<Banner heading="Bookings">
					<Button
						color="primary"
						variant="contained"
						onClick={() => navigate("/add-booking")}
					>
						Add Booking
					</Button>
				</Banner>
				<Tabs
					value={tab}
					showRefresh
					onRefresh={() => dispatch(bookingActions.refresh())}
					onChange={(tab) => dispatch(bookingActions.setTab(tab))}
					tabs={[
						{ label: "Market", element: <BookingsList type="market" /> },
						{
							label: "My Bookings",
							element: <BookingsList type="admin" />,
						},
						{
							label: "Planned",
							element: <BookingsList type="planned" showFilters />,
						},
						{
							label: "Completed",
							element: <BookingsList type="completed" showFilters />,
						},
						{
							label: "Under Reviewed",
							element: <BookingsList type="review" />,
						},
					]}
				/>
			</Container>
		</div>
	);
}
