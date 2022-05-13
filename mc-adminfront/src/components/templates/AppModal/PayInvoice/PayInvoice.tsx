import PayInvoiceForm from "./PayInvoiceForm";
import InvoiceService from "services/invoice.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function PayInvoice() {
	const dispatch = useAppDispatch();
	const id = useAppSelector((state) => state.modal.data?.id);
	const type = useAppSelector((state) => state.modal.data?.type);

	const handleSubmit = async (values: any) => {
		let data = { ...values, is_payed: true };
		data.payment_date = new Date(data.payment_date.date).toISOString();
		InvoiceService.payInvoice(id, type, data, dispatch);
	};

	return (
		<div>
			<h3>Pay Invoice</h3>
			<PayInvoiceForm onSubmit={handleSubmit} />
		</div>
	);
}
