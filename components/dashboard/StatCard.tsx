import React from 'react';
import { toPersianDigits } from '../../constants';
import { UsersIcon, ClockIcon, ProcessingIcon, CheckIcon } from '../Icons';
import { FileStatus } from '../../types';

interface StatCardProps {
    title: string;
    count: number;
    colorTheme: 'orange' | 'yellow' | 'blue' | 'green';
    status: FileStatus | 'all';
    onFilterClick: (status: FileStatus | 'all') => void;
    isActive: boolean;
}

const THEMES = {
    orange: { bg: 'bg-orange-100/60', text: 'text-orange-600', icon: <UsersIcon /> },
    yellow: { bg: 'bg-yellow-100/60', text: 'text-yellow-600', icon: <ClockIcon /> },
    blue: { bg: 'bg-sky-100/60', text: 'text-sky-600', icon: <ProcessingIcon /> },
    green: { bg: 'bg-green-100/60', text: 'text-green-600', icon: <CheckIcon /> },
};

const StatCard: React.FC<StatCardProps> = ({ title, count, colorTheme, status, onFilterClick, isActive }) => {
    const theme = THEMES[colorTheme];
    const icon = React.cloneElement(theme.icon, { className: `w-6 h-6 ${theme.text}` });

    return (
        <div
            className={`p-5 rounded-2xl shadow-sm transition-all duration-200 cursor-pointer ${theme.bg} ${isActive ? 'ring-2 ring-offset-2 ring-sky-500' : ''}`}
            onClick={() => onFilterClick(status)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onFilterClick(status)}
        >
            <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-lg ${theme.bg}`}>
                    {icon}
                </div>
                <p className="font-semibold text-slate-700 text-base">{title}</p>
            </div>
            <div className="mt-4 flex items-end justify-between">
                <p className={`text-4xl font-bold ${theme.text}`}>{toPersianDigits(count)}</p>
                <span className="text-sm font-medium text-slate-500 hover:text-slate-900 transition whitespace-nowrap">
                    مشاهده جزئیات &gt;
                </span>
            </div>
        </div>
    );
};

export default StatCard;