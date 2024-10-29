import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sidebar from './component/Sidebar';
import Topbar from './component/Topbar';
import Contact from './pages/Contact';
import Landing from './pages/Landing';
import Host from './pages/Host';
import DataDisplay from './pages/Events';
import EventDetails from './pages/UniEvent';
import RedirectPage from './pages/Redirect';

function AppLayout({ children }) {
  const location = useLocation();

  // Conditionally hide Sidebar and Topbar for /login and /register routes
  const hideLayoutForRoutes = ['/login', '/register', '/', '/*'];
  const isLoginOrRegisterPage = hideLayoutForRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-row">
      {!isLoginOrRegisterPage && <Sidebar />}{' '}
      <div
        className={
          isLoginOrRegisterPage
            ? 'w-full flex justify-center items-center bg-concert bg-cover'
            : 'w:fit lg:w-4/5'
        }
      >
        {!isLoginOrRegisterPage && <Topbar />}{' '}
        {/* Render Topbar unless it's /login or /register */}
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/hosting" element={<Host />} />
          <Route path="/login" element={<Login />} />{' '}
          {/* No Sidebar/Topbar here */}
          <Route path="/register" element={<Register />} />{' '}
          {/* No Sidebar/Topbar here */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hosting" element={<Host />} />
          <Route path="/events" element={<DataDisplay />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route
            path="*"
            element={
              <div className="w-full h-full bg-[#232323] text-text flex flex-col justify-center items-center">
                <h1>
                  Looks like you went astray,{' '}
                  <a href="/home" className="text-accent">
                    click here to go back.
                  </a>
                </h1>
              </div>
            }
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
