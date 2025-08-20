import React, { useState, useMemo } from 'react';
import { MOCK_DICTIONARY_TERMS } from '../constants';
import { DictionaryTerm } from '../types';
import { SearchIcon, ChevronDownIcon, FolderIcon, ArrowRightIcon, ArrowLeftIcon } from '../components/Icons';
import DictionaryTermCard from '../components/dictionary/DictionaryTermCard';

const DictionaryPage: React.FC = () => {
    const [terms] = useState<DictionaryTerm[]>(MOCK_DICTIONARY_TERMS);
    const [searchTerm, setSearchTerm] = useState('');
    const [subCollectionFilter, setSubCollectionFilter] = useState('همه زیرمجموعه ها');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredTerms = useMemo(() => {
        return terms
            .filter(term => term.term.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(term => subCollectionFilter === 'همه زیرمجموعه ها' || term.subCollection === subCollectionFilter);
    }, [terms, searchTerm, subCollectionFilter]);

    const paginatedTerms = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredTerms.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredTerms, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredTerms.length / itemsPerPage);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">لیست عبارات تخصصی</h2>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="جستجو بر اساس نام عبارت..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <div className="relative w-full md:w-56">
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                            <FolderIcon className="w-5 h-5" />
                        </div>
                         <select 
                            className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 pl-10 pr-10 rounded-lg focus:outline-none focus:bg-white focus:border-teal-500"
                            value={subCollectionFilter}
                            onChange={(e) => setSubCollectionFilter(e.target.value)}
                        >
                            <option>همه زیرمجموعه ها</option>
                            {[...new Set(terms.map(t => t.subCollection))].map(sc => <option key={sc} value={sc}>{sc}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">
                           <ChevronDownIcon className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {paginatedTerms.map(term => (
                        <DictionaryTermCard key={term.id} term={term} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-8">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                            disabled={currentPage === 1}
                            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md border hover:bg-teal-500 hover:text-white disabled:opacity-50 flex items-center gap-2"
                        >
                            <ArrowRightIcon className="w-4 h-4" />
                            <span>قبلی</span>
                        </button>
                        
                        <span className="px-4 py-2 mx-1 text-gray-700">
                            صفحه {currentPage} از {totalPages}
                        </span>

                        <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md border hover:bg-teal-500 hover:text-white disabled:opacity-50 flex items-center gap-2"
                        >
                            <span>بعدی</span>
                            <ArrowLeftIcon className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DictionaryPage;