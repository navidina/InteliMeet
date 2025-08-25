
import React, { useState, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useClickOutside } from '../hooks/useClickOutside';
import { DashboardIcon, UploadIcon, DictionaryIcon, UserIcon, LogoutIcon, LogoIcon, ChevronDownIcon } from './Icons';
import LogoutModal from './LogoutModal';
import { toPersianDigits } from '../constants';

const ProfileDropdown: React.FC<{ user: NonNullable<ReturnType<typeof useAuth>['user']> }> = ({ user }) => (
    <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4 animate-fade-in-down z-50">
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
            <p><strong>کد پرسنلی:</strong> {toPersianDigits(user.employeeId)}</p>
            <p><strong>دپارتمان:</strong> {user.department}</p>
        </div>
    </div>
);

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    
    const profileRef = useRef<HTMLDivElement>(null);
    useClickOutside(profileRef, () => setProfileOpen(false));

    const handleLogout = () => {
        logout(() => navigate('/login'));
    };

    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        const baseClass = "flex items-center gap-x-2 px-4 py-2 rounded-lg transition-colors duration-200";
        return isActive 
            ? `${baseClass} bg-teal-500 text-white shadow-md` 
            : `${baseClass} text-gray-600 hover:bg-teal-50`;
    };

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-x-4">
                            <LogoIcon className="h-10 w-10" />
                            <h1 className="text-xl font-bold text-gray-800">دستیار مستندساز هوشمند</h1>
                        </div>

                        <nav className="hidden md:flex items-center gap-x-2 bg-gray-100 p-1 rounded-xl">
                            <NavLink to="/dashboard" className={getNavLinkClass}>
                                <DashboardIcon className="w-5 h-5" />
                                <span>داشبورد</span>
                            </NavLink>
                            <NavLink to="/upload" className={getNavLinkClass}>
                                <UploadIcon className="w-5 h-5" />
                                <span>بارگذاری فایل</span>
                            </NavLink>
                            <NavLink to="/dictionary" className={getNavLinkClass}>
                                <DictionaryIcon className="w-5 h-5" />
                                <span>دیکشنری عبارات</span>
                            </NavLink>
                        </nav>

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
                                {isProfileOpen && user && <ProfileDropdown user={user} />}
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
            </header>
            {isLogoutModalOpen && (
                <LogoutModal 
                    onClose={() => setLogoutModalOpen(false)} 
                    onConfirm={handleLogout} 
                />
            )}
        </>
    );
};

export default Header;