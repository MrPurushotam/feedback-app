import { useEffect, useState, useRef } from 'react'
import './App.css'
import FeedbackForm from './components/FeedbackForm'
import Table from './components/Table'
import axios from 'axios'
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/light.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './components/Loader'

interface Feedback {
  name: string;
  feedback: string;
  time: Date;
}
toastConfig({theme:'light',clickClosable:true,position:'top-right',duration:4000})
function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[] | null>(null)
  const [userFeedback, setUserFeedback] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading]=useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const start=useRef(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const limit= 10
  const [hasMore, setHasMore]=useState<boolean>(true)

  function ValidForPost(){
    if(!(username?.trim())|| !(userFeedback?.trim())){
      return false
    }
    return true;
  }

  async function getData() {
    try {
      const resp = await axios.get(`http://localhost:4000/api/v1/feedback/review/specific/${start.current}/${start.current+10}`)
      if(resp.data.success){
        setFeedbacks((prev) => prev ? [...prev, ...resp.data.feedbacks] : resp.data.feedbacks);
        setHasMore(resp.data.feedbacks.length === limit);
        start.current+=limit;
        toast(resp.data.message)
      }else{
        toast(resp.data.message)
      }
      // eslint-disable-next-line 
    } catch (error: any) {
      console.log("Error: ", error.message)
      toast(error.message)
    }
  }


  useEffect(() => {
      getData()
      const interval=setInterval(()=>{setHasMore(true);console.log("40 done")},40*60*100)
      return()=>clearInterval(interval)
    }, [])
  
  const submitFunction = async () => {
    const check:boolean=ValidForPost()
    if(check){
      setLoading(true)
      try {
        const resp = await axios.post(`http://localhost:4000/api/v1/feedback/review`, {
          name: username?.trim(),
          feedback: userFeedback?.trim()
        })
        if(resp.data.success){
          setUserFeedback(null)
          toast(resp.data.message)
        }
        // eslint-disable-next-line 
      } catch (error:any) {
        console.log("Error: ",error.message)
        toast(error.message)
      }
      setLoading(false)
    }else{
      toast("Input fields can't be empty.")
    }
  }
  return (
    <div>
      <FeedbackForm onChange={(e) => setUserFeedback(e.target.value)} inputBoxValue={userFeedback} usernameBoxValue={username} onChangeName={(e) => setUsername(e.target.value)} onClick={submitFunction} loading={loading} question={"How are you today?"} />
      <h2 className='text-2xl font-semibold p-2 my-4 text-center'>Recent Feedbacks</h2>
      <div className='border-2 border-gray-700 w-2/3 mx-auto min-h-56 max-h-70 overflow-auto'>
      <InfiniteScroll
          dataLength={feedbacks?.length || 0}
          next={getData}
          hasMore={hasMore}
          loader={<Loader/>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Table TableContent={feedbacks || []} />
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default App
