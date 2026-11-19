import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import GetIdeasModal from './components/GetIdeasModal';
import MapMyIdeaModal from './components/MapMyIdeaModal';
import BrandLogoModal from './components/BrandLogoModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import RoadmapPage from './pages/RoadmapPage';
import AdminPage from './pages/AdminPage';
import BrandLogoPage from './pages/BrandLogoPage';

function MainLayout() {
  const { activePage } = useAuth();

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        {activePage === 'home' && <HomePage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'profile' && <ProfilePage />}
        {activePage === 'roadmap' && <RoadmapPage />}
        {activePage === 'admin' && <AdminPage />}
        {activePage === 'logo' && <BrandLogoPage />}
      </main>
      <Footer />
      <AuthModal />
      <GetIdeasModal />
      <MapMyIdeaModal />
      <BrandLogoModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
