import { useState } from "react";
import { Button } from "@mui/material";
import DateService from "utils/date.util";
import { useAppSelector } from "redux/hooks";
import AdminNotes from "components/templates/AdminNotes";
import BookingCards from "components/templates/BookingCards";

export default function NotesCard() {
	const [show, setShow] = useState(false);
	const booking = useAppSelector((state) => state.booking.booking);

	return (
		<BookingCards heading="Admin Notes">
			<div className="card-main">
				{booking.admin_notes &&
					booking.admin_notes.map(({ _id, time, message }: any) => (
						<div key={_id} className="card-inner-heading">
							<p className="heading">
								{DateService.getFormattedDateTime(time)}
							</p>
							<p className="text">{message}</p>
						</div>
					))}
				{show ? (
					<AdminNotes setShow={setShow} />
				) : (
					<>
						<br />
						<Button
							fullWidth
							size="large"
							color="primary"
							variant="outlined"
							onClick={() => setShow(true)}
						>
							Add New
						</Button>
					</>
				)}
			</div>
		</BookingCards>
	);
}
