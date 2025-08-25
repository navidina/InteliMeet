import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_FILES } from '../../constants';
import { ArrowRightIcon, ProcessingIcon, InfoIcon, FileTypeIcon, FolderIcon } from '../Icons';
import { FileData } from '../../types';

interface UploadStep1Props {
    onUpload: (data: Partial<FileData>) => void;
}

const UploadStep1: React.FC<UploadStep1Props> = ({ onUpload }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const navigate = useNavigate();

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };
    
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFileName(e.dataTransfer.files[0].name);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            name: formData.get('fileName') as string,
            // 'subject' is not in FileData, so we omit it or map it appropriately
            type: formData.get('fileType') as string,
            subCollection: formData.get('subCollection') as string,
            originalText: MOCK_FILES[2].originalText, 
            editedText: MOCK_FILES[2].originalText,
            extractedPhrases: MOCK_FILES[2].extractedPhrases,
        };
        onUpload(data);
    };

    return (
        <div className="flex-1 flex flex-col md:flex-row gap-8">
            <div className="flex-1 p-2">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">بارگذاری فایل</h3>
                    <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-gray-600 hover:text-sky-600">
                        <span>بازگشت به داشبورد</span>
                        <ArrowRightIcon className="w-4 h-4" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">فایل جدید (MP3 یا WAV)</label>
                        <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md transition ${dragActive ? 'border-sky-500 bg-sky-50' : ''}`}>
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-sky-600 hover:text-sky-500"><span>انتخاب فایل</span><input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChange} accept=".mp3,.wav" /></label><p className="pr-1">یا آن را اینجا بکشید</p></div>
                                <p className="text-xs text-gray-500">{fileName || 'هیچ فایلی انتخاب نشده'}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fileName">نام فایل *</label>
                        <input type="text" id="fileName" name="fileName" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject">موضوع *</label>
                        <input type="text" id="subject" name="subject" maxLength={50} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fileType">نوع فایل</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                                    <FileTypeIcon className="w-5 h-5"/>
                                </div>
                                <select id="fileType" name="fileType" className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white appearance-none"><option>صورت جلسه</option><option>درس آموخته</option></select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subCollection">زیرمجموعه</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                                    <FolderIcon className="w-5 h-5"/>
                                </div>
                                <select id="subCollection" name="subCollection" className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white appearance-none"><option>فنی</option><option>مالی</option><option>منابع انسانی</option></select>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-sky-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-sky-600 transition shadow-md flex items-center justify-center gap-2">
                        <ProcessingIcon className="w-5 h-5" />
                        <span>شروع پردازش</span>
                    </button>
                </form>
            </div>
            <div className="w-full md:w-72 bg-sky-50 p-6 rounded-2xl border border-sky-200 self-start">
                 <h4 className="font-bold text-sky-800 mb-4 flex items-center gap-2">
                    <InfoIcon className="w-5 h-5"/>
                    <span>نکاتی برای بهبود کیفیت</span>
                 </h4>
                 <ul className="space-y-3 text-sm text-sky-700 list-disc list-inside">
                     <li>از فایل‌های صوتی با کیفیت بالا و بدون نویز استفاده کنید.</li>
                     <li>صدای گوینده باید واضح و بلند باشد.</li>
                     <li>فرمت‌های مجاز MP3, WAV، حداکثر ۵۰ مگابایت.</li>
                     <li>فایل‌های بلند را به بخش‌های کوتاه‌تر تقسیم کنید.</li>
                 </ul>
            </div>
        </div>
    );
};

export default UploadStep1;