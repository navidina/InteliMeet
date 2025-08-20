import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import { DashboardIcon, UploadIcon, DictionaryIcon, UserIcon, LogoutIcon, LogoIcon, ChevronDownIcon, XIcon } from './Icons';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const handleLogout = () => {
        logout(() => navigate('/login'));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinkClass = "flex items-center gap-x-2 px-4 py-2 rounded-lg transition-colors duration-200";
    const activeNavLinkClass = "bg-teal-500 text-white shadow-md";
    const inactiveNavLinkClass = "text-gray-600 hover:bg-teal-50";

    const getNavLinkClass = (path: string) => {
        return location.pathname.startsWith(path) ? `${navLinkClass} ${activeNavLinkClass}` : `${navLinkClass} ${inactiveNavLinkClass}`;
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Right Side - Logo and Title */}
                    <div className="flex items-center gap-x-4">
                        <LogoIcon className="h-10 w-10" />
                        <h1 className="text-xl font-bold text-gray-800">دستیار مستندساز هوشمند</h1>
                    </div>

                    {/* Middle - Navigation */}
                    <nav className="hidden md:flex items-center gap-x-2 bg-gray-100 p-1 rounded-xl">
                        <NavLink to="/dashboard" className={getNavLinkClass("/dashboard")}>
                            <DashboardIcon className="w-5 h-5" />
                            <span>داشبورد</span>
                        </NavLink>
                        <NavLink to="/upload" className={getNavLinkClass("/upload")}>
                            <UploadIcon className="w-5 h-5" />
                            <span>بارگذاری فایل</span>
                        </NavLink>
                        <NavLink to="/dictionary" className={getNavLinkClass("/dictionary")}>
                            <DictionaryIcon className="w-5 h-5" />
                            <span>دیکشنری عبارات</span>
                        </NavLink>
                    </nav>

                    {/* Left Side - Profile and Logout */}
                    <div className="flex items-center gap-x-4">
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-x-2 text-gray-600 hover:text-teal-600 transition"
                            >
                                <UserIcon className="w-6 h-6" />
                                <span className="hidden sm:inline">پروفایل کاربر</span>
                                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isProfileOpen && user && (
                                <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4 animate-fade-in-down">
                                    <div className="flex items-center gap-x-3 pb-3 border-b">
                                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                                            <UserIcon className="w-7 h-7 text-teal-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-700 mt-3 space-y-2">
                                        <p><strong>کد پرسنلی:</strong> {user.employeeId}</p>
                                        <p><strong>دپارتمان:</strong> {user.department}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <button
                            onClick={() => setLogoutModalOpen(true)}
                            className="flex items-center gap-x-2 text-red-500 hover:text-red-700 transition"
                        >
                            <LogoutIcon className="w-6 h-6" />
                            <span className="hidden sm:inline">خروج</span>
                        </button>
                    </div>
                </div>
            </div>
            {isLogoutModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
                         <div className="flex justify-end">
                            <button onClick={() => setLogoutModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LogoutIcon className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">خروج از سامانه</h3>
                        <p className="text-gray-600 mb-6">آیا مایل به خروج از حساب کاربری خود هستید؟</p>
                        <div className="flex justify-center gap-x-4">
                            <button
                                onClick={() => setLogoutModalOpen(false)}
                                className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                            >
                                خیر
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                            >
                                بله
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main>
                <Outlet />
            </main>
             <footer className="text-center py-4 text-gray-500 text-sm border-t mt-8">
                <p>2025 کلیه حقوق محفوظ است | نسخه v1.0.0</p>
            </footer>
        </div>
    );
};

export default MainLayout;