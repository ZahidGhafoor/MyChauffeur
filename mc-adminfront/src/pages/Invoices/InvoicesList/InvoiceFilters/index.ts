import { InvoiceType } from "redux/slices/invoice";

export { default } from "./InvoiceFilters";

export interface InvoiceFiltersProps {
	type: InvoiceType;
}
