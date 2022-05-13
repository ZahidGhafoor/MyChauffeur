import { useEffect } from "react";
import PartnerService from "services/partner.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import TableLoadingWrapper from "components/templates/TableLoadingWrapper";
import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableContainer,
} from "@mui/material";
import {
	StyledTableCell,
	StyledTableRow,
} from "components/templates/Tables";
import Chip from "components/atoms/Chip";
import { Link } from "react-router-dom";

export default function PartnersList() {
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.partner.loading);
	const partners = useAppSelector((state) => state.partner.partners);

	useEffect(() => {
		PartnerService.getAllPartners(dispatch);
	}, [dispatch]);

	return (
		<TableContainer>
			<Table
				aria-label="customized table"
				sx={{
					minWidth: "100%",
					borderSpacing: "0 10px",
					borderBottomWidth: "0px",
					borderCollapse: "separate",
				}}
			>
				<TableLoadingWrapper
					coloumns={4}
					loading={loading}
					length={partners.length}
					message="There is no partner joined yet"
				>
					<TableHead>
						<TableRow>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Phone</StyledTableCell>
							<StyledTableCell>Email</StyledTableCell>
							<StyledTableCell>Status</StyledTableCell>
							<StyledTableCell align="center">Action</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{partners.map((partner) => (
							<StyledTableRow key={partner._id}>
								<StyledTableCell>
									{`${partner.first_name} ${partner.last_name}`}
								</StyledTableCell>
								<StyledTableCell>{partner.phone}</StyledTableCell>
								<StyledTableCell>{partner.email}</StyledTableCell>
								<StyledTableCell>
									<Chip status={partner.status} />
								</StyledTableCell>
								<StyledTableCell align="center">
									<Link
										className="detail-link"
										to={`/partner-details/${partner._id}`}
									>
										Details
									</Link>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</TableLoadingWrapper>
			</Table>
		</TableContainer>
	);
}
