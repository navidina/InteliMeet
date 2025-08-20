import React, { useState, useMemo } from 'react';
import { FileStatus, FileData } from '../types';
import { STATUS_STYLES } from '../constants';
import { SearchIcon, ChevronDownIcon, EyeIcon, DownloadIcon, XIcon, CheckIcon, DashboardIcon } from '../components/Icons';
import { useNavigate } from 'react-router-dom';
import { useFiles } from '../App';

const StatCard: React.FC<{ title: string; count: number; icon: React.ReactNode; color: string }> = ({ title, count, icon, color }) => (
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

const FileDetailsModal: React.FC<{ file: FileData; onClose: () => void }> = ({ file, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 my-8 overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">جزئیات فایل</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div><strong className="text-gray-600">نام فایل:</strong> <span className="text-gray-800 break-words">{file.name}</span></div>
                    <div><strong className="text-gray-600">وضعیت:</strong> <span className={`font-semibold ${STATUS_STYLES[file.status].text}`}>{file.status}</span></div>
                    <div><strong className="text-gray-600">موضوع:</strong> <span className="text-gray-800">جلسه بررسی فنی</span></div>
                    <div><strong className="text-gray-600">نوع:</strong> <span className="text-gray-800">{file.type}</span></div>
                    <div><strong className="text-gray-600">زیر مجموعه:</strong> <span className="text-gray-800">{file.subCollection}</span></div>
                    <div><strong className="text-gray-600">بارگذاری شده توسط:</strong> <span className="text-gray-800">{file.uploader}</span></div>
                </div>
                <div className="mt-6">
                    <h4 className="font-semibold text-gray-700 mb-2">متن استخراج شده:</h4>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-lg border leading-relaxed">{file.originalText || 'متنی برای نمایش وجود ندارد.'}</p>
                </div>
                {file.audioSrc && (
                     <div className="mt-6">
                        <h4 className="font-semibold text-gray-700 mb-2">پخش فایل صوتی:</h4>
                        <audio controls className="w-full">
                            <source src={file.audioSrc} type="audio/mpeg" />
                            مرورگر شما از پخش صدا پشتیبانی نمی‌کند.
                        </audio>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const { files } = useFiles();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('همه وضعیت ها');
    const [typeFilter, setTypeFilter] = useState('همه انواع');
    const [subCollectionFilter, setSubCollectionFilter] = useState('همه زیرمجموعه ها');
    const [sortOrder, setSortOrder] = useState('جدیدترین');
    const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

    const filteredAndSortedFiles = useMemo(() => {
        return files
            .filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(file => statusFilter === 'همه وضعیت ها' || file.status === statusFilter)
            .filter(file => typeFilter === 'همه انواع' || file.type === typeFilter)
            .filter(file => subCollectionFilter === 'همه زیرمجموعه ها' || file.subCollection === subCollectionFilter)
            .sort((a, b) => {
                if (sortOrder === 'قدیمی ترین') {
                    return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
                }
                return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
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

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">داشبورد ناظر</h2>
            <p className="text-gray-500 mb-6">ناظر | محمد رضایی (فناوری اطلاعات)</p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <StatCard title="کل فایل ها" count={stats.total} icon={<DashboardIcon />} color="#60A5FA" />
                <StatCard title="در انتظار" count={stats.pending} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>} color="#FBBF24" />
                <StatCard title="در حال پردازش" count={stats.processing} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>} color="#3B82F6" />
                <StatCard title="تایید شده" count={stats.approved} icon={<CheckIcon />} color="#34D399" />
                <StatCard title="رد شده" count={stats.rejected} icon={<XIcon />} color="#F87171" />
            </div>

            {/* Filters and Table */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
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
                    
                    {/* Filter Dropdowns */}
                    {['همه وضعیت ها', 'همه انواع', 'همه زیرمجموعه ها', 'مرتب سازی'].map((label, index) => (
                        <div key={label} className="relative">
                             <select 
                                className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-teal-500"
                                onChange={(e) => {
                                    if(index === 0) setStatusFilter(e.target.value);
                                    if(index === 1) setTypeFilter(e.target.value);
                                    if(index === 2) setSubCollectionFilter(e.target.value);
                                    if(index === 3) setSortOrder(e.target.value);
                                }}
                            >
                                <option>{label}</option>
                                {index === 0 && Object.values(FileStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                {index === 1 && ['صورت جلسه', 'درس آموخته'].map(t => <option key={t} value={t}>{t}</option>)}
                                {index === 2 && ['مالی', 'آموزش', 'فنی', 'منابع انسانی'].map(sc => <option key={sc} value={sc}>{sc}</option>)}
                                {index === 3 && ['جدیدترین', 'قدیمی ترین'].map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700">
                               <ChevronDownIcon className="w-4 h-4" />
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => navigate('/upload')}
                        className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition shadow w-full"
                    >
                        بارگذاری فایل جدید
                    </button>
                </div>

                {/* Table */}
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