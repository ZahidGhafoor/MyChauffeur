export { default, campaignActions, campaignSlice } from "./campaignSlice";

export interface CampaignState {
	campaign: any;
	campaigns: any[];
	loading: boolean;
}
