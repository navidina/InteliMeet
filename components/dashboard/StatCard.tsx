
import React from 'react';
import { CheckIcon, XIcon, DashboardIcon, ClockIcon, ProcessingIcon } from '../Icons';
import { FileStatus } from '../../types';
import { toPersianDigits } from '../../constants';

interface IndividualStatCardProps {
    title: string;
    count: number;
    icon: React.ReactElement<{ className?: string }>;
    color: 'orange' | 'yellow' | 'blue' | 'green' | 'red';
    status: string;
    onFilterChange: (status: string) => void;
}

const COLORS = {
    orange: { light: 'bg-orange-50', main: 'text-orange-600', iconBg: 'bg-orange-100' },
    yellow: { light: 'bg-yellow-50', main: 'text-yellow-600', iconBg: 'bg-yellow-100' },
    blue: { light: 'bg-blue-50', main: 'text-blue-600', iconBg: 'bg-blue-100' },
    green: { light: 'bg-gradient-to-br from-green-50 to-white', main: 'text-green-600', iconBg: 'bg-green-100' },
    red: { light: 'bg-red-50', main: 'text-red-600', iconBg: 'bg-red-100' },
};

const IndividualStatCard: React.FC<IndividualStatCardProps> = ({ title, count, icon, color, status, onFilterChange }) => {
    const theme = COLORS[color];
    const coloredIcon = React.cloneElement(icon, { className: `w-7 h-7 ${theme.main}` });

    return (
        <div className={`p-4 rounded-2xl shadow-sm ${theme.light} border border-gray-100/50`}>
            <div className="flex items-center gap-4">
                 <div className={`p-3 rounded-xl ${theme.iconBg}`}>
                    {coloredIcon}
                </div>
                <p className="font-semibold text-gray-700 text-base">{title}</p>
            </div>
            <div className="mt-4 flex items-end justify-between">
                <p className="text-4xl font-bold text-gray-800">{toPersianDigits(count)}</p>
                <button onClick={() => onFilterChange(status)} className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition whitespace-nowrap">
                    مشاهده جزئیات &gt;
                </button>
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
    onFilterChange: (status: string) => void;
}

const StatCard: React.FC<StatCardsContainerProps> = ({ stats, onFilterChange }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <IndividualStatCard title="کل فایل ها" count={stats.total} icon={<DashboardIcon />} color="orange" status="" onFilterChange={onFilterChange} />
        <IndividualStatCard title={FileStatus.Pending} count={stats.pending} icon={<ClockIcon />} color="yellow" status={FileStatus.Pending} onFilterChange={onFilterChange} />
        <IndividualStatCard title={FileStatus.Processing} count={stats.processing} icon={<ProcessingIcon />} color="blue" status={FileStatus.Processing} onFilterChange={onFilterChange} />
        <IndividualStatCard title={FileStatus.Approved} count={stats.approved} icon={<CheckIcon />} color="green" status={FileStatus.Approved} onFilterChange={onFilterChange} />
        <IndividualStatCard title={FileStatus.Rejected} count={stats.rejected} icon={<XIcon />} color="red" status={FileStatus.Rejected} onFilterChange={onFilterChange} />
    </div>
);

export default StatCard;