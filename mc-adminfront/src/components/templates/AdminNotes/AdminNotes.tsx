import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import AdminNotesForm from "./AdminNotesForm";
import BookingService from "services/booking.service";
import CircleLoader from "components/atoms/CircleLoader";

export default function AdminNotes({ setShow }: any) {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (values: any) => {
		setLoading(true);
		const [success] = await BookingService.addBookingNotes(
			`${id}`,
			values,
			dispatch
		);
		setLoading(false);

		if (success) setShow(false);
	};

	return (
		<div style={{ position: "relative" }}>
			{loading && <CircleLoader />}
			<AdminNotesForm onSubmit={handleSubmit} />
		</div>
	);
}
