import styles from "../DriverDetails.module.css";
import DocsTable from "components/templates/DocsTable";

export default function DriverDocuments({ driver }: any) {
	const { license, p_schein, profile_pic } = driver;
	const docs = [
		{ var_name: "license", ...license },
		{ var_name: "p_schein", ...p_schein },
		{ var_name: "profile_pic", ...profile_pic },
	];

	return (
		<>
			<h3 className={styles.heading}>Documents</h3>
			<DocsTable docs={docs} type="driver" />
		</>
	);
}
