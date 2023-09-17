import { Route } from "react-router-dom";
import { lazy } from "react";

const routes = [
  {
    path: "",
    element: lazy(() => import("pages/HomeTemplate")),
    nested: [
      {
        path: "about",
        element: lazy(() => import("pages/HomeTemplate/AboutPage")),
      },
      {
        path: "",
        element: lazy(() => import("pages/HomeTemplate/ListMoviePage")),
      },
      {
        path: "hooks",
        element: lazy(() => import("pages/HomeTemplate/HooksPage")),
      },
      {
        path: "detail/:id",
        element: lazy(() => import("pages/HomeTemplate/DetailMoviePage")),
      },
      {
        path: "phongve/:id",
        element: lazy(() => import("pages/HomeTemplate/PhongVe")),
      }
    ],
  },
  {
    path: "admin",
    element: lazy(() => import("./../pages/AdminTemplate")),
    nested: [
      {
        path: "dashboard",
        element: lazy(() => import("./../pages/AdminTemplate/Dashboard")),
      },
      {
        path: "add-user",
        element: lazy(() => import("../pages/AdminTemplate/Dashboard/AddUser")),
      },
      {
        path: "edit-user/:id",
        element: lazy(() => import("../pages/AdminTemplate/Dashboard/EditUser")),
      },
      {
        path: "film",
        element: lazy(() => import("../pages/AdminTemplate/Film")),
      },
      {
        path: "add-film",
        element: lazy(() => import("../pages/AdminTemplate/Film/AddFilm")),
      },
      {
        path: "edit-film/:id",
        element: lazy(() => import("../pages/AdminTemplate/Film/EditFilm")),
      },
      {
        path: "/admin/show-time/:id/:name",
        element: lazy(() => import("../pages/AdminTemplate/Film/Showtime")),
      }
    ],
  },
  {
    path: "auth",
    element: lazy(() => import("./../pages/AdminTemplate/LoginPage")),
  },
  {
    path: "register",
    element: lazy(() => import("../pages/AdminTemplate/RegisterPage")),
  }
];

const renderRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.nested.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};

export default renderRoutes;
