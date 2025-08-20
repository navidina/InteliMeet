
import React, { useState, createContext, useContext, useMemo, ReactNode } from 'react';
import { FileData } from '../types';
import { MOCK_FILES } from '../constants';

interface FileContextType {
  files: FileData[];
  addFile: (file: FileData) => void;
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

  const addFile = (file: FileData) => {
    setFiles(prevFiles => [file, ...prevFiles]);
  };
  
  const value = useMemo(() => ({ files, addFile }), [files]);

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};
