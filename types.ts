
export enum FileStatus {
  Pending = 'در انتظار تایید',
  Processing = 'در حال پردازش',
  Approved = 'تایید شده',
  Rejected = 'رد شده',
}

export interface FileData {
  id: string;
  name: string;
  uploadDate: string;
  type: string;
  subCollection: string;
  status: FileStatus;
  duration?: number;
  uploader?: string;
  originalText?: string;
  editedText?: string;
  audioSrc?: string;
  extractedPhrases?: string[];
}

export interface User {
  name: string;
  role: string;
  employeeId: string;
  department: string;
}

export interface DictionaryTerm {
  id: string;
  term: string;
  description: string;
  subCollection: string;
}