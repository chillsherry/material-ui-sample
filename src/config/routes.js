import React from "react";

const Home = React.lazy(() => import("../views/Home"));
const About = React.lazy(() => import("../views/About"));
const ShowCase = React.lazy(() => import("../views/ShowCase"));
const Case1 = React.lazy(() => import("../views/Case1"));
const Case2 = React.lazy(() => import("../views/Case2"));
const Contact = React.lazy(() => import("../views/Contact"));

const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/about", exact: true, name: "About", component: About },
  {
    path: "/showcase", exact: true, name: "ShowCase", component: ShowCase,
    child: [
      { path: "/showcase/case1", exact: true, name: "Case1", component: Case1 },
      { path: "/showcase/case2", exact: true, name: "Case2", component: Case2 },
    ]
  },
  { path: "/contact", exact: true, name: "Contact", component: Contact }
];

export default routes;