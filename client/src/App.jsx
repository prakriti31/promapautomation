import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import ProductCatalog from './pages/ProductCatalog';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import SubcategoryPage from "./pages/SubcategoryPage";
import CartPage from "./pages/CartPage";
import TermsOfUse from './pages/TermsOfUse';

export default function App() {
    return (
        <AuthProvider>
            <Navbar />
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
                <Route
                    path="*"
                    element={<div className="p-10 text-center text-2xl">404</div>}
                />

                {/* existing routes */}
                <Route path="/products/:category/:subcat" element={<SubcategoryPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/terms" element={<TermsOfUse />} />

            </Routes>
        </AuthProvider>
    );
}