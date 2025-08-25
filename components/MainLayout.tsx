import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-slate-100 text-slate-800">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-grow p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;