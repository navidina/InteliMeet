
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFiles } from '../contexts/FileContext';
import { useAuth } from '../contexts/AuthContext';
import { FileData, FileStatus } from '../types';
import UploadStep1 from '../components/upload/UploadStep1';

const UploadPage: React.FC = () => {
    const navigate = useNavigate();
    const { addFile } = useFiles();
    const { user } = useAuth();

    const handleUpload = (data: Partial<FileData>) => {
        if (user) {
            const newFile: FileData = {
                id: `file_${Date.now()}`,
                name: data.name ?? 'بدون نام',
                uploadDate: new Intl.DateTimeFormat('fa-IR-u-nu-latn', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()),
                type: data.type ?? 'نامشخص',
                subCollection: data.subCollection ?? 'نامشخص',
                status: FileStatus.Processing,
                uploader: user.name,
                originalText: data.originalText,
                editedText: data.editedText,
                extractedPhrases: data.extractedPhrases,
                duration: Math.floor(Math.random() * 500) + 100
            };
            addFile(newFile);
            navigate('/dashboard');
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
             <UploadStep1 onUpload={handleUpload} />
        </div>
    );
};

export default UploadPage;
