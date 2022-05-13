import {
	Stack,
	Table,
	TableRow,
	TableHead,
	TableBody,
	IconButton,
	TableContainer,
} from "@mui/material";
import { useEffect } from "react";
import { InvoicesListProps } from ".";
import { MODAL } from "redux/slices/modal";
import { modalActions } from "redux/slices/modal";
import GetAppIcon from "@mui/icons-material/GetApp";
import InvoiceService from "services/invoice.service";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import TableLoadingWrapper from "components/templates/TableLoadingWrapper";
import {
	StyledTableCell,
	StyledTableRow,
} from "components/templates/Tables";
import Button from "components/atoms/Button";
import InvoiceFilters from "./InvoiceFilters";

export default function InvoicesList({
	type,
	showFilters,
}: InvoicesListProps) {
	const dispatch = useAppDispatch();
	const refresh = useAppSelector((state) => state.invoice.refresh);
	const filters = useAppSelector((state) => state.invoice[type].filters);
	const loading = useAppSelector((state) => state.invoice[type].loading);
	const invoices = useAppSelector((state) => state.invoice[type].invoices);
	const refreshLoader = useAppSelector(
		(state) => state.invoice.refreshLoader
	);

	useEffect(() => {
		const data = showFilters ? filters : null;
		InvoiceService.getInvoices(type, data, dispatch);
	}, [type, filters, refresh, showFilters, dispatch]);

	return (
		<>
			{showFilters && <InvoiceFilters type={type} />}

			<TableContainer>
				<Table
					sx={{
						minWidth: "100%",
						borderCollapse: "separate",
						borderBottomWidth: "0px",
						borderSpacing: "0 10px",
					}}
					aria-label="customized table"
				>
					<TableLoadingWrapper
						coloumns={6}
						loading={loading}
						message="No Invoices Yet!"
						length={refreshLoader ? 0 : invoices.length}
					>
						<TableHead>
							<TableRow>
								<StyledTableCell>Id</StyledTableCell>
								<StyledTableCell>Partner</StyledTableCell>
								<StyledTableCell>Phone</StyledTableCell>
								<StyledTableCell>Email</StyledTableCell>
								<StyledTableCell>Month</StyledTableCell>
								<StyledTableCell>Price</StyledTableCell>
								<StyledTableCell align="center">Action</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{invoices.map((invoice) => (
								<StyledTableRow key={invoice._id}>
									<StyledTableCell>
										{invoice.invoice_number}
									</StyledTableCell>
									<StyledTableCell>
										{`${invoice.partner_id.title} ${invoice.partner_id.first_name} ${invoice.partner_id.last_name}`}
									</StyledTableCell>
									<StyledTableCell>
										{invoice.partner_id.phone}
									</StyledTableCell>
									<StyledTableCell>
										{invoice.partner_id.email}
									</StyledTableCell>
									<StyledTableCell>
										{invoice.invoice_month}
									</StyledTableCell>
									<StyledTableCell>{invoice.total_price}€</StyledTableCell>
									<StyledTableCell align="center">
										<Stack
											direction="row"
											alignItems="center"
											justifyContent="center"
										>
											<IconButton
												color="primary"
												aria-label="Notes"
												onClick={() =>
													dispatch(
														modalActions.openModal({
															width: "800px",
															type: MODAL.ADD_NOTES,
															data: {
																type,
																id: invoice._id,
																admin_notes: invoice.admin_notes,
															},
														})
													)
												}
											>
												<NoteAltIcon />
											</IconButton>
											<IconButton
												color="primary"
												aria-label="Download"
												onClick={() =>
													window.open(invoice.invoice_link, "_blank")
												}
											>
												<GetAppIcon />
											</IconButton>
											{(type === "latest" || type === "processed") && (
												<Button
													size="small"
													onClick={() => {
														dispatch(
															modalActions.openModal({
																width: "500px",
																type: MODAL.CONFIRMATION_FORM,
																data: {
																	types: type,
																	id: invoice._id,
																	type: MODAL.VERIFY_INVOICE,
																	heading: `${
																		type === "latest" ? "" : "Un"
																	}Process Invoice`,
																	message: `Do you really want to ${
																		type === "latest" ? "" : "un"
																	}process this invoice?`,
																},
															})
														);
													}}
												>
													{type === "latest" ? "" : "Un"}Process
												</Button>
											)}
											{type === "processed" && (
												<Button
													size="small"
													onClick={() => {
														dispatch(
															modalActions.openModal({
																width: "500px",
																type: MODAL.PAY_INVOICE,
																data: { type, id: invoice._id },
															})
														);
													}}
												>
													Pay
												</Button>
											)}
											{type === "completed" && (
												<Button
													size="small"
													onClick={() => {
														dispatch(
															modalActions.openModal({
																width: "500px",
																type: MODAL.CONFIRMATION_FORM,
																data: {
																	types: type,
																	id: invoice._id,
																	type: MODAL.UNPAY_INVOICE,
																	heading: "UnPay Invoice",
																	message:
																		"Do you really want to unpay this invoice?",
																},
															})
														);
													}}
												>
													UnPay
												</Button>
											)}
											<Button
												size="small"
												onClick={() => {
													dispatch(
														modalActions.openModal({
															width: "500px",
															type: MODAL.CONFIRMATION_FORM,
															data: {
																id: invoice.partner_id._id,
																type: MODAL.GENERATE_INVOICE,
																heading: "Generate Invoice",
																message:
																	"Do you really want to generate invoice?",
															},
														})
													);
												}}
											>
												Generate
											</Button>
										</Stack>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</TableLoadingWrapper>
				</Table>
			</TableContainer>
		</>
	);
}
