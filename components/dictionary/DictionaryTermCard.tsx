import React, { useState } from 'react';
import { DictionaryTerm } from '../../types';
import { CheckIcon, XIcon, EditIcon } from '../Icons';

const DictionaryTermCard: React.FC<{ term: DictionaryTerm }> = ({ term }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(term.description);

    const handleSave = () => {
        // Here you would typically make an API call to save the changes
        console.log("Saving new description:", description);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setDescription(term.description);
        setIsEditing(false);
    };

    return (
        <div className="bg-white p-4 rounded-lg border flex flex-col justify-between transition-shadow hover:shadow-md">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{term.term}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{term.subCollection}</span>
                </div>
                {isEditing ? (
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full text-sm text-gray-600 p-2 border rounded-md resize-none focus:ring-sky-500 focus:border-sky-500"
                        rows={4}
                    />
                ) : (
                    <p className="text-sm text-gray-600 h-20 overflow-hidden">{description}</p>
                )}
            </div>
            <div className="mt-4 flex justify-end items-center h-8">
                {isEditing ? (
                    <div className="flex gap-2">
                        <button onClick={handleCancel} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" title="لغو"><XIcon className="w-5 h-5"/></button>
                        <button onClick={handleSave} className="p-2 text-green-500 hover:bg-green-50 rounded-full" title="ذخیره"><CheckIcon className="w-5 h-5"/></button>
                    </div>
                ) : (
                    <button 
                        onClick={() => setIsEditing(true)} 
                        className="text-sm text-sky-600 font-semibold hover:underline flex items-center gap-1"
                    >
                        <EditIcon className="w-4 h-4" />
                        <span>ویرایش</span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default DictionaryTermCard;