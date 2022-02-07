import { UsersPage } from "../pages/Users";
import { ReactComponent as HomeIcon } from "../assets/routes/home.svg";
import { ReactComponent as UsersIcon } from "../assets/routes/users.svg";
import { ReactComponent as StoreIcon } from "../assets/routes/store.svg";
import { ReactComponent as MailIcon } from "../assets/routes/mail.svg";
import { ReactComponent as AccountsIcon } from "../assets/routes/accounts.svg";
import { ReactComponent as TemplateIcon } from "../assets/routes/template.svg";
import { ReactComponent as AutoRegistrationIcon } from "../assets/routes/autoregistration.svg";
import { ReactComponent as SessionIcon } from "../assets/routes/session.svg";
import { ReactComponent as InfoIcon } from "../assets/routes/info.svg";
import {
  AUTH_PAGE,
  AUTOREGISTRATION_PAGE,
  HOME_PAGE,
  SESSIONS_PAGE,
  TEMPLATE_PAGE,
  USERS_PAGE,
} from "./consts";
import { AuthPage } from "../pages/AuthPage";
import { Autoregistration } from "../pages/AutoregistrationPage";
import { SessionsPage } from "../pages/SessionsPage";
import { TemplatePage } from "../pages/TemplatePage/TemplatePage";

export const routes = [
  {
    path: USERS_PAGE,
    component: UsersPage,
    name: "Users",
  },
  {
    path: TEMPLATE_PAGE,
    component: TemplatePage,
    name: "Шаблоны настроек",
  },

  {
    path: AUTOREGISTRATION_PAGE,
    component: Autoregistration,
    name: "Авторегистрация",
  },
  {
    path: SESSIONS_PAGE,
    component: SessionsPage,
    name: "Сессии",
  },
  {
    path: AUTH_PAGE,
    component: AuthPage,
    name: "Auth",
  },
];

export const navigationRoutes = [
  {
    path: USERS_PAGE,
    img: <UsersIcon />,
    name: "Users",
  },
  {
    path: TEMPLATE_PAGE,
    img: <TemplateIcon />,
    name: "Шаблоны настроек",
  },
  {
    path: AUTOREGISTRATION_PAGE,
    img: <AutoRegistrationIcon />,
    name: "Авторегистрация",
  },
  {
    path: SESSIONS_PAGE,
    img: <SessionIcon />,
    name: "Сессии",
  },
];
