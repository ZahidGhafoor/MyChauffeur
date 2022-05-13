export { default, userActions, userSlice } from "./userSlice";

export interface UserState {
	user: any;
	users: any[];
	loading: boolean;
}
