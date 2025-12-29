import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./components/Landing";
import PreAuth from "./pages/PreAuth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ArtistLogin from "./pages/ArtistLogin";
import ArtistSignup from "./pages/ArtistSignup";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Search from "./pages/Search";
import ArtistProfile from "./pages/ArtistProfile";
import PreBooking from "./pages/PreBooking";
import ArtistDashboard from "./pages/artist/Dashboard";
import ArtistPortfolio from "./pages/artist/Portfolio";
import ArtistSlots from "./pages/artist/Slots";
import ArtistWallet from "./pages/artist/Wallet";
import Settings from "./pages/Settings";
import Addresses from "./pages/Addresses";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Coupons from "./pages/Coupons";
import Support from "./pages/Support";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import RecentlyViewed from "./pages/RecentlyViewed";
import { useAuthStore } from "./store/authStore";

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

function App() {
  const { token, role } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            token 
              ? (role === 'artist' ? <Navigate to="/artist/dashboard" replace /> : <Navigate to="/home" replace />)
              : <Landing />
          } 
        />
        <Route path="/preauth" element={<PreAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/artist/login" element={<ArtistLogin />} />
        <Route path="/artist/signup" element={<ArtistSignup />} />
        
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Home />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Shop />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Account />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Orders />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <OrderDetails />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Cart />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Wishlist />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Search />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/artist/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ArtistProfile />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/booking/:artistId"
          element={
            <ProtectedRoute>
              <AppLayout>
                <PreBooking />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/artist/dashboard"
          element={
            <ProtectedRoute requireRole="artist">
              <AppLayout>
                <ArtistDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/artist/portfolio"
          element={
            <ProtectedRoute requireRole="artist">
              <AppLayout>
                <ArtistPortfolio />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/artist/slots"
          element={
            <ProtectedRoute requireRole="artist">
              <AppLayout>
                <ArtistSlots />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/artist/wallet"
          element={
            <ProtectedRoute requireRole="artist">
              <AppLayout>
                <ArtistWallet />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/account/settings"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Settings />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/account/addresses"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Addresses />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/account/edit"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Profile />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Notifications />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/coupons"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Coupons />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Support />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AppLayout>
                <About />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/terms"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Terms />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/privacy"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Privacy />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/recently-viewed"
          element={
            <ProtectedRoute>
              <AppLayout>
                <RecentlyViewed />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route 
          path="*" 
          element={
            <Navigate 
              to={token ? (role === 'artist' ? "/artist/dashboard" : "/home") : "/"} 
              replace 
            />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
