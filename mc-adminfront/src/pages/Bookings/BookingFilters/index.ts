import { BookingType } from "redux/slices/booking";

export { default } from "./BookingFilters";

export interface BookingFiltersProps {
	type: BookingType;
}
