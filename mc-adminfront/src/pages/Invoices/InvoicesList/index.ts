import { InvoiceType } from "redux/slices/invoice";

export { default } from "./InvoicesList";

export interface InvoicesListProps {
	type: InvoiceType;
	showFilters?: Boolean;
}
