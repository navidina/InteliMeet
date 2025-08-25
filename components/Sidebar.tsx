import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoIcon, DashboardIcon, UploadIcon, DictionaryIcon } from './Icons';

const Sidebar: React.FC = () => {

    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        const baseClass = "flex items-center gap-x-3 px-4 py-2.5 rounded-lg transition-colors duration-200 text-base font-medium";
        return isActive 
            ? `${baseClass} bg-sky-500 text-white shadow` 
            : `${baseClass} text-slate-600 hover:bg-sky-100/60 hover:text-sky-700`;
    };

    return (
        <aside className="w-64 bg-white shadow-md flex-shrink-0 flex-col hidden md:flex">
            <div className="p-6 flex items-center gap-3 border-b border-slate-200">
                <LogoIcon className="w-10 h-10" />
                <h1 className="text-lg font-bold text-slate-800">دستیار هوشمند</h1>
            </div>
            <nav className="flex-grow p-4">
                <ul className="space-y-2">
                    <li>
                        <NavLink to="/dashboard" className={getNavLinkClass}>
                            <DashboardIcon className="w-5 h-5" />
                            <span>داشبورد</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/upload" className={getNavLinkClass}>
                            <UploadIcon className="w-5 h-5" />
                            <span>بارگذاری فایل</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dictionary" className={getNavLinkClass}>
                            <DictionaryIcon className="w-5 h-5" />
                            <span>دیکشنری</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="p-4 border-t border-slate-200">
                 <p className="text-xs text-center text-slate-400">&copy; 2025 All Rights Reserved</p>
            </div>
        </aside>
    );
};

export default Sidebar;
