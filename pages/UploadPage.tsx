
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, ArrowRightIcon } from '../components/Icons';
import { MOCK_FILES } from '../constants'; 
import { useFiles, useAuth } from '../App';
import { FileData, FileStatus } from '../types';

const VerticalStepper: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    const steps = ["بارگذاری فایل", "پردازش", "بازبینی نهایی"];
    return (
        <div className="flex flex-col items-center justify-center w-48 p-4 bg-white rounded-2xl shadow-lg">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <div className="flex items-center gap-4 w-full">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 ${currentStep > index ? 'bg-teal-500 border-teal-500 text-white' : currentStep === index ? 'border-teal-500 text-teal-500' : 'border-gray-300 text-gray-400'}`}>
                           {currentStep > index ? <CheckIcon className="w-6 h-6"/> : index + 1}
                        </div>
                        <p className={`font-semibold ${currentStep >= index ? 'text-teal-600' : 'text-gray-500'}`}>{step}</p>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`w-0.5 h-12 my-2 ml-[82px] ${currentStep > index ? 'bg-teal-500' : 'bg-gray-300'}`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

const UploadStep1: React.FC<{ onNext: (data: any) => void }> = ({ onNext }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

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
            name: formData.get('fileName'),
            subject: formData.get('subject'),
            type: formData.get('fileType'),
            subCollection: formData.get('subCollection'),
            originalText: MOCK_FILES[2].originalText, 
            editedText: MOCK_FILES[2].originalText,
            extractedPhrases: MOCK_FILES[2].extractedPhrases,
        };
        onNext(data);
    };

    return (
        <div className="flex-1 flex gap-8">
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">بارگذاری فایل</h3>
                    <button onClick={() => window.history.back()} className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-600">
                        <span>بازگشت به داشبورد</span>
                        <ArrowRightIcon className="w-4 h-4" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">فایل جدید (MP3 یا WAV)</label>
                        <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md transition ${dragActive ? 'border-teal-500 bg-teal-50' : ''}`}>
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500"><span>انتخاب فایل</span><input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChange} accept=".mp3,.wav" /></label><p className="pr-1">یا آن را اینجا بکشید</p></div>
                                <p className="text-xs text-gray-500">{fileName || 'هیچ فایلی انتخاب نشده'}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fileName">نام فایل *</label>
                        <input type="text" id="fileName" name="fileName" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject">موضوع *</label>
                        <input type="text" id="subject" name="subject" maxLength={50} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fileType">نوع فایل</label>
                            <select id="fileType" name="fileType" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 bg-white"><option>صورت جلسه</option><option>درس آموخته</option></select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subCollection">زیرمجموعه</label>
                            <select id="subCollection" name="subCollection" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 bg-white"><option>فنی</option><option>مالی</option><option>منابع انسانی</option></select>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-teal-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-teal-600 transition shadow-md">
                        شروع پردازش
                    </button>
                </form>
            </div>
            <div className="w-72 bg-teal-50 p-6 rounded-2xl border border-teal-200 self-start">
                 <h4 className="font-bold text-teal-800 mb-4">نکاتی برای بهبود کیفیت</h4>
                 <ul className="space-y-3 text-sm text-teal-700 list-disc list-inside">
                     <li>از فایل‌های صوتی با کیفیت بالا و بدون نویز استفاده کنید.</li>
                     <li>صدای گوینده باید واضح و بلند باشد.</li>
                     <li>فرمت‌های مجاز MP3, WAV، حداکثر ۵۰ مگابایت.</li>
                     <li>فایل‌های بلند را به بخش‌های کوتاه‌تر تقسیم کنید.</li>
                 </ul>
            </div>
        </div>
    );
};

const UploadStep2: React.FC<{ onNext: (data: any) => void, onBack: () => void, data: any }> = ({ onNext, onBack, data }) => {
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
            
            {progress === 100 && (
                <>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <input name="name" value={localData.name} onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-lg" />
                    <select name="type" value={localData.type} onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-lg bg-white"><option>صورت جلسه</option><option>درس آموخته</option></select>
                    <select name="subCollection" value={localData.subCollection} onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-lg bg-white"><option>فنی</option><option>مالی</option><option>منابع انسانی</option></select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">متن استخراج شده (فقط خواندنی)</label>
                        <textarea readOnly value={localData.originalText} className="w-full h-64 p-3 bg-gray-100 border border-gray-300 rounded-lg resize-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">متن قابل ویرایش</label>
                        <textarea name="editedText" value={localData.editedText} onChange={handleChange} className="w-full h-64 p-3 border border-gray-300 rounded-lg resize-none focus:ring-teal-500 focus:border-teal-500" />
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
            )}
        </div>
    );
};

const UploadStep3: React.FC<{ onBack: () => void, onFinish: () => void, data: any }> = ({ onBack, onFinish, data }) => {
    return (
         <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg">
             <h3 className="font-bold text-lg mb-6 text-center">بازبینی و تایید نهایی</h3>
             <div className="flex gap-8">
                 <div className="w-1/3 border-l border-gray-200 pl-6">
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
                 <div className="w-2/3">
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

const UploadPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [uploadData, setUploadData] = useState<any>(null);
    const navigate = useNavigate();
    const { addFile } = useFiles();
    const { user } = useAuth();

    const handleNext = useCallback((data: any) => {
        setUploadData(prev => ({ ...prev, ...data }));
        setCurrentStep(prev => prev < 2 ? prev + 1 : prev);
    }, []);
    
    const handleBack = useCallback(() => {
        setCurrentStep(prev => prev > 0 ? prev - 1 : prev);
    }, []);

    const handleFinish = useCallback(() => {
        if (uploadData && user) {
            const newFile: FileData = {
                id: `file_${Date.now()}`,
                name: uploadData.name,
                uploadDate: new Intl.DateTimeFormat('fa-IR-u-nu-latn', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()),
                type: uploadData.type,
                subCollection: uploadData.subCollection,
                status: FileStatus.Approved,
                uploader: user.name,
                originalText: uploadData.originalText,
                editedText: uploadData.editedText,
                extractedPhrases: uploadData.extractedPhrases,
                duration: Math.floor(Math.random() * 500) + 100
            };
            addFile(newFile);
        }
        navigate('/dashboard');
    }, [navigate, uploadData, addFile, user]);

    const renderStep = () => {
        switch (currentStep) {
            case 0: return <UploadStep1 onNext={handleNext} />;
            case 1: return <UploadStep2 onNext={handleNext} onBack={handleBack} data={uploadData} />;
            case 2: return <UploadStep3 onBack={handleBack} onFinish={handleFinish} data={uploadData} />;
            default: return <UploadStep1 onNext={handleNext} />;
        }
    };
    
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex gap-8 items-start">
                <VerticalStepper currentStep={currentStep} />
                {renderStep()}
            </div>
        </div>
    );
};

export default UploadPage;