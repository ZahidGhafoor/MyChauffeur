import Button from "components/atoms/Button";
import { modalActions } from "redux/slices/modal";
import BookingService from "services/booking.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function MarketTransferPopup() {
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.modal.data);

	return (
		<div>
			<h3>
				{data.type === "admin" ? "Send to Market" : "Accept from Market"}
			</h3>
			<p>
				{data.type === "admin"
					? "Do you really want to send this booking in market?"
					: "Do you really want to accpet this booking from market?"}
			</p>
			<Button
				variant="outlined"
				onClick={() => dispatch(modalActions.closeModal())}
				sx={{ marginRight: "10px" }}
			>
				No
			</Button>
			<Button
				variant="contained"
				onClick={() => {
					data.type === "admin"
						? BookingService.sendToMarket(data.data, data.type, dispatch)
						: BookingService.acceptFromMarket(
								data.data,
								data.type,
								dispatch
						  );
				}}
			>
				Yes
			</Button>
		</div>
	);
}
