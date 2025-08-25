import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useClickOutside } from '../hooks/useClickOutside';
import { UserIcon, LogoutIcon, ChevronDownIcon, BellIcon } from './Icons';
import LogoutModal from './LogoutModal';

const ProfileDropdown: React.FC<{ onLogoutClick: () => void }> = ({ onLogoutClick }) => (
    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 p-2 animate-fade-in-down z-50">
        <button
            onClick={onLogoutClick}
            className="w-full flex items-center gap-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
            <LogoutIcon className="w-5 h-5" />
            <span>خروج از سیستم</span>
        </button>
    </div>
);


const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    
    const profileRef = useRef<HTMLDivElement>(null);
    useClickOutside(profileRef, () => setProfileOpen(false));

    const handleLogout = () => {
        logout(() => navigate('/login'));
    };

    return (
        <>
            <header className="bg-slate-100 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div>
                        <h1 className="text-xl font-semibold text-slate-600">به دستیار هوشمند خوش آمدید</h1>
                    </div>
                    
                    <div className="flex items-center gap-x-4">
                        <button className="text-slate-500 hover:text-sky-600 p-2 rounded-full hover:bg-slate-200 transition-colors">
                            <BellIcon className="w-6 h-6" />
                        </button>

                        <div className="w-px h-6 bg-slate-300"></div>

                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-x-2 text-slate-600 hover:text-sky-600 transition"
                            >
                                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                                    <UserIcon className="w-6 h-6 text-sky-600" />
                                </div>
                                <div className="hidden sm:flex flex-col items-start">
                                    <span className="font-semibold text-sm">{user?.name}</span>
                                    <span className="text-xs text-slate-500">{user?.role}</span>
                                </div>
                                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isProfileOpen && <ProfileDropdown onLogoutClick={() => setLogoutModalOpen(true)} />}
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