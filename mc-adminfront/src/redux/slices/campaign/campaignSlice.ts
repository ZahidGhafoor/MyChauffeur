import { CampaignState } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CampaignState = {
	loading: true,
	campaigns: [],
	campaign: null,
};

export const campaignSlice = createSlice({
	name: "campaign",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		addCampaign: (state, action) => {
			state.campaigns.unshift(action.payload);
		},
		updateCampaign: (state, action) => {
			const { id, campaign } = action.payload;
			state.campaigns.every(({ _id }, i) => {
				if (id === _id) {
					state.campaigns[i] = campaign;
					return false;
				}
				return true;
			});
		},
		setCampaign: (state, action) => {
			state.campaign = action.payload;
		},
		setCampaigns: (state, action) => {
			state.campaigns = action.payload;
		},
	},
});

const campaignReducer = campaignSlice.reducer;

export const campaignActions = campaignSlice.actions;
export default campaignReducer;
