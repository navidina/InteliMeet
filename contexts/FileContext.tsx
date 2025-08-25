
import React, { useState, createContext, useContext, useMemo, ReactNode, useCallback } from 'react';
import { FileData, FileStatus } from '../types';
import { MOCK_FILES } from '../constants';

interface FileContextType {
  files: FileData[];
  addFile: (file: FileData) => void;
  getFileById: (id: string) => FileData | undefined;
  updateFile: (fileId: string, updates: Partial<FileData>) => void;
}

const FileContext = createContext<FileContextType | null>(null);

export const useFiles = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFiles must be used within a FileProvider");
  }
  return context;
};

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<FileData[]>(MOCK_FILES);

  const getFileById = useCallback((id: string) => {
    return files.find(f => f.id === id);
  }, [files]);

  const updateFile = useCallback((fileId: string, updates: Partial<FileData>) => {
    setFiles(prevFiles =>
      prevFiles.map(f =>
        f.id === fileId ? { ...f, ...updates } : f
      )
    );
  }, []);

  const addFile = useCallback((file: FileData) => {
    setFiles(prevFiles => [file, ...prevFiles]);

    // Simulate backend processing time
    setTimeout(() => {
      updateFile(file.id, { status: FileStatus.Pending });
    }, 5000); // 5-second delay
  }, [updateFile]);
  
  const value = useMemo(() => ({ files, addFile, getFileById, updateFile }), [files, addFile, getFileById, updateFile]);

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};
