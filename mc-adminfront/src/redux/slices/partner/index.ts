import { SelectOption } from "components/atoms/Select";

export { default, partnerActions, partnerSlice } from "./partnerSlice";

export interface PartnerState {
	partner: any;
	partners: any[];
	loading: boolean;
	partnerOptions: SelectOption[];
}
