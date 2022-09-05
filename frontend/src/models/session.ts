import { isAuth } from "../utils/localStorageService";

export type Session = {
  isAuthenticated?: boolean;
  redirectPath: string;
}

export const initialSession: Session = {
  redirectPath: '',
  isAuthenticated: isAuth(),
};
