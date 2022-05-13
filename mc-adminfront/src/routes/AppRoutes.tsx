import { Suspense } from "react";
import PrivateRoute from "./PrivateRoute";
import { public_routes, private_routes } from "routes";
import CircleLoader from "components/atoms/CircleLoader";
import { Navigate, Route, Routes } from "react-router-dom";

export default function AppRoutes() {
	return (
		<div style={{ minHeight: "90vh", position: "relative" }}>
			<Suspense fallback={<CircleLoader />}>
				<Routes>
					{public_routes.map(({ path, element }, i) => (
						<Route key={i} path={path} element={element} />
					))}

					{private_routes.map(({ path, element }, i) => (
						<Route
							key={i}
							path={path}
							element={<PrivateRoute>{element}</PrivateRoute>}
						/>
					))}

					<Route path="*" element={<Navigate to="/" />} />
					{/* <Route path="*" element={<NotFound />} /> */}
				</Routes>
			</Suspense>
		</div>
	);
}
