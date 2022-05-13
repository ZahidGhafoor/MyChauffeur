import { InvoiceType } from "redux/slices/invoice";

export { default } from "./PersistFilters";

export interface PersistFiltersProps {
	form: string;
	type: InvoiceType;
}
