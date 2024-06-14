import React from 'react';
import TextareaAutosize from "react-textarea-autosize"

interface FeedbackFormInterface {
    question: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    inputBoxValue: string | null;
    usernameBoxValue: string | null;
}

const FeedbackForm: React.FC<FeedbackFormInterface> = ({
    question,
    onChange,
    onChangeName,
    onClick,
    inputBoxValue,
    usernameBoxValue,
}) => {
    return (
        <div>
            <div className="">
                <p className="question text-2xl text-gray-900 block">{question}</p>
                <input className="" type="text" onChange={onChangeName} required={true} placeholder="Username" value={usernameBoxValue || ''} />
                <span className=''>Feedback</span>
                <TextareaAutosize autoFocus onChange={onChange} required={true} placeholder='Feedback' value={inputBoxValue || ''} />
                
                <button className="" onClick={onClick}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default FeedbackForm;
