import { UserState } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
	users: [],
	user: null,
	loading: true,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		addUser: (state, action) => {
			state.users.unshift(action.payload);
		},
		updateUser: (state, action) => {
			const { id, user } = action.payload;
			state.users.every(({ _id }, i) => {
				if (id === _id) {
					state.users[i] = user;
					return false;
				}
				return true;
			});
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setUsers: (state, action) => {
			state.users = action.payload;
		},
	},
});

const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;
export default userReducer;
