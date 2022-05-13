import { PricingState } from ".";
import ToasterService from "utils/toaster.util";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PricingState = {
	pricings: [],
	pricing: null,
	loading: true,
	pricingsByCity: {},
};

export const pricingSlice = createSlice({
	name: "pricing",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		addPricing: (state, action) => {
			let pricingsByCity: any = {};
			let pricings = state.pricings;
			pricings.unshift(action.payload);
			pricings.forEach((pricing: any) => {
				const { city_id } = pricing;
				let city_name = city_id?._id || "Undefined";
				if (pricingsByCity[city_name])
					pricingsByCity[city_name].pricings.push(pricing);
				else
					pricingsByCity[city_name] = {
						pricings: [pricing],
						city_name: city_id?.name,
					};
			});
			state.pricings = pricings;
			state.pricingsByCity = pricingsByCity;
		},
		updatePricing: (state, action) => {
			const { id, pricing } = action.payload;
			let pricingsByCity = state.pricingsByCity;
			state.pricings.every(({ _id }, i) => {
				if (id === _id) {
					state.pricings[i] = pricing;
					return false;
				}
				return true;
			});
			for (const city in pricingsByCity) {
				if (Object.prototype.hasOwnProperty.call(pricingsByCity, city)) {
					let done = false;
					let element = pricingsByCity[city];
					element.pricings.every(({ _id }: any, i: number) => {
						if (id === _id) {
							done = true;
							element.pricings[i] = pricing;
							return false;
						}
						return true;
					});
					if (done) break;
				}
			}
		},
		setPricing: (state, action) => {
			state.pricing = action.payload;
		},
		setPricingByClass: (state, action) => {
			let class_id = action.payload;

			for (const pricing of state.pricings) {
				if (pricing.class_id._id === class_id) {
					state.pricing = pricing;
					break;
				}
			}

			if (!state.pricing)
				ToasterService.showError("Selected Class has no pricing yet!");
		},
		setPricings: (state, action) => {
			let pricingsByCity: any = {};
			const pricings = action.payload;
			pricings.forEach((pricing: any) => {
				const { city_id } = pricing;
				let city_name = city_id?._id || "Undefined";
				if (pricingsByCity[city_name])
					pricingsByCity[city_name].pricings.push(pricing);
				else
					pricingsByCity[city_name] = {
						pricings: [pricing],
						city_name: city_id?.name,
					};
			});
			state.pricings = pricings;
			state.pricingsByCity = pricingsByCity;
		},
	},
});

const pricingReducer = pricingSlice.reducer;

export const pricingActions = pricingSlice.actions;
export default pricingReducer;
