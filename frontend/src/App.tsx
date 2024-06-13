import { useEffect, useState } from 'react'
import './App.css'
import FeedbackForm from './components/FeedbackForm'
import Table from './components/Table'
import axios from 'axios'

interface Feedback {
  name: string;
  feedback: string;
  date: Date;
}

function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[] | null> (null)
  const [userFeedback,setUserFeedback]=useState<string | null>(null);
  useEffect(()=>{
    async function getData(){
      const resp=await axios.get(`${String(import.meta.env.ENDPOINT)}/feedback/review/range/all`)
      setFeedbacks(resp.data.feedbacks)
    }

    getData()
    const interval=setInterval(getData,10000)

    return()=>clearInterval(interval)
  },[])

  const submitFunction=()=>{

  }
  return (
    <div>
      <FeedbackForm onChange={(e)=>setUserFeedback(e.target.value)} onClick={submitFunction} question={"How are you today?"}/>
      <Table TableContent={feedbacks || []}/>       
    </div>
  )
}

export default App
