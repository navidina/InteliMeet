
import React from 'react';
import { CheckIcon, XIcon, DashboardIcon } from '../Icons';
import { FileStatus } from '../../types';

interface StatCardProps {
    title: string;
    count: number;
    icon: React.ReactNode;
    color: string;
}

const StatDisplay: React.FC<StatCardProps> = ({ title, count, icon, color }) => (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between border-r-4" style={{ borderColor: color }}>
        <div>
            <p className="text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{count}</p>
        </div>
        <div className="w-12 h-12 flex items-center justify-center rounded-full" style={{ backgroundColor: `${color}20`, color }}>
            {icon}
        </div>
    </div>
);

interface StatCardsContainerProps {
    stats: {
        total: number;
        pending: number;
        processing: number;
        approved: number;
        rejected: number;
    };
}

const StatCard: React.FC<StatCardsContainerProps> = ({ stats }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatDisplay title="کل فایل ها" count={stats.total} icon={<DashboardIcon />} color="#60A5FA" />
        <StatDisplay title={FileStatus.Pending} count={stats.pending} icon={<svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>} color="#FBBF24" />
        <StatDisplay title={FileStatus.Processing} count={stats.processing} icon={<svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>} color="#3B82F6" />
        <StatDisplay title={FileStatus.Approved} count={stats.approved} icon={<CheckIcon />} color="#34D399" />
        <StatDisplay title={FileStatus.Rejected} count={stats.rejected} icon={<XIcon />} color="#F87171" />
    </div>
);


export default StatCard;
