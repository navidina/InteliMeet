import React from 'react';
import { CheckIcon, XIcon, DashboardIcon, ClockIcon, ProcessingIcon } from '../Icons';
import { FileStatus } from '../../types';

interface IndividualStatCardProps {
    title: string;
    count: number;
    icon: React.ReactElement<{ className?: string }>;
    color: 'blue' | 'yellow' | 'cyan' | 'green' | 'red';
}

const COLORS = {
    cyan: { light: 'from-cyan-50 to-teal-100', main: 'text-cyan-700', iconBg: 'bg-cyan-100' },
    yellow: { light: 'from-yellow-50 to-amber-100', main: 'text-amber-700', iconBg: 'bg-amber-100' },
    blue: { light: 'from-blue-50 to-indigo-100', main: 'text-blue-700', iconBg: 'bg-blue-100' },
    green: { light: 'from-green-50 to-emerald-100', main: 'text-green-700', iconBg: 'bg-green-100' },
    red: { light: 'from-red-50 to-rose-100', main: 'text-red-700', iconBg: 'bg-red-100' },
};

const IndividualStatCard: React.FC<IndividualStatCardProps> = ({ title, count, icon, color }) => {
    const theme = COLORS[color];
    const coloredIcon = React.cloneElement(icon, { className: `w-7 h-7 ${theme.main}` });

    return (
        <div className={`p-4 rounded-2xl shadow-sm bg-gradient-to-br ${theme.light}`}>
            <div className="flex items-center gap-4">
                 <div className={`p-3 rounded-full ${theme.iconBg}`}>
                    {coloredIcon}
                </div>
                <p className="font-semibold text-gray-700 text-base">{title}</p>
            </div>
            <div className="mt-4 flex items-end justify-between">
                <p className="text-4xl font-bold text-gray-800">{count}</p>
                <a href="#" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition whitespace-nowrap">
                    مشاهده جزئیات &gt;
                </a>
            </div>
        </div>
    );
};


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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <IndividualStatCard title="کل فایل ها" count={stats.total} icon={<DashboardIcon />} color="cyan" />
        <IndividualStatCard title={FileStatus.Pending} count={stats.pending} icon={<ClockIcon />} color="yellow" />
        <IndividualStatCard title={FileStatus.Processing} count={stats.processing} icon={<ProcessingIcon />} color="blue" />
        <IndividualStatCard title={FileStatus.Approved} count={stats.approved} icon={<CheckIcon />} color="green" />
        <IndividualStatCard title={FileStatus.Rejected} count={stats.rejected} icon={<XIcon />} color="red" />
    </div>
);

export default StatCard;