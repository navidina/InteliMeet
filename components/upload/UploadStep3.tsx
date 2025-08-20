
import React from 'react';
import { FileData } from '../../types';

interface UploadStep3Props {
    onBack: () => void;
    onFinish: () => void;
    data: Partial<FileData>;
}

const UploadStep3: React.FC<UploadStep3Props> = ({ onBack, onFinish, data }) => {
    return (
         <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg">
             <h3 className="font-bold text-lg mb-6 text-center">بازبینی و تایید نهایی</h3>
             <div className="flex flex-col md:flex-row gap-8">
                 <div className="w-full md:w-1/3 md:border-l md:border-gray-200 md:pl-6">
                     <h4 className="font-semibold text-gray-800 mb-4">مشخصات فایل</h4>
                     <div className="space-y-3 text-sm">
                         <p><strong className="text-gray-600">نام فایل:</strong> {data.name}</p>
                         <p><strong className="text-gray-600">نوع فایل:</strong> {data.type}</p>
                         <p><strong className="text-gray-600">زیر مجموعه:</strong> {data.subCollection}</p>
                     </div>
                      <h4 className="font-semibold text-gray-800 mt-8 mb-4">عبارات تخصصی استخراج شده</h4>
                     <div className="flex flex-wrap gap-2">
                         {data.extractedPhrases?.map((phrase: string) => (
                            <span key={phrase} className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1.5 rounded-full">{phrase}</span>
                         ))}
                     </div>
                 </div>
                 <div className="w-full md:w-2/3">
                      <h4 className="font-semibold text-gray-800 mb-4">متن نهایی</h4>
                      <div className="bg-gray-50 p-4 rounded-lg border h-64 overflow-y-auto text-gray-700 leading-relaxed">
                          {data.editedText}
                      </div>
                 </div>
             </div>
             <div className="flex justify-between items-center mt-8 pt-6 border-t">
                 <button onClick={onBack} className="text-gray-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition">بازگشت به مرحله قبل</button>
                 <button onClick={onFinish} className="bg-teal-500 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-teal-600 transition shadow-md">تایید نهایی و اتمام</button>
             </div>
         </div>
    );
};

export default UploadStep3;
