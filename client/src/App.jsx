import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const ProductCatalog = lazy(() => import('./pages/ProductCatalog'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const SubcategoryPage = lazy(() => import('./pages/SubcategoryPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductCatalog />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute adminOnly>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/products/:category/:subcat" element={<SubcategoryPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/terms" element={<TermsOfUse />} />
                        <Route
                            path="*"
                            element={<div className="p-10 text-center text-2xl">404</div>}
                        />
                    </Routes>
                </Suspense>
                <ToastContainer position="top-right" autoClose={2000} />
            </AuthProvider>
        </Router>
    );
}
