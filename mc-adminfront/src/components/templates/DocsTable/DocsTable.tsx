import { DocsTableProps } from ".";
import DateService from "utils/date.util";
import { useParams } from "react-router-dom";
import Button from "components/atoms/Button";
import { useAppDispatch } from "redux/hooks";
import Tooltip from "components/atoms/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { MODAL, modalActions } from "redux/slices/modal";
import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableContainer,
	Stack,
} from "@mui/material";
import {
	StyledTableCell,
	StyledTableRow,
} from "components/templates/Tables";
import StatusUpdateChip from "components/atoms/StatusUpdateChip";

export default function DocsTable({ docs, type }: DocsTableProps) {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	return (
		<TableContainer>
			<Table
				aria-label="customized table"
				sx={{
					minWidth: "100%",
					borderBottomWidth: "0px",
					borderSpacing: "0 10px",
					borderCollapse: "separate",
					backgroundColor: "#fafafa",
				}}
			>
				<TableHead>
					<TableRow>
						<StyledTableCell>Name</StyledTableCell>
						<StyledTableCell>Expiry date</StyledTableCell>
						<StyledTableCell>Status</StyledTableCell>
						<StyledTableCell></StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{docs.map((doc, index) => (
						<StyledTableRow key={index}>
							<StyledTableCell>{doc.name}</StyledTableCell>
							<StyledTableCell>
								{doc.expiry_date
									? DateService.getFormattedDate(doc.expiry_date)
									: "_"}
							</StyledTableCell>
							<StyledTableCell>
								{doc.status ? (
									<div
										style={{
											display: "flex",
											alignItems: "center",
											textTransform: "capitalize",
											justifyContent: "space-between",
										}}
									>
										<StatusUpdateChip
											label={doc.status}
											menu={["Approved", "Rejected"]}
											data={{ id, type, doc: true, ...doc }}
										/>

										{doc.status !== "approved" && doc.status_reason && (
											<Tooltip
												placement="top-start"
												title={doc.status_reason}
											>
												<InfoIcon
													sx={{ color: "gray", cursor: "pointer" }}
												/>
											</Tooltip>
										)}
									</div>
								) : (
									"_"
								)}
							</StyledTableCell>
							<StyledTableCell sx={{ float: "right" }}>
								<Stack direction="row" spacing={2}>
									{doc.url && (
										<Button
											size="small"
											variant="text"
											color="primary"
											onClick={() => window.open(doc.url, "_blank")}
										>
											Download
										</Button>
									)}
									<Button
										size="small"
										color="primary"
										variant="outlined"
										onClick={() => {
											dispatch(
												modalActions.openModal({
													type: MODAL.UPLOAD_DOCUMENT,
													data: { ...doc, id, type },
													width: "500px",
												})
											);
										}}
									>
										Upload
									</Button>
								</Stack>
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
