
import React, { useState, useEffect } from 'react';
import { FileData } from '../../types';

interface UploadStep2Props {
    onNext: (data: Partial<FileData>) => void;
    onBack: () => void;
    data: Partial<FileData>;
}

const UploadStep2: React.FC<UploadStep2Props> = ({ onNext, onBack, data }) => {
    const [progress, setProgress] = useState(0);
    const [localData, setLocalData] = useState(data);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(100), 500);
        return () => clearTimeout(timer);
    }, []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setLocalData({ ...localData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">پردازش فایل و ویرایش متن</h3>
                <span className="text-sm text-gray-500">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6"><div className="bg-teal-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div></div>
            
            {progress === 100 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <input name="name" value={localData.name || ''} onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-lg" />
                        <select name="type" value={localData.type || 'صورت جلسه'} onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-lg bg-white"><option>صورت جلسه</option><option>درس آموخته</option></select>
                        <select name="subCollection" value={localData.subCollection || 'فنی'} onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-lg bg-white"><option>فنی</option><option>مالی</option><option>منابع انسانی</option></select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">متن استخراج شده (فقط خواندنی)</label>
                            <textarea readOnly value={localData.originalText || ''} className="w-full h-64 p-3 bg-gray-100 border border-gray-300 rounded-lg resize-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">متن قابل ویرایش</label>
                            <textarea name="editedText" value={localData.editedText || ''} onChange={handleChange} className="w-full h-64 p-3 border border-gray-300 rounded-lg resize-none focus:ring-teal-500 focus:border-teal-500" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <button onClick={onBack} className="text-gray-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition">بازگشت</button>
                        <div className="flex gap-x-4">
                            <button className="text-gray-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition">پردازش مجدد</button>
                            <button className="bg-red-100 text-red-700 font-bold py-2 px-4 rounded-lg hover:bg-red-200 transition">رد محتوا</button>
                            <button onClick={() => onNext(localData)} className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition">تایید اولیه و بازبینی</button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center py-10 text-gray-500">
                    <p>در حال پردازش فایل، لطفا منتظر بمانید...</p>
                </div>
            )}
        </div>
    );
};

export default UploadStep2;
