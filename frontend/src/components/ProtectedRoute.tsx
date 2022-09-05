import { Navigate } from "react-router";
import { havePermission } from "../utils/localStorageService";

export type ProtectedRouteProps = {
  isAuthenticated: boolean | undefined;
  authenticationPath: string;
  redirectPath: string;
  setRedirectPath: (path: string) => void;
  outlet: JSX.Element;
  roles: number[];
};

export default function ProtectedRoute({
  isAuthenticated,
  authenticationPath,
  redirectPath,
  outlet,
  roles,
}: ProtectedRouteProps) {

  const permission = havePermission(roles);

  if (isAuthenticated && permission) {
    return outlet;
  } else {
    return (
      <Navigate
        to={{ pathname: isAuthenticated ? redirectPath : authenticationPath }}
      />
    );
  }
}
