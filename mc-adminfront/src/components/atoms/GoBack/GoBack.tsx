import { GoBackProps } from ".";
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
export default function GoBack({ path, title }: GoBackProps) {
	return (
		<div className="goback">
			<Link to={path}>
				<BsArrowLeftShort size="24px" />
				<span>{title}</span>
			</Link>
		</div>
	);
}
