import logo from './logo.svg';
import './styles/main.scss';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import Explore_puja from './pages/Explore_puja';
import Individual from './pages/Individual';
import Cart from './pages/Cart';
import Champaign from './pages/Champaign';
import Checkout from './pages/Checkout';
import AboutUs from './pages/AboutUs';
import MyFamily from './pages/MyFamily';
import KartaDeatils from './pages/KartaDeatils';
import AncestorDetails from './pages/AncestorDetails';
import KartaAncestorDetails from './pages/KartaAncestorDetails';
import Address from './pages/Address';
import BookedSeva from './pages/BookedSeva';
import { CartProvider } from './pages/CartContext';
import DirectCheckout from './pages/DirectCheckout';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
import BookingCancelled from "./pages/BookingCancelled"
import BookingSuccessful from "./pages/BookingSuccessful"
import PaymentFailed from "./pages/PaymentFailed"
import { useState } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { PrimeReactProvider } from 'primereact/api';
function App() {
  const [triggerRefresh1, setTriggerRefresh] = useState(0)

  return (
    <>
    <PrimeReactProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home triggerRefresh1={triggerRefresh1} setTriggerRefresh={setTriggerRefresh} />} />
          <Route path="/home" element={<Home triggerRefresh1={triggerRefresh1} setTriggerRefresh={setTriggerRefresh} />} />
          <Route path="/bookedseva" element={<BookedSeva />} />
          <Route path="/explore_puja" element={<Explore_puja />} />
          <Route path="/user" element={<ProtectedRoute />}>
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/myfamily" element={<MyFamily />} />
            <Route path="/user/kartadeatils" element={<KartaDeatils />} />
            <Route path="/user/ancestordeatils" element={<AncestorDetails />} />
            <Route path="/user/kartaancestordeatils" element={<KartaAncestorDetails />} />
            <Route path="/user/address" element={<Address />} />
          </Route>
          <Route path="/individual" element={<Individual />} />
          <Route path="/seva/:productId" element={<Individual setTriggerRefresh={setTriggerRefresh} />} />
          <Route path="/cart" element={<Cart triggerRefresh1={triggerRefresh1} setTriggerRefresh={setTriggerRefresh} />} />
          {/* <Route path="/champaign" element={<Champaign />} /> */}
          <Route path="/sevas/:productId" element={<Champaign triggerRefresh1={triggerRefresh1} setTriggerRefresh={setTriggerRefresh} />} />
          <Route path="/checkout" element={<Checkout triggerRefresh1={triggerRefresh1} setTriggerRefresh={setTriggerRefresh} />} />
          <Route path="/checkout/:productId" element={<DirectCheckout triggerRefresh1={triggerRefresh1} setTriggerRefresh={setTriggerRefresh} />} />
          <Route path="/checkout/:productId/seva/:sevaPriceID" element={<DirectCheckout triggerRefresh1={triggerRefresh1} setTriggerRefresh={setTriggerRefresh} />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/Refund" element={<Refund />} />
          <Route path="/payment/:bookingid/Aborted" element={<BookingCancelled />} />
          <Route path="/payment/:bookingid/Failure" element={<PaymentFailed />} />
          <Route path="/payment/:bookingid/Success" element={<BookingSuccessful />} />
        </Routes>
      </CartProvider>
      </PrimeReactProvider>
    </>
  );
}

export default App;
