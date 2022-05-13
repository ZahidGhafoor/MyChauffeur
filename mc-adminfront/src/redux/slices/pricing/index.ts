export { default, pricingActions, pricingSlice } from "./pricingSlice";

export interface PricingState {
	pricing: any;
	pricings: any[];
	loading: boolean;
	pricingsByCity: any;
}
