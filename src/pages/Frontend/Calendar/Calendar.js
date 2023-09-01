import React,{useState} from 'react'
import { Divider,Form,DatePicker, Button, message } from 'antd'
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { firestore } from '../../../config/firebase';
import { useAuthContext } from '../../../context/AuthContext';
import Todo from '../../components/Todo';
export default function Calendar() {
    const initailState = {
        selectDate:"",
    }
    const {user} = useAuthContext()
    const [date, setDate] = useState(initailState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [documents, setDocuments] = useState([])
    const handleDate = (_,date) => {
      setDate(date)
    }
    const handleSubmit = async(values) => {
    console.log(date.selectDate)
       if (date.selectDate === "") {
        return  message.error("Please enter Date")
       }
       else{
        try {
            setIsProcessing(true)
            const q = query(collection(firestore, "todos"), where("date", "==", date),where("createdBy.uid","==",user.createdBy.uid));
            const querySnapshot = await getDocs(q);
            let array = []
               querySnapshot.forEach((doc) => {
                let data = doc.data()
                array.push(data)
           });
           setDocuments(array)
           } catch (error) {
             console.error(error);
          }
          setIsProcessing(false)
       }
    }
  return (
    <>
        <div className="container-fluid py-3">
            <div className="row">
                <h1 className='text-center mb-4'>Calender</h1>
                <div className="col">
                <Form onFinish={handleSubmit}>
                <Form.Item className='text-center' hasFeedback>
                   <DatePicker className='w-50 ' name='selectDate' style={{height:"50px"}}  placeholder='Enter Date' onChange={handleDate} />
                </Form.Item>
                <Form.Item className='text-center'>
                    <Button type='primary' htmlType='submit' loading={isProcessing} disabled={isProcessing} >Submit</Button>
                </Form.Item>
               </Form>
               <Divider />
               <Todo documents={documents} isProcessing={isProcessing} />
     
                </div>
            </div>
        </div>  
    </>
  )
}
