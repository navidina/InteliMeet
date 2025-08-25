import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFiles } from '../contexts/FileContext';
import { FileData, FileStatus } from '../types';

import VerticalStepper from '../components/upload/VerticalStepper';
import UploadStep2 from '../components/upload/UploadStep2';
import UploadStep3 from '../components/upload/UploadStep3';

const ReviewPage: React.FC = () => {
    const { fileId } = useParams<{ fileId: string }>();
    const navigate = useNavigate();
    const { getFileById, updateFile } = useFiles();
    
    const [currentStep, setCurrentStep] = useState(0);
    const [fileData, setFileData] = useState<FileData | null>(null);

    useEffect(() => {
        if (fileId) {
            const file = getFileById(fileId);
            if (file) {
                setFileData(file);
            } else {
                navigate('/dashboard');
            }
        }
    }, [fileId, getFileById, navigate]);

    const handleNext = useCallback((data: Partial<FileData>) => {
        setFileData(prev => prev ? { ...prev, ...data } : null);
        setCurrentStep(prev => prev < 1 ? prev + 1 : prev);
    }, []);
    
    const handleBack = useCallback(() => {
        setCurrentStep(prev => prev > 0 ? prev - 1 : prev);
    }, []);

    const handleFinish = useCallback((finalData: Partial<FileData>) => {
        if (fileId && fileData) {
            const updates = { ...finalData, status: FileStatus.Approved };
            delete updates.id; // Avoid overriding the id
            updateFile(fileId, updates);
            navigate('/dashboard');
        }
    }, [navigate, updateFile, fileId, fileData]);

    const renderStep = () => {
        if (!fileData) return null;

        switch (currentStep) {
            case 0: return <UploadStep2 onNext={handleNext} onBack={() => navigate('/dashboard')} data={fileData} />;
            case 1: return <UploadStep3 onBack={handleBack} onFinish={handleFinish} data={fileData} />;
            default: return null;
        }
    };

    const reviewSteps = ["پردازش و ویرایش", "بازبینی نهایی"];
    
    if (!fileData) {
        return (
            <div className="container mx-auto p-8 text-center text-gray-600">
                <p>در حال بارگذاری اطلاعات فایل...</p>
            </div>
        );
    }
    
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <VerticalStepper currentStep={currentStep} steps={reviewSteps} />
                <div className="w-full lg:flex-1">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;