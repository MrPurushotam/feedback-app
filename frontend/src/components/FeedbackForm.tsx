import React from 'react'

interface FeedbackFormInterface{
    question:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void,
}
const FeedbackForm:React.FC<FeedbackFormInterface>= ({question,onChange,onClick}) => {
  return (
    <div>
      <div className={""}>
        <p className='question text-2xl text-gray-900 block'>{question}</p>
        <input className='' type='text' onChange={onChange} required={true}  />
        <button className='' onClick={onClick}>Submit</button>
      </div>
    </div>
  )
}

export default FeedbackForm
