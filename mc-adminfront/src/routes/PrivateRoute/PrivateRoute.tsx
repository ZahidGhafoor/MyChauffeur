import { PrivateRouteProps } from ".";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "redux/hooks";
import useEffectOnce from "hooks/useEffectOnce";
import ToasterService from "utils/toaster.util";

export default function PrivateRoute({
	children,
	roles = [],
}: PrivateRouteProps) {
	let authenticated = true;
	const user = useAppSelector((state) => state.auth.user);

	if (!user) authenticated = false;
	if (roles.length > 0 && !roles.includes(user.role))
		authenticated = false;

	useEffectOnce(() => {
		if (!authenticated)
			setTimeout(() => ToasterService.showError("Please Login First"), 0);
	});

	return <>{authenticated ? children : <Navigate to="/" />}</>;
}
