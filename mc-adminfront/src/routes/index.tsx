import { lazy } from "react";

const AddCity = lazy(() => import("pages/AddCity"));
const AddClass = lazy(() => import("pages/AddClass"));
const AddModel = lazy(() => import("pages/AddModel"));
const AddDriver = lazy(() => import("pages/AddDriver"));
const AddBooking = lazy(() => import("pages/AddBooking"));
const AddVehicle = lazy(() => import("pages/AddVehicle"));
const AddPartner = lazy(() => import("pages/AddPartner"));
const AddPricing = lazy(() => import("pages/AddPricing"));
const AddCampaign = lazy(() => import("pages/AddCampaign"));

const UserDetails = lazy(() => import("pages/UserDetails"));
const DriverDetails = lazy(() => import("pages/DriverDetails"));
const BookingDetails = lazy(() => import("pages/BookingDetails"));
const VehicleDetails = lazy(() => import("pages/VehicleDetails"));
const PartnerDetails = lazy(() => import("pages/PartnerDetails"));

const City = lazy(() => import("pages/City"));
const Users = lazy(() => import("pages/Users"));
const Login = lazy(() => import("pages/Login"));
const Models = lazy(() => import("pages/Models"));
const Pricing = lazy(() => import("pages/Pricing"));
const Drivers = lazy(() => import("pages/Drivers"));
const Bookings = lazy(() => import("pages/Bookings"));
const Vehicles = lazy(() => import("pages/Vehicles"));
const Partners = lazy(() => import("pages/Partners"));
const Invoices = lazy(() => import("pages/Invoices"));
const Campaigns = lazy(() => import("pages/Campaigns"));
const UsersPoints = lazy(() => import("pages/UsersPoints"));
const ServiceClass = lazy(() => import("pages/ServiceClass"));
const CampaignDetails = lazy(() => import("pages/CampaignDetails"));

export { default } from "./AppRoutes";

export interface IRoute {
	path: string;
	element: JSX.Element;
}

export const public_routes: IRoute[] = [{ path: "/", element: <Login /> }];

export const private_routes: IRoute[] = [
	{ path: "/bookings", element: <Bookings /> },
	{ path: "/add-booking", element: <AddBooking /> },
	{ path: "/update-booking/:id", element: <AddBooking /> },
	{ path: "/booking-details/:id", element: <BookingDetails /> },

	{ path: "users", element: <Users /> },
	{ path: "/user-points/:id", element: <UsersPoints /> },
	{ path: "/user-details/:id", element: <UserDetails /> },

	{ path: "/chauffeurs", element: <Drivers /> },
	{ path: "/add-chauffeur", element: <AddDriver /> },
	{ path: "/update-chauffeur/:id", element: <AddDriver /> },
	{ path: "/chauffeur-details/:id", element: <DriverDetails /> },

	{ path: "/vehicles", element: <Vehicles /> },
	{ path: "/add-vehicle", element: <AddVehicle /> },
	{ path: "/update-vehicle/:id", element: <AddVehicle /> },
	{ path: "/vehicle-details/:id", element: <VehicleDetails /> },

	{ path: "/models", element: <Models /> },
	{ path: "/add-model", element: <AddModel /> },
	{ path: "/update-model/:id", element: <AddModel /> },

	{ path: "/class", element: <ServiceClass /> },
	{ path: "/add-class", element: <AddClass /> },
	{ path: "/update-class/:id", element: <AddClass /> },

	{ path: "/city", element: <City /> },
	{ path: "/add-city", element: <AddCity /> },
	{ path: "/update-city/:id", element: <AddCity /> },

	{ path: "/partners", element: <Partners /> },
	{ path: "/add-partner", element: <AddPartner /> },
	{ path: "/update-partner/:id", element: <AddPartner /> },
	{ path: "/partner-details/:id", element: <PartnerDetails /> },

	{ path: "/campaigns", element: <Campaigns /> },
	{ path: "/add-campaign", element: <AddCampaign /> },
	{ path: "/update-campaign/:id", element: <AddCampaign /> },
	{ path: "/campaign-details/:id", element: <CampaignDetails /> },

	{ path: "/pricing", element: <Pricing /> },
	{ path: "/add-pricing", element: <AddPricing /> },
	{ path: "/update-pricing/:id", element: <AddPricing /> },

	{ path: "/invoices", element: <Invoices /> },
];
