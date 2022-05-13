import { useEffect } from "react";
import Chip from "components/atoms/Chip";
import VehicleService from "services/vehicle.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableContainer,
} from "@mui/material";
import {
	StyledTableRow,
	StyledTableCell,
} from "components/templates/Tables";
import ClassService from "services/class.service";
import TableLoadingWrapper from "components/templates/TableLoadingWrapper";
import { Link } from "react-router-dom";

export default function VehiclesList() {
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.vehicle.loading);
	const vehicles = useAppSelector((state) => state.vehicle.vehicles);
	const modelsDetails = useAppSelector(
		(state) => state.class.modelsDetails
	);

	useEffect(() => {
		ClassService.getAllClasses(dispatch);
		VehicleService.getAllVehicles(dispatch);
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
					coloumns={7}
					loading={loading}
					message="There are no vehicles currently available"
					length={vehicles.length}
				>
					<TableHead>
						<TableRow>
							<StyledTableCell>License Plate</StyledTableCell>
							<StyledTableCell>Model</StyledTableCell>
							<StyledTableCell>Color</StyledTableCell>
							<StyledTableCell>Production Year</StyledTableCell>
							<StyledTableCell>Partner</StyledTableCell>
							<StyledTableCell>Status</StyledTableCell>
							<StyledTableCell align="center">Action</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{vehicles.map((vehicle) => (
							<StyledTableRow key={vehicle._id}>
								<StyledTableCell>{vehicle.license_plate}</StyledTableCell>
								<StyledTableCell>
									{modelsDetails?.[vehicle.model_id]?.name ||
										vehicle.model}
								</StyledTableCell>
								<StyledTableCell>{vehicle.color}</StyledTableCell>
								<StyledTableCell>{vehicle.year}</StyledTableCell>
								<StyledTableCell>
									{`${vehicle.partner_id?.first_name} ${vehicle.partner_id?.last_name}`}
								</StyledTableCell>
								<StyledTableCell>
									<Chip status={vehicle.status} />
								</StyledTableCell>
								<StyledTableCell align="center">
									<Link
										className="detail-link"
										to={`/vehicle-details/${vehicle._id}`}
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
