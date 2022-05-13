import { BookingType } from "redux/slices/booking";

export { default } from "./PersistFilters";

export interface PersistFiltersProps {
	form: string;
	type: BookingType;
}
