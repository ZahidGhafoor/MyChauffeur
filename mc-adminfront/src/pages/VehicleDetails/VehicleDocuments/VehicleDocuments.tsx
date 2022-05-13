import styles from "../VehicleDetails.module.css";
import DocsTable from "components/templates/DocsTable";

export default function DriverDocuments({ vehicle }: any) {
	const {
		tuv_hu,
		tuv_sticker,
		license_extract,
		liability_insurance,
		registration_certificate,
	} = vehicle;
	const docs = [
		{ var_name: "license_extract", ...license_extract },
		{ var_name: "tuv_sticker", ...tuv_sticker },
		{ var_name: "registration_certificate", ...registration_certificate },
		{ var_name: "tuv_hu", ...tuv_hu },
		{ var_name: "liability_insurance", ...liability_insurance },
	];

	return (
		<>
			<h3 className={styles.heading}>Documents</h3>
			<DocsTable docs={docs} type="vehicle" />
		</>
	);
}
