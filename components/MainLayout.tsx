
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { toPersianDigits } from '../constants';

const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
             <footer className="text-center py-4 text-gray-500 text-sm border-t mt-8">
                <p>{toPersianDigits('2025')} کلیه حقوق محفوظ است | نسخه v{toPersianDigits('1.0.0')}</p>
            </footer>
        </div>
    );
};

export default MainLayout;