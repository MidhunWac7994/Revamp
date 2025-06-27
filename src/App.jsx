import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
  Outlet,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./components/Header/Header";
import ListingPage from "./Pages/ProductList/ProductList";
import UrlResolver from "./url/UrlResolver";
import CategoryLandingPage from './Pages/CategoryLanding/CategoryLandingPage'; 
import Footer from "./Pages/Footer/Footer";
import { Toaster } from "sonner";
import Cart from "./Pages/CartPage/Cart";
import InitialCart from "./components/InitialCart/InitialCart";
import Checkout from "./Pages/CheckoutPage/Checkout";
import { AuthProvider } from  "./Pages/Auth/useAuth";

const Main = () => {
  const { locale } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />
      <Outlet />
    </div>
  );
};
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <InitialCart />
        <Toaster position="bottom-center" richColors />
        <Routes>
          <Route path="/" element={<Navigate to="/en" />} />
          <Route path="/:locale" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="category-landing" element={<CategoryLandingPage />} />
            <Route path="cart" element={<Cart />} />{" "}
            <Route path="checkout" element={<Checkout />} />{" "}
            <Route
              path="*"
              element={
                <>
                  {console.log("UrlResolver route matched")}
                  <UrlResolver />
                </>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
      <Footer />
    </Router>
  );
};

export default App;