import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./slices/auth";
import userReducer from "./slices/user";
import cityReducer from "./slices/city";
import classReducer from "./slices/class";
import modalReducer from "./slices/modal";
import modelReducer from "./slices/model";
import driverReducer from "./slices/driver";
import loaderReducer from "./slices/loader";
import invoiceReducer from "./slices/invoice";
import partnerReducer from "./slices/partner";
import vehicleReducer from "./slices/vehicle";
import pricingReducer from "./slices/pricing";
import bookingReducer from "./slices/booking";
import paymentReducer from "./slices/payment";
import campaignReducer from "./slices/campaign";
import formLoaderReducer from "./slices/formLoader";

const appReducer = combineReducers({
	form: formReducer,

	auth: authReducer,
	user: userReducer,
	city: cityReducer,
	class: classReducer,
	modal: modalReducer,
	model: modelReducer,
	driver: driverReducer,
	loader: loaderReducer,
	invoice: invoiceReducer,
	partner: partnerReducer,
	vehicle: vehicleReducer,
	pricing: pricingReducer,
	booking: bookingReducer,
	payment: paymentReducer,
	campaign: campaignReducer,
	formLoader: formLoaderReducer,
});

const rootReducer = (state: any, action: any) => {
	if (action.type === "auth/logout") state = {};
	return appReducer(state, action);
};

export default rootReducer;
