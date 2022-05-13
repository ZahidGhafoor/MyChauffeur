import { lazy } from "react";
import { MODAL } from "redux/slices/modal";

const AddNotes = lazy(() => import("./AddNotes"));
const DeleteUser = lazy(() => import("./DeleteUser"));
const AddPayment = lazy(() => import("./AddPayment"));
const PayInvoice = lazy(() => import("./PayInvoice"));
const HandleStatus = lazy(() => import("./HandleStatus"));
const DisableModal = lazy(() => import("./DisableModal"));
const ChildrenSeats = lazy(() => import("./ChildrenSeats"));
const AssignBooking = lazy(() => import("./AssignBooking"));
const CancelBooking = lazy(() => import("./CancelBooking"));
const UploadDocument = lazy(() => import("./UploadDocument"));
const ConfirmationForm = lazy(() => import("./ConfirmationForm"));
const ConfirmationModal = lazy(() => import("./ConfirmationModal"));
const ExportTableOptions = lazy(() => import("./ExportTableOptions"));
const UpdateBookingStatus = lazy(() => import("./UpdateBookingStatus"));
const MarketTransferPopup = lazy(() => import("./MarketTransferPopup"));

export { default } from "./AppModal";

export type ModalMapper = {
	[key in MODAL]: "" | JSX.Element;
};

export const modalMapper: ModalMapper = {
	UNPAY_INVOICE: "",
	VERIFY_INVOICE: "",
	UNASSIGN_BOOKING: "",
	GENERATE_INVOICE: "",
	GENERATE_ALL_INVOICES: "",

	ADD_NOTES: <AddNotes />,
	PAY_INVOICE: <PayInvoice />,
	DELETE_USER: <DeleteUser />,
	ADD_PAYMENT: <AddPayment />,
	HANDLE_STATUS: <HandleStatus />,
	DISABLE_DRIVER: <DisableModal />,
	CHILDREN_SEATS: <ChildrenSeats />,
	ASSIGN_BOOKING: <AssignBooking />,
	CANCEL_BOOKING: <CancelBooking />,
	UPLOAD_DOCUMENT: <UploadDocument />,
	CONFIRMATION_FORM: <ConfirmationForm />,
	MARKET_TRANSFER: <MarketTransferPopup />,
	CONFIRMATION_MODAL: <ConfirmationModal />,
	EXPORT_TABLE_OPTIONS: <ExportTableOptions />,
	UPDATE_BOOKING_STATUS: <UpdateBookingStatus />,
};
