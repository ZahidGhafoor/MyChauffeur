import { Button } from "@mui/material";
import { useAppSelector } from "redux/hooks";
import MapService from "services/map.service";
import BookingCards from "components/templates/BookingCards";

export default function MapCard() {
	const booking = useAppSelector((state) => state.booking.booking);

	const handleMap = () => {
		if (booking?.trip_type === "hourly") {
			MapService.renderMap(
				booking?.pickup.title,
				booking?.pickup.address,
				booking?.pickup.coordinates,
				"mapDiv"
			);
		} else {
			const calculateDirections = async () => {
				const response = await MapService.calculateDirections(
					booking?.pickup.place_id,
					booking?.destination.place_id
				);

				MapService.renderDirections(
					response,
					"mapDiv",
					booking?.pickup.coordinates,
					booking?.pickup.title,
					booking?.destination.title
				);
			};

			calculateDirections();
		}
	};

	return (
		<BookingCards style={{ padding: 0 }}>
			<div className="map-card" id="mapDiv">
				<Button
					variant="contained"
					color="primary"
					size="large"
					onClick={handleMap}
				>
					Show Map
				</Button>
			</div>
		</BookingCards>
	);
}
