import Chip from "components/atoms/Chip";
import { useNavigate } from "react-router";
import { Fragment, useEffect } from "react";
import Button from "components/atoms/Button";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import ClassService from "services/class.service";
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

export default function ModelsList() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const loading = useAppSelector((state) => state.class.loading);
	const modelOptions = useAppSelector((state) => state.class.modelOptions);
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
			length={modelOptions.length}
			message="Models list is empty"
		>
			{Object.keys(classesByCity).map((city_name, index) => (
				<Fragment key={index}>
					{classesByCity[city_name].models_length > 0 && (
						<>
							<h2
								style={{
									margin: 0,
									padding: "16px",
									textTransform: "capitalize",
								}}
							>
								{classesByCity[city_name].city_name}
							</h2>
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
											<StyledTableCell colSpan={2}>Name</StyledTableCell>
											<StyledTableCell colSpan={2}>Class</StyledTableCell>
											<StyledTableCell colSpan={1}>
												Max Age
											</StyledTableCell>
											<StyledTableCell colSpan={1}>Status</StyledTableCell>
											<StyledTableCell colSpan={1} align="center">
												Action
											</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{classesByCity[city_name].classes.map(
											(classs: any) => (
												<Fragment key={classs._id}>
													{classs.models.map((model: any) => (
														<StyledTableRow key={model._id}>
															<StyledTableCell colSpan={2}>
																{model.name}
															</StyledTableCell>
															<StyledTableCell colSpan={2}>
																{classs.name}
															</StyledTableCell>
															<StyledTableCell colSpan={1}>
																{model.max_age}
															</StyledTableCell>
															<StyledTableCell colSpan={1}>
																<Chip
																	status={
																		model.is_active ? "active" : "On hold"
																	}
																/>
															</StyledTableCell>
															<StyledTableCell colSpan={1} align="center">
																<Button
																	size="small"
																	variant="text"
																	color="primary"
																	onClick={() =>
																		navigate(`/update-model/${model._id}`)
																	}
																>
																	Edit
																</Button>
															</StyledTableCell>
														</StyledTableRow>
													))}
												</Fragment>
											)
										)}
									</TableBody>
								</Table>
							</TableContainer>
						</>
					)}
				</Fragment>
			))}
		</TableLoadingWrapper>
	);
}
