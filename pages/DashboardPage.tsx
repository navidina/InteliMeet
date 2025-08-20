
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileStatus, FileData } from '../types';
import { STATUS_STYLES } from '../constants';
import { useFiles } from '../contexts/FileContext';
import { SearchIcon, ChevronDownIcon, EyeIcon, DownloadIcon } from '../components/Icons';
import StatCard from '../components/dashboard/StatCard';
import FileDetailsModal from '../components/dashboard/FileDetailsModal';

const FilterDropdown: React.FC<{
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    defaultLabel: string;
}> = ({ value, onChange, options, defaultLabel }) => (
    <div className="relative">
        <select 
            className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-teal-500"
            value={value}
            onChange={onChange}
        >
            <option value="">{defaultLabel}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
            <ChevronDownIcon className="w-4 h-4" />
        </div>
    </div>
);


const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const { files } = useFiles();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [subCollectionFilter, setSubCollectionFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('جدیدترین');
    const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

    const filteredAndSortedFiles = useMemo(() => {
        return files
            .filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(file => !statusFilter || file.status === statusFilter)
            .filter(file => !typeFilter || file.type === typeFilter)
            .filter(file => !subCollectionFilter || file.subCollection === subCollectionFilter)
            .sort((a, b) => {
                // A simple date conversion for sorting, assuming 'YYYY/MM/DD' format
                const dateA = new Date(a.uploadDate.replace(/\//g, '-')).getTime();
                const dateB = new Date(b.uploadDate.replace(/\//g, '-')).getTime();
                if (sortOrder === 'قدیمی ترین') {
                    return dateA - dateB;
                }
                return dateB - dateA;
            });
    }, [files, searchTerm, statusFilter, typeFilter, subCollectionFilter, sortOrder]);

    const stats = useMemo(() => ({
        total: files.length,
        pending: files.filter(f => f.status === FileStatus.Pending).length,
        processing: files.filter(f => f.status === FileStatus.Processing).length,
        approved: files.filter(f => f.status === FileStatus.Approved).length,
        rejected: files.filter(f => f.status === FileStatus.Rejected).length,
    }), [files]);

    const renderStatusBadge = (status: FileStatus) => {
        const { bg, text, dot } = STATUS_STYLES[status];
        return (
            <span className={`inline-flex items-center justify-center w-28 px-3 py-1 rounded-full text-xs font-medium ${bg} ${text} gap-x-2`}>
                <span className={`w-2 h-2 rounded-full ${dot}`}></span>
                {status}
            </span>
        );
    };

    const filterOptions = {
        status: Object.values(FileStatus),
        type: [...new Set(files.map(f => f.type))],
        subCollection: [...new Set(files.map(f => f.subCollection))],
        sort: ['جدیدترین', 'قدیمی ترین']
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">داشبورد ناظر</h2>
            <p className="text-gray-500 mb-6">فهرست فایل‌های بارگذاری شده را مدیریت کنید.</p>

            <StatCard stats={stats} />

            <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4 items-center">
                    <div className="relative lg:col-span-2">
                        <input
                            type="text"
                            placeholder="جستجو بر اساس نام فایل..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    
                    <FilterDropdown defaultLabel="همه وضعیت ها" options={filterOptions.status} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
                    <FilterDropdown defaultLabel="همه انواع" options={filterOptions.type} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} />
                    <FilterDropdown defaultLabel="همه زیرمجموعه ها" options={filterOptions.subCollection} value={subCollectionFilter} onChange={(e) => setSubCollectionFilter(e.target.value)} />
                     <FilterDropdown defaultLabel="مرتب سازی" options={filterOptions.sort} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />


                    <button
                        onClick={() => navigate('/upload')}
                        className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition shadow w-full lg:col-start-6"
                    >
                        بارگذاری فایل جدید
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">نام فایل</th>
                                <th scope="col" className="px-6 py-3">تاریخ بارگذاری</th>
                                <th scope="col" className="px-6 py-3">نوع</th>
                                <th scope="col" className="px-6 py-3">زیر مجموعه</th>
                                <th scope="col" className="px-6 py-3">وضعیت</th>
                                <th scope="col" className="px-6 py-3">اقدامات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedFiles.map((file) => (
                                <tr key={file.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-xs truncate" title={file.name}>
                                        {file.name}
                                    </td>
                                    <td className="px-6 py-4">{file.uploadDate}</td>
                                    <td className="px-6 py-4">{file.type}</td>
                                    <td className="px-6 py-4">{file.subCollection}</td>
                                    <td className="px-6 py-4">{renderStatusBadge(file.status)}</td>
                                    <td className="px-6 py-4 flex items-center gap-x-3">
                                        <button onClick={() => setSelectedFile(file)} className="text-gray-500 hover:text-teal-600 transition" title="مشاهده جزئیات">
                                            <EyeIcon className="w-5 h-5"/>
                                        </button>
                                        <button disabled={file.status !== FileStatus.Approved} className="text-gray-500 hover:text-blue-600 transition disabled:opacity-30 disabled:cursor-not-allowed" title="دانلود">
                                            <DownloadIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedFile && <FileDetailsModal file={selectedFile} onClose={() => setSelectedFile(null)} />}
        </div>
    );
};

export default DashboardPage;
