
import React, { useState } from 'react';
import { FileData } from '../../types';
import FullScreenEditModal from './FullScreenEditModal';
import { TagIcon, EditIcon, CheckIcon, ArrowRightIcon, ClipboardListIcon } from '../Icons';

interface UploadStep3Props {
    onBack: () => void;
    onFinish: (data: Partial<FileData>) => void;
    data: Partial<FileData>;
}

const UploadStep3: React.FC<UploadStep3Props> = ({ onBack, onFinish, data }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedText, setEditedText] = useState(data.editedText || '');

    const handleSaveEditedText = (newText: string) => {
        setEditedText(newText);
    };
    
    const handleFinalFinish = () => {
        onFinish({ ...data, editedText });
    };

    const formatAsMeetingMinutes = (text: string) => {
        return (
            <div>
                <h3 className="text-lg font-bold mb-2">صورتجلسه</h3>
                <p className="text-gray-600 mb-1"><strong>موضوع:</strong> {data.name}</p>
                <p className="text-gray-600 mb-4"><strong>تاریخ:</strong> {new Intl.DateTimeFormat('fa-IR').format(new Date())}</p>
                <div className="whitespace-pre-wrap">{text}</div>
            </div>
        );
    };

    return (
         <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg">
             <h3 className="font-bold text-lg mb-6 text-center">بازبینی و تایید نهایی</h3>
             <div className="flex flex-col md:flex-row gap-8">
                 <div className="w-full md:w-1/3 md:border-l md:border-gray-200 md:pl-6">
                     <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <ClipboardListIcon className="w-5 h-5 text-teal-600"/>
                        <span>مشخصات فایل</span>
                     </h4>
                     <div className="space-y-3 text-sm">
                         <p><strong className="text-gray-600">نام فایل:</strong> {data.name}</p>
                         <p><strong className="text-gray-600">نوع فایل:</strong> {data.type}</p>
                         <p><strong className="text-gray-600">زیر مجموعه:</strong> {data.subCollection}</p>
                     </div>
                      <h4 className="font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-2">
                        <TagIcon className="w-5 h-5 text-teal-600"/>
                        <span>عبارات تخصصی استخراج شده</span>
                      </h4>
                     <div className="flex flex-wrap gap-2">
                         {data.extractedPhrases?.map((phrase: string) => (
                            <span key={phrase} className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1.5 rounded-full">{phrase}</span>
                         ))}
                     </div>
                 </div>
                 <div className="w-full md:w-2/3">
                      <h4 className="font-semibold text-gray-800 mb-4">متن نهایی</h4>
                      <div className="bg-gray-50 p-4 rounded-lg border h-64 overflow-y-auto text-gray-700 leading-relaxed">
                          {formatAsMeetingMinutes(editedText)}
                      </div>
                      <div className="mt-4">
                        <button onClick={() => setIsEditModalOpen(true)} className="text-teal-600 font-semibold hover:underline flex items-center gap-2">
                            <EditIcon className="w-4 h-4"/>
                            <span>ویرایش متن نهایی</span>
                        </button>
                      </div>
                 </div>
             </div>
             <div className="flex justify-between items-center mt-8 pt-6 border-t">
                 <button onClick={onBack} className="text-gray-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition flex items-center gap-2">
                    <ArrowRightIcon className="w-4 h-4" />
                    <span>بازگشت به مرحله قبل</span>
                 </button>
                 <button onClick={handleFinalFinish} className="bg-teal-500 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-teal-600 transition shadow-md flex items-center gap-2">
                    <CheckIcon className="w-5 h-5" />
                    <span>تایید نهایی و اتمام</span>
                 </button>
             </div>

            <FullScreenEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                initialText={editedText}
                onSave={handleSaveEditedText}
                title="ویرایش نهایی صورتجلسه"
            />
         </div>
    );
};

export default UploadStep3;