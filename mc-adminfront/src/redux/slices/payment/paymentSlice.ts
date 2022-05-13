import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentState, SelectedPayment } from ".";

const initialSelected: SelectedPayment = {
	card: null,
	payment_type: "s",
};

const initialState: PaymentState = {
	stripe: [],
	paypal: [],
	loading: false,
	selected: initialSelected,
};

export const paymentSlice = createSlice({
	name: "payment",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setMethods(state, action) {
			let isSet = false;
			const { credit_cards, payment_methods } = action.payload;

			state.selected.card = null;
			state.selected.payment_type = "s";

			for (const card of credit_cards) {
				if (card.default) {
					isSet = true;
					state.selected.card = card;
					break;
				}
			}

			if (!isSet) {
				for (const card of payment_methods) {
					if (card.default) {
						isSet = true;
						state.selected.card = card;
						break;
					}
				}
			}

			state.stripe = credit_cards;
			state.paypal = payment_methods;

			if (state.selected.card?.token) state.selected.payment_type = "p";
		},
	},
});

const paymentReducer = paymentSlice.reducer;

export const paymentActions = paymentSlice.actions;
export default paymentReducer;
