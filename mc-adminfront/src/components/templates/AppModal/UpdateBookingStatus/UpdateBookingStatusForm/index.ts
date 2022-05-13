import { SelectOption } from "components/atoms/Select";

export { default } from "./UpdateBookingStatusForm";

export const statuses: SelectOption[] = [
	{ value: "posted", label: "Posted" },
	{ value: "accepted", label: "Accepted" },
	{ value: "ongoing", label: "Ongoing" },
	{ value: "arrived", label: "Arrived" },
	{ value: "started", label: "Started" },
	{ value: "paused", label: "Paused" },
	{ value: "resumed", label: "Resumed" },
	{ value: "finished", label: "Finished" },
	{ value: "cancelled", label: "Cancelled" },
	{ value: "noshow", label: "No show" },
];
