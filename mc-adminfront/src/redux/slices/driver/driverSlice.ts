import { DriverState } from ".";
import { SelectOption } from "components/atoms/Select";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DriverState = {
	drivers: [],
	driver: null,
	loading: true,
	driverOptions: [],
};

export const driverSlice = createSlice({
	name: "driver",
	initialState,
	reducers: {
		clear: (state) => {
			state.driverOptions = [];
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		addDriver: (state, action) => {
			state.drivers.unshift(action.payload);
		},
		updateDriver: (state, action) => {
			const { id, driver } = action.payload;
			state.drivers.every(({ _id }, i) => {
				if (id === _id) {
					state.drivers[i] = driver;
					return false;
				}
				return true;
			});
		},
		setDriver: (state, action) => {
			state.driver = action.payload;
		},
		setDrivers: (state, action) => {
			const drivers = action.payload;
			let options: SelectOption[] = [];

			drivers.forEach(({ _id, last_name, first_name }: any) => {
				const option = { value: _id, label: `${first_name} ${last_name}` };
				options.push(option);
			});

			state.driverOptions = options;
			state.drivers = action.payload;
		},
		setPartnerDrivers: (state, action) => {
			const drivers = action.payload;
			let options: SelectOption[] = [];
			drivers.forEach(({ _id, last_name, first_name }: any) =>
				options.push({ value: _id, label: `${first_name} ${last_name}` })
			);
			state.driverOptions = options;
		},
	},
});

const driverReducer = driverSlice.reducer;

export const driverActions = driverSlice.actions;
export default driverReducer;
