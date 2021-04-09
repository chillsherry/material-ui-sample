import React from "react";

const Home = React.lazy(() => import("../views/Home"));
const About = React.lazy(() => import("../views/About"));
const ShowCase = React.lazy(() => import("../views/ShowCase"));
const Contact = React.lazy(() => import("../views/Contact"));

const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/about", exact: true, name: "About", component: About },
  { path: "/showcase", exact: true, name: "ShowCase", component: ShowCase },
  { path: "/contact", exact: true, name: "Contact", component: Contact }
];

export default routes;