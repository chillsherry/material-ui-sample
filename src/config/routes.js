import React from "react";

const Home = React.lazy(() => import("../views/Home"));
const About = React.lazy(() => import("../views/About"));
const ShowCase = React.lazy(() => import("../views/ShowCase"));
const Case1 = React.lazy(() => import("../views/Case1"));
const Case2 = React.lazy(() => import("../views/Case2"));
const Contact = React.lazy(() => import("../views/Contact"));
const Login = React.lazy(() => import("../views/Login"));
const Logout = React.lazy(() => import("../views/Logout"));


const routes = [
  { path: "/", exact: true, name: "Home", component: Home, display: true },
  { path: "/about", exact: true, name: "About", component: About, display: true },
  {
    path: "/showcase", exact: true, name: "ShowCase", component: ShowCase, display: true,
    child: [
      { path: "/showcase/case1", exact: true, name: "Case1", component: Case1, display: true  },
      { path: "/showcase/case2", exact: true, name: "Case2", component: Case2, display: true  },
    ]
  },
  { path: "/contact", exact: true, name: "Contact", component: Contact, display: true  },
  { path: "/login", exact: true, name: "Login", component: Login, display: false },
  { path: "/logout", exact: true, name: "Logout", component: Logout, display: true },
];

export default routes;