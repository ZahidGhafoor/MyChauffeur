import { SelectOption } from "components/atoms/Select";

export { default, cityActions, citySlice } from "./citySlice";

export interface CityState {
	city: any;
	cities: any[];
	loading: boolean;
	cityOptions: SelectOption[];
}
