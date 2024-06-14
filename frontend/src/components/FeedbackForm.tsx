import React from 'react';
import TextareaAutosize from "react-textarea-autosize"
import Loader from './Loader';

interface FeedbackFormInterface {
    question: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    inputBoxValue: string | null;
    usernameBoxValue: string | null;
    loading:boolean
}

const FeedbackForm: React.FC<FeedbackFormInterface> = ({
    question,
    onChange,
    onChangeName,
    onClick,
    inputBoxValue,
    usernameBoxValue,
    loading
}) => {
    return (
        <div className='w-1/2 mx-auto p-3 '>
            <div className="flex flex-col mx-auto w-30 rounded-md shaodw-md border-2 border-gray-700 justify-center space-y-5 p-4">
                <p className="font-semibold text-2xl text-gray-900 block w-full p-2">{question}</p>
                <input className="w-full p-2 border-2 border-gray-300 rounded-md" type="text" onChange={onChangeName} required={true} placeholder="Name" value={usernameBoxValue || ''} disabled={loading} />
                <div className='w-full flex items-center space-x-3'>
                    <span className='text-xl font-semibold'>Feedback</span>
                    <TextareaAutosize className='text-xl border-2 border-gray-300 w-full p-2 rounded-md' autoFocus onChange={onChange} required={true} placeholder='Feedback' value={inputBoxValue || ''} disabled={loading} />
                </div>
                
                <button className="w-full mx-auto bg-blue-500 text-white p-3 rounded-md text-2xl font-semibold hover:bg-blue-400 active:bg-blue-400" onClick={onClick} disabled={loading}>
                    {loading?<Loader/> :"Submit"}
                </button>
            </div>
        </div>
    );
};

export default FeedbackForm;
