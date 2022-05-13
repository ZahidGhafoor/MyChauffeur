import { useEffect } from "react";
import { Container, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import GoBack from "components/atoms/GoBack";
import Button from "components/atoms/Button";
import PartnerProfile from "./PartnerProfile";
import styles from "./PartnerDetails.module.css";
import Banner from "components/templates/Banner";
import PartnerService from "services/partner.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { partnerActions } from "redux/slices/partner";
import PartnerDocuments from "./PartnerDocuments";

export default function PartnerDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const partner = useAppSelector((state) => state.partner.partner);

	useEffect(() => {
		PartnerService.getPartner(id || "", dispatch);
		return () => {
			dispatch(partnerActions.setPartner(null));
		};
	}, [id, dispatch]);

	return (
		<Container>
			<GoBack path="/partners" title="Back to Partners" />
			<Banner heading="Partner details" />
			{!partner ? null : partner?.data === "Not Found" ? (
				<p>Partner Not Found</p>
			) : (
				<div className={styles.detailsBox}>
					<Button
						size="small"
						variant="text"
						color="primary"
						onClick={() => navigate(`/update-partner/${partner._id}`)}
						sx={{
							position: "absolute",
							right: "15px",
							top: "25px",
						}}
					>
						Edit
					</Button>
					<PartnerProfile partner={partner} />
					<Divider variant="middle" />
					<br />
					<PartnerDocuments partner={partner} />
				</div>
			)}
		</Container>
	);
}
