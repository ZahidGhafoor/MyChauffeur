import AddNotesForm from "./AddNotesForm";
import DateService from "utils/date.util";
import InvoiceService from "services/invoice.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import BookingCards from "components/templates/BookingCards";

export default function AddNotes() {
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.modal.data);

	const handleSubmit = async (values: any) =>
		InvoiceService.addInvoiceNotes(data.id, data.type, values, dispatch);

	return (
		<div>
			{data.admin_notes.length > 0 && (
				<BookingCards
					heading="Admin Notes"
					style={{ margin: "0", padding: "0" }}
				>
					<div className="card-main">
						{data.admin_notes.length > 0 &&
							data.admin_notes.map(({ _id, time, notes }: any) => (
								<div key={_id} className="card-inner-heading">
									<p className="heading">
										{DateService.getFormattedDateTime(time)}
									</p>
									<p className="text">{notes}</p>
								</div>
							))}
					</div>
				</BookingCards>
			)}
			<h3>Add notes</h3>
			<AddNotesForm onSubmit={handleSubmit} />
		</div>
	);
}
