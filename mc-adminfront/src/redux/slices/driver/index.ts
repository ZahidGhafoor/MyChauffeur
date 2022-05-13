import { SelectOption } from "components/atoms/Select";

export { default, driverActions, driverSlice } from "./driverSlice";

export interface DriverState {
	driver: any;
	drivers: any[];
	loading: boolean;
	driverOptions: SelectOption[];
}
