import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductCatalog from './pages/ProductCatalog';
import AdminDashboard from './pages/AdminDashboard';
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

export default function App(){
    return(
        <AuthProvider>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<ProductCatalog/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/admin" element={
                        <ProtectedRoute adminOnly>
                            <AdminDashboard/>
                        </ProtectedRoute>
                    }/>
                    <Route path="*" element={<div className="p-10 text-center text-2xl">404</div>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
