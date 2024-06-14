import { useEffect, useState, useRef } from 'react'
import './App.css'
import FeedbackForm from './components/FeedbackForm'
import Table from './components/Table'
import axios from 'axios'

interface Feedback {
  name: string;
  feedback: string;
  time: Date;
}

function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[] | null>(null)
  const fetch = useRef(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userFeedback, setUserFeedback] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  
  useEffect(() => {
    async function getData() {
      try {
        const resp = await axios.get(`http://localhost:4000/api/v1/feedback/review/all`)
        setFeedbacks(resp.data.feedbacks)
        fetch.current = false
      } catch (error: any) {
        console.log("Error: ", error.message)
      }
    }
    if(fetch.current){
      getData()
    }
  }, [])

  const submitFunction = async () => {
    console.log(userFeedback)
    try {
      const resp = await axios.post(`http://localhost:4000/api/v1/feedback/review`, {
          name: username,
          feedback: userFeedback
        })
      console.log(resp.data)
    } catch (error:any) {
      console.log("Error: ",error.message)
    }
  }
  return (
    <div>
      <FeedbackForm onChange={(e) => setUserFeedback(e.target.value)} inputBoxValue={userFeedback} usernameBoxValue={username} onChangeName={(e) => setUsername(e.target.value)} onClick={submitFunction} question={"How are you today?"} />
      <Table TableContent={feedbacks || []} />
    </div>
  )
}

export default App
