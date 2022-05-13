export { default, paymentActions, paymentSlice } from "./paymentSlice";

export interface SelectedPayment {
	card: any;
	payment_type: "s" | "p";
}

export interface PaymentState {
	stripe: any[];
	paypal: any[];
	loading: boolean;
	selected: SelectedPayment;
}
