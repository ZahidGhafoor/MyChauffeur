import { CityState } from ".";
import { SelectOption } from "components/atoms/Select";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CityState = {
	cities: [],
	city: null,
	loading: true,
	cityOptions: [],
};

export const citySlice = createSlice({
	name: "city",
	initialState,
	reducers: {
		clear: (state) => {
			state.cityOptions = [];
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		addCity: (state, action) => {
			state.cities.unshift(action.payload);
		},
		updateCity: (state, action) => {
			const { id, city } = action.payload;
			state.cities.every(({ _id }, i) => {
				if (id === _id) {
					state.cities[i] = city;
					return false;
				}
				return true;
			});
		},
		setCity: (state, action) => {
			state.city = action.payload;
		},
		setCities: (state, action) => {
			const cities = action.payload;
			let options: SelectOption[] = [];
			cities.forEach(({ _id, name }: any) =>
				options.push({ value: _id, label: name })
			);
			state.cities = cities;
			state.cityOptions = options;
		},
	},
});

const cityReducer = citySlice.reducer;

export const cityActions = citySlice.actions;
export default cityReducer;
