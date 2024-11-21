import { createContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./homepage.jsx";
import ErrorPage from "./error-page.jsx";
import ItemDetails from "./item-details.jsx";
import AddItem from "./add-item.jsx";
import { Login } from "./login.jsx";
import { SignUp } from "./sign-up.jsx";
import MyCart from "./my-cart.jsx";
import Item from "./item.jsx";
import AddItemFormik from "./add-item-formik.jsx";
import MyAccount from "./my-account.jsx";
import AboutPage from "./about-page.jsx";
import { AdminPage } from "./admin.jsx";
import { Categories } from "./categories.jsx";
import { Static } from "./static.jsx";

export const AuthContext = createContext(null);
export const ItemContext = createContext(null);

export function App() {
  const [user, setUser] = useState(null);
  const [detailedItem, setDetailedItem] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <AdminPage title="Give-Away! - Admin" />,
    },
    {
      path: "/",
      element: <Homepage title="Give-Away! - Discover hot Deals For Free!" />,
      errorElement: <ErrorPage title="Give-Away! - Error!" />,
    },

    {
      path: "/item-details/:id",
      element: (
        <ItemDetails
          title="Give-Away! - Item Details"
          setDetailedItem={setDetailedItem}
        />
      ),
      errorElement: <ErrorPage title="Give-Away! - Error!" />,
    },

    {
      path: "/about-us",
      element: <AboutPage title="Give-Away! - About Us" />,
      errorElement: <ErrorPage title="Give-Away! - Error!" />,
    },

    {
      path: "/add-item",
      element: <AddItem title="Give-Away! - Add Item" />,
      errorElement: <ErrorPage title="Give-Away! - Error!" />,
    },

    {
      path: "/add-item-formik",
      element: <AddItemFormik title="Give-Away! - Add Item" />,
      errorElement: <ErrorPage title="Give-Away! - Error!" />,
    },

    {
      path: "auth/login",
      element: <Login title="Give-Away! - Login" setUser={setUser} />,
      errorElement: <ErrorPage title="Give-Away! - Error!" />,
    },

    {
      path: "/sign-up",
      element: <SignUp title="Give-Away! - Sign-up" />,
      errorElement: <ErrorPage title="Give-Away! - Error!" />,
    },

    {
      path: "/my-cart",
      element: <MyCart title="Give-Away! - My Cart" />,
      errorElement: <ErrorPage title="Give-Away! - Error!" />,
    },

    {
      path: "/my-account",
      element: <MyAccount title="Give-Away! - My Account" />,
      errorElement: <ErrorPage title="Give-Away! - Error!" />,
    },

    {
      path: "/admin/categories",
      element: <Categories title="Give-Away! - Admin - Categories" />,
      errorElement: <ErrorPage title="Give-Away! - Error!" />,
    },
    {
      path: "/static",
      element: <Static />,
      errorElement: <ErrorPage title="static - Error!" />,
    },
  ]);

  return (
    <>
      <AuthContext.Provider value={user}>
        <ItemContext.Provider value={detailedItem}>
          <RouterProvider router={router} />
        </ItemContext.Provider>
      </AuthContext.Provider>
    </>
  );
}
