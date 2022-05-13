export { default, vehicleActions, vehicleSlice } from "./vehicleSlice";

export interface VehicleState {
	vehicle: any;
	vehicles: any[];
	loading: boolean;
}
