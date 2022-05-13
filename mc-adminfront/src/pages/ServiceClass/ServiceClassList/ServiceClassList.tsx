import Chip from "components/atoms/Chip";
import { useNavigate } from "react-router";
import { Fragment, useEffect } from "react";
import Button from "components/atoms/Button";
import ClassService from "services/class.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import TableLoadingWrapper from "components/templates/TableLoadingWrapper";
import {
	StyledTableRow,
	StyledTableCell,
} from "components/templates/Tables";
import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableContainer,
} from "@mui/material";

export default function PartnersList() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.class.loading);
	const classes = useAppSelector((state) => state.class.classes);
	const classesByCity = useAppSelector(
		(state) => state.class.classesByCity
	);

	useEffect(() => {
		ClassService.getAllClasses(dispatch);
	}, [dispatch]);

	return (
		<TableLoadingWrapper
			container
			coloumns={6}
			loading={loading}
			length={classes.length}
			message="There is no service classes added yet"
		>
			{Object.keys(classesByCity).map((city_name, index) => (
				<Fragment key={index}>
					<h3
						style={{
							margin: 0,
							padding: "16px",
							textTransform: "capitalize",
						}}
					>
						{classesByCity[city_name].city_name}
					</h3>
					<TableContainer>
						<Table
							aria-label="customized table"
							sx={{
								minWidth: "100%",
								borderSpacing: "0 10px",
								borderBottomWidth: "0px",
								borderCollapse: "separate",
								tableLayout: { md: "fixed", sm: "auto" },
							}}
						>
							<TableHead>
								<TableRow>
									<StyledTableCell colSpan={1}>Name</StyledTableCell>
									<StyledTableCell colSpan={2}>
										App display
									</StyledTableCell>
									<StyledTableCell colSpan={1}>Capacity</StyledTableCell>
									<StyledTableCell colSpan={1}>Rank</StyledTableCell>
									<StyledTableCell colSpan={1}>Status</StyledTableCell>
									<StyledTableCell colSpan={1} align="center">
										Action
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{classesByCity[city_name].classes.map((classs: any) => (
									<StyledTableRow key={classs._id}>
										<StyledTableCell colSpan={1}>
											{classs.name}
										</StyledTableCell>
										<StyledTableCell colSpan={2}>
											{classs.text}
										</StyledTableCell>
										<StyledTableCell colSpan={1}>
											{classs.max_persons} Persons, {classs.max_bags} Bags
										</StyledTableCell>
										<StyledTableCell colSpan={1}>
											{classs.rank}
										</StyledTableCell>
										<StyledTableCell colSpan={1}>
											<Chip
												status={classs.is_active ? "active" : "On hold"}
											/>
										</StyledTableCell>
										<StyledTableCell colSpan={1} align="center">
											<Button
												size="small"
												variant="text"
												color="primary"
												onClick={() =>
													navigate(`/update-class/${classs._id}`)
												}
											>
												Edit
											</Button>
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Fragment>
			))}
		</TableLoadingWrapper>
	);
}
