
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFiles } from '../contexts/FileContext';
import { useAuth } from '../contexts/AuthContext';
import { FileData, FileStatus } from '../types';

import VerticalStepper from '../components/upload/VerticalStepper';
import UploadStep1 from '../components/upload/UploadStep1';
import UploadStep2 from '../components/upload/UploadStep2';
import UploadStep3 from '../components/upload/UploadStep3';

const UploadPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [uploadData, setUploadData] = useState<Partial<FileData>>({});
    const navigate = useNavigate();
    const { addFile } = useFiles();
    const { user } = useAuth();

    const handleNext = useCallback((data: Partial<FileData>) => {
        setUploadData(prev => ({ ...prev, ...data }));
        setCurrentStep(prev => prev < 2 ? prev + 1 : prev);
    }, []);
    
    const handleBack = useCallback(() => {
        setCurrentStep(prev => prev > 0 ? prev - 1 : prev);
    }, []);

    const handleFinish = useCallback((finalData: Partial<FileData>) => {
        if (finalData && user) {
            const newFile: FileData = {
                id: `file_${Date.now()}`,
                name: finalData.name ?? 'بدون نام',
                uploadDate: new Intl.DateTimeFormat('fa-IR-u-nu-latn', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()),
                type: finalData.type ?? 'نامشخص',
                subCollection: finalData.subCollection ?? 'نامشخص',
                status: FileStatus.Approved,
                uploader: user.name,
                originalText: finalData.originalText,
                editedText: finalData.editedText,
                extractedPhrases: finalData.extractedPhrases,
                duration: Math.floor(Math.random() * 500) + 100
            };
            addFile(newFile);
        }
        navigate('/dashboard');
    }, [navigate, addFile, user]);

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
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <VerticalStepper currentStep={currentStep} />
                <div className="w-full lg:flex-1">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default UploadPage;