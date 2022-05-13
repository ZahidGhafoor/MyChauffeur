import { InvoiceFiltersProps } from ".";
import DateService from "utils/date.util";
import { useAppDispatch } from "redux/hooks";
import PersistFilters from "./PersistFilters";
import { invoiceActions } from "redux/slices/invoice";
import InvoiceFiltersForm from "./InvoiceFiltersForm";

export default function InvoiceFilters({ type }: InvoiceFiltersProps) {
	const form = "InvoiceFiltersForm";
	const dispatch = useAppDispatch();

	const handleSubmit = (values: any) => {
		let data = {
			invoice_month: DateService.getMonthString(),
		};

		if (values.invoice_month?.date)
			data.invoice_month = DateService.getMonthString(
				values.invoice_month.date
			);

		dispatch(invoiceActions.setFilters({ data, type }));
	};

	return (
		<div className="filters">
			<InvoiceFiltersForm onSubmit={handleSubmit} />
			<PersistFilters form={form} type={type} />
		</div>
	);
}
