import ProtectedRoute from "../components/ProtectedRoute";
import { useSessionContext } from "../contexts/SessionContext";
import { Route, Routes } from "react-router";
import Homepage from "./Homepage";
import Login from "./Login";
import ControlHome from "./ControlHome";
import CreateEvent from "../components/Agenda/CreateEvent";
import EditEvent from "../components/Agenda/EditEvent";
import ListEvent from "../components/Agenda/ListEvent";
import AudioBooks from "../components/AudioBooks/AudioBooks";
import CreateAudioBook from "../components/AudioBooks/CreateAudioBook";
import EditAudioBook from "../components/AudioBooks/EditAudioBook";
import ListAudioBook from "../components/AudioBooks/ListAudioBook";
import Profile from "../components/Config/Profile";
import Contract from "../components/Form/Contract";
import EditFormContract from "../components/Form/EditFormContract";
import EditFormSubscription from "../components/Form/EditFormSubscription";
import ListForm from "../components/Form/ListForm";
import Register from "../components/Form/Register";
import CreateSupporter from "../components/Parceiros/CreateSupporter";
import EditSupporter from "../components/Parceiros/EditSupporter";
import ListSupporter from "../components/Parceiros/ListSupporter";
import About from "../components/Sobre/About";
import CreateInfo from "../components/Sobre/Infos/CreateInfo";
import EditInfo from "../components/Sobre/Infos/EditInfo";
import ListInfo from "../components/Sobre/Infos/ListInfo";
import CreateMember from "../components/Sobre/Membros/CreateMember";
import EditMember from "../components/Sobre/Membros/EditMember";
import ListMember from "../components/Sobre/Membros/ListMember";
import Galery from "../components/Galeria/Galery";
import ListImage from "../components/Galeria/ListImage";
import CreateImage from "../components/Galeria/CreateImage";
import ListUser from "../components/Users/ListUser";
import EditUser from "../components/Users/EditUser";
import CreateUser from "../components/Users/CreateUser";
import Schedule from "../components/Agenda/Schedule";
import ROLE from "../utils/enum/roles";

export type DefaultProtectedRouteProps = {
  isAuthenticated: boolean | undefined;
  authenticationPath: string;
  redirectPath: string;
  setRedirectPath: (path: string) => void;
  outlet: JSX.Element;
};

export default function App() {
  const [sessionContext, updateSessionContext] = useSessionContext();

  const setRedirectPath = (path: string) => {
    updateSessionContext({ ...sessionContext, redirectPath: path });
  };

  const ProtectedRouteProps: Omit<DefaultProtectedRouteProps, "outlet"> = {
    isAuthenticated: sessionContext.isAuthenticated,
    authenticationPath: "/login",
    redirectPath: sessionContext.redirectPath,
    setRedirectPath: setRedirectPath,
  };

  return (
    <div>
      <Routes>
        {/* SITE */}
        <Route path="/" element={<Homepage />} />
        <Route path="/Agenda" element={<Schedule />} />
        <Route path="/Seja%20um%20leitor" element={<Register />} />
        <Route path="/Contrate%20um%20leitor" element={<Contract />} />
        <Route path="/AudioBooks" element={<AudioBooks />} />
        <Route path="/Sobre" element={<About />} />
        <Route path="/Galeria" element={<Galery />} />

        {/* CONTROL */}
        <Route path="/login" element={<Login />} />

        <Route
          path="/control"
          element={
            <ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN]}
              outlet={<ControlHome />}
            />
          }
        />

        <Route
          path="/control/events"
          element={
            <ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<ListEvent />}
            />
          }
        />
        <Route
          path="/control/events/create"
          element={
            <ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<CreateEvent />}
            />
          }
        />
        <Route
          path="/control/events/edit/:id"
          element={
            <ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<EditEvent />}
            />
          }
        />
        <Route
          path="/control/forms"
          element={
            <ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<ListForm />}
            />
          }
        />

        <Route
          path="/control/forms/edit/subscription"
          element={
            <ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<EditFormSubscription />}
            />
          }
        />
        <Route
          path="/control/forms/edit/contract"
          element={
            <ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<EditFormContract />}
            />
          }
        />

        <Route
          path="/control/supporters"
          element={
            <ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<ListSupporter />}
            />
          }
        />
        <Route
          path="/control/supporters/create"
          element={
            <ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<CreateSupporter />}
            />
          }
        />
        <Route
          path="/control/supporters/edit/:id"
          element={
            <ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<EditSupporter />}
            />
          }
        />

        <Route path="/control/members" element={<ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<ListMember />}
            />} />
            
        <Route path="/control/members/create" element={<ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<CreateMember />}
            />} />
        <Route path="/control/members/edit/:id" element={<ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<EditMember />}
            />} />

        <Route path="/control/audioBooks" element={<ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<ListAudioBook />}
            />} />
        <Route
          path="/control/audioBooks/create"
          element={<ProtectedRoute
            {...ProtectedRouteProps}
            roles={[ROLE.ADMIN, ROLE.EDITOR]}
            outlet={<CreateAudioBook />}
          />}
        />
        <Route
          path="/control/audioBooks/edit/:id"
          element={<ProtectedRoute
            {...ProtectedRouteProps}
            roles={[ROLE.ADMIN, ROLE.EDITOR]}
            outlet={<EditAudioBook />}
          />}
        />

        <Route path="/control/infos" element={<ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<ListInfo />}
            />} />
        <Route path="/control/infos/create" element={<ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<CreateInfo />}
            />} />
        <Route path="/control/infos/edit/:id" element={<ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<EditInfo />}
            />} />

        <Route path="/control/config/profile" element={<ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<Profile />}
            />} />

        <Route path="/control/galery" element={<ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<ListImage />}
            />} />
        <Route path="/control/galery/create" element={<ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN, ROLE.EDITOR]}
              outlet={<CreateImage />}
            />} />

        <Route path="/control/users" element={<ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN]}
              outlet={<ListUser />}
            />} />
        <Route path="/control/users/create" element={<ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN]}
              outlet={<CreateUser />}
            />} />
        <Route path="/control/users/edit/:id" element={<ProtectedRoute
              {...ProtectedRouteProps}
              roles={[ROLE.ADMIN]}
              outlet={<EditUser />}
            />} />
      </Routes>
    </div>
  );
}
