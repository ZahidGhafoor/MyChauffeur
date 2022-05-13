import Button from "components/atoms/Button";
import BookingService from "services/booking.service";
import InvoiceService from "services/invoice.service";
import { MODAL, modalActions } from "redux/slices/modal";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function ConfirmationForm() {
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.modal.data);

	const onClickYes = () => {
		if (data.type === MODAL.UNASSIGN_BOOKING)
			BookingService.unassignBooking(data.id, dispatch);
		else if (data.type === MODAL.GENERATE_INVOICE)
			InvoiceService.generateInvoice(data.id, dispatch);
		else if (data.type === MODAL.GENERATE_ALL_INVOICES)
			InvoiceService.generateAllInvoices(dispatch);
		else if (data.type === MODAL.VERIFY_INVOICE)
			InvoiceService.verifyInvoice(data.id, data.types, dispatch);
		else if (data.type === MODAL.UNPAY_INVOICE)
			InvoiceService.payInvoice(
				data.id,
				data.types,
				{ is_payed: false },
				dispatch
			);
	};

	return (
		<div>
			<h3>{data.heading}</h3>
			<p>{data.message}</p>
			<Button
				variant="outlined"
				sx={{ marginRight: "10px" }}
				onClick={() => dispatch(modalActions.closeModal())}
			>
				No
			</Button>
			<Button variant="contained" onClick={onClickYes}>
				Yes
			</Button>
		</div>
	);
}
