import { PartnerState } from ".";
import { SelectOption } from "components/atoms/Select";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PartnerState = {
	partners: [],
	partner: null,
	loading: true,
	partnerOptions: [],
};

export const partnerSlice = createSlice({
	name: "partner",
	initialState,
	reducers: {
		clear: (state) => {
			state.partnerOptions = [];
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		addPartner: (state, action) => {
			state.partners.unshift(action.payload);
		},
		updatePartner: (state, action) => {
			const { id, partner } = action.payload;
			state.partners.every(({ _id }, i) => {
				if (id === _id) {
					state.partners[i] = partner;
					return false;
				}
				return true;
			});
		},
		setPartner: (state, action) => {
			state.partner = action.payload;
		},
		setPartners: (state, action) => {
			const partners = action.payload;
			let options: SelectOption[] = [];
			partners.forEach(({ _id, last_name, first_name }: any) =>
				options.push({ value: _id, label: `${first_name} ${last_name}` })
			);
			state.partnerOptions = options;
			state.partners = action.payload;
		},
	},
});

const partnerReducer = partnerSlice.reducer;

export const partnerActions = partnerSlice.actions;
export default partnerReducer;
