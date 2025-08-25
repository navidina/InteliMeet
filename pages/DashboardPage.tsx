import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileStatus, FileData } from '../types';
import { STATUS_STYLES } from '../constants';
import { useFiles } from '../contexts/FileContext';
import { SearchIcon, EyeIcon, DownloadIcon, PlusIcon } from '../components/Icons';
import StatCard from '../components/dashboard/StatCard';
import FileDetailsModal from '../components/dashboard/FileDetailsModal';
import StatusChart from '../components/dashboard/StatusChart';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const { files } = useFiles();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<FileStatus | 'all'>('all');
    const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

    const handleStatusFilterChange = (status: FileStatus | 'all') => {
        setStatusFilter(status);
    };

    const filteredFiles = useMemo(() => {
        return files
            .filter(file => {
                const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = statusFilter === 'all' || file.status === statusFilter;
                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                const dateA = new Date(a.uploadDate.replace(/\//g, '-')).getTime();
                const dateB = new Date(b.uploadDate.replace(/\//g, '-')).getTime();
                return dateB - dateA;
            });
    }, [files, searchTerm, statusFilter]);

    const stats = useMemo(() => ({
        total: files.length,
        pending: files.filter(f => f.status === FileStatus.Pending).length,
        processing: files.filter(f => f.status === FileStatus.Processing).length,
        approved: files.filter(f => f.status === FileStatus.Approved).length,
        rejected: files.filter(f => f.status === FileStatus.Rejected).length,
    }), [files]);
    
    const activeFilterText = statusFilter === 'all' ? '' : ` (فیلتر: ${statusFilter})`;

    const renderStatusBadge = (status: FileStatus) => {
        const { bg, text, dot } = STATUS_STYLES[status];
        return (
            <span className={`inline-flex items-center justify-center min-w-[100px] px-2.5 py-1 rounded-full text-xs font-medium ${bg} ${text} gap-x-1.5`}>
                <span className={`w-2 h-2 rounded-full ${dot}`}></span>
                {status}
            </span>
        );
    };

    const handleViewClick = (file: FileData) => {
        if (file.status === FileStatus.Pending) {
            navigate(`/review/${file.id}`);
        } else {
            setSelectedFile(file);
        }
    };

    return (
        <div className="space-y-6">
            <div className="p-6 md:p-8 rounded-2xl shadow-lg text-white relative overflow-hidden bg-gradient-to-br from-sky-500 via-sky-600 to-yellow-300">
                 <div className="absolute inset-0 bg-black/10"></div>
                 <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full"></div>
                 <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold">آکادمی اسلامی فولکوری</h2>
                    <p className="mt-2 opacity-90">به پنل دستیار مستندساز هوشمند خوش آمدید</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard title="کل فایل ها" count={stats.total} colorTheme="orange" status="all" onFilterClick={handleStatusFilterChange} isActive={statusFilter === 'all'} />
                 <StatCard title="در انتظار تایید" count={stats.pending} colorTheme="yellow" status={FileStatus.Pending} onFilterClick={handleStatusFilterChange} isActive={statusFilter === FileStatus.Pending} />
                 <StatCard title="در حال پردازش" count={stats.processing} colorTheme="blue" status={FileStatus.Processing} onFilterClick={handleStatusFilterChange} isActive={statusFilter === FileStatus.Processing} />
                 <StatCard title="تایید شده" count={stats.approved} colorTheme="green" status={FileStatus.Approved} onFilterClick={handleStatusFilterChange} isActive={statusFilter === FileStatus.Approved} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                        <h3 className="text-lg font-bold text-slate-800">{`لیست فایل‌ها و پرداخت‌ها${activeFilterText}`}</h3>
                         <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="جستجوی فایل..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-right text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">نام فایل</th>
                                    <th scope="col" className="px-6 py-3">تاریخ</th>
                                    <th scope="col" className="px-6 py-3 hidden md:table-cell">نوع</th>
                                    <th scope="col" className="px-6 py-3">وضعیت</th>
                                    <th scope="col" className="px-6 py-3">اقدامات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFiles.map((file) => (
                                    <tr key={file.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-[150px] truncate" title={file.name}>
                                            {file.name}
                                        </td>
                                        <td className="px-6 py-4">{file.uploadDate}</td>
                                        <td className="px-6 py-4 hidden md:table-cell">{file.type}</td>
                                        <td className="px-6 py-4">{renderStatusBadge(file.status)}</td>
                                        <td className="px-6 py-4 flex items-center gap-x-2">
                                            <button 
                                                onClick={() => handleViewClick(file)} 
                                                className="p-1.5 text-gray-500 hover:text-sky-600 rounded-md hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed" 
                                                title="مشاهده جزئیات"
                                                disabled={file.status === FileStatus.Processing}
                                            >
                                                <EyeIcon className="w-5 h-5"/>
                                            </button>
                                            <button disabled={file.status !== FileStatus.Approved} className="p-1.5 text-gray-500 hover:text-sky-600 rounded-md hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed" title="دانلود">
                                                <DownloadIcon className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <StatusChart stats={stats} />
                </div>
            </div>

            {selectedFile && <FileDetailsModal file={selectedFile} onClose={() => setSelectedFile(null)} />}
        </div>
    );
};

export default DashboardPage;