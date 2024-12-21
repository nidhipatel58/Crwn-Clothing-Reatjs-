import { Routes, Route } from "react-router-dom";
import Home from "./routes/home.route";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import NotFound from "./routes/not-found/not-found.comopenent";

function App() {
  return (
    <Routes>
      {/* Main layout with navigation */}
      <Route path="/" element={<Navigation />}>
        {/* Home route */}
        <Route index element={<Home />} />
        {/* Shop routes with support for nested paths */}
        <Route path="shop/*" element={<Shop />} />
        {/* Authentication route */}
        <Route path="auth" element={<Authentication />} />
        {/* Checkout route */}
        <Route path="checkout" element={<Checkout />} />
        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
