import { VehicleState } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: VehicleState = {
	vehicles: [],
	vehicle: null,
	loading: true,
};

export const vehicleSlice = createSlice({
	name: "vehicle",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		addVehicle: (state, action) => {
			state.vehicles.unshift(action.payload);
		},
		updateVehicle: (state, action) => {
			const { id, vehicle } = action.payload;
			state.vehicles.every(({ _id }, i) => {
				if (id === _id) {
					state.vehicles[i] = vehicle;
					return false;
				}
				return true;
			});
		},
		setVehicle: (state, action) => {
			state.vehicle = action.payload;
		},
		setVehicles: (state, action) => {
			const vehicles = action.payload;
			state.vehicles = vehicles;
		},
	},
});

const vehicleReducer = vehicleSlice.reducer;

export const vehicleActions = vehicleSlice.actions;
export default vehicleReducer;
