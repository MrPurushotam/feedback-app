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
  const [userFeedback, setUserFeedback] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading]=useState<boolean>(false);
  const start=useRef(0)
  const end=useRef(10)

  useEffect(() => {
    async function getData() {
      try {
        const resp = await axios.get(`http://localhost:4000/api/v1/feedback/review/specific/${start.current}/${end.current}`)
        setFeedbacks((prev) => prev ? [...prev, ...resp.data.feedbacks] : resp.data.feedbacks);
        fetch.current = false
        // eslint-disable-next-line 
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
    setLoading(true)
    try {
      const resp = await axios.post(`http://localhost:4000/api/v1/feedback/review`, {
        name: username,
        feedback: userFeedback
      })
      console.log(resp.data)
      // eslint-disable-next-line 
    } catch (error:any) {
      console.log("Error: ",error.message)
    }
    setLoading(false)
  }
  return (
    <div>
      <FeedbackForm onChange={(e) => setUserFeedback(e.target.value)} inputBoxValue={userFeedback} usernameBoxValue={username} onChangeName={(e) => setUsername(e.target.value)} onClick={submitFunction} loading={loading} question={"How are you today?"} />
      <h2 className='text-2xl font-semibold p-2 my-4 text-center'>Recent Feedbacks</h2>
      <div className='border-2 border-gray-700 w-2/3 mx-auto min-h-56'>
        <Table TableContent={feedbacks || []} />
      </div>
    </div>
  )
}

export default App
