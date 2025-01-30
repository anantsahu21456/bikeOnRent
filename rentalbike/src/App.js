import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import SignUp from './components/Signup.jsx';
import SignIn from './components/Signin.jsx';
import Forgetpassword from './components/Forgetpassword.jsx';
import Herosection from './components/Herosection.jsx';
import Searchbar from './components/Searchbar.jsx';
import Bikesection from './components/Bikesection.jsx';
import Addbikes from './components/Addbikes.jsx';
import BikeFormData from './components/BikeFormData.jsx';
import BikeDetails from './components/BikeDetails.jsx';
import { ToastContainer } from 'react-toastify';
import ResetPassword from './components/ResetPassword.jsx';
import Footer from './components/Footer.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import TermsAndConditions from './components/TermsAndConditions.jsx';
// import AvailableBike from './components/AvailableBike.jsx';
// import GoToTop from './components/GoToTop.jsx';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  // Get the current route location
  const location = useLocation();

  return (
    <div>
      <Navbar />
      {/* Render Herosection, Searchbar, and Bikesection ONLY on home page */}
      {location.pathname === '/home' && (
        <>
          <Herosection />
          <Searchbar />
          <Bikesection />
        </>
      )}
      <Routes>
        {/* Redirect from `/` to `/home` */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addbikes" element={<Addbikes />} />
        <Route path="/addbikes/bikeformdata" element={<BikeFormData />} />
        <Route path="/bike/:id" element={<BikeDetails/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signin/forgetpassword" element={<Forgetpassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> 
        <Route path="/terms&condition" element={<TermsAndConditions/>} /> 
        <Route path="/bike-details/:id" element={<BikeDetails />} /> 
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
      <Footer/>
      
     
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
