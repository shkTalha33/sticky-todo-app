import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { firestore } from "../../../config/firebase";
import { useAuthContext } from "../../../context/AuthContext";
import Todo from "../../components/Todo";
export default function Upcoming() {
const [documents, setDocuments] = useState([])
const [isProcessing,setIsProcessing] = useState(false)
const {user} = useAuthContext()
const title = "Bussiness"

const getData = async() => {
  try {
    setIsProcessing(true)
    const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", user.createdBy.uid),where("todoType","==","Bussiness"));
    const querySnapshot = await getDocs(q);
    const array = []
querySnapshot.forEach((doc) => {
    const data  = doc.data()
    array.push(data)
});
setDocuments(array)

} catch (error) {
  console.error(error);
}
setIsProcessing(false)

}
useEffect(() => {
  getData();
 
  }, []);
  return (
    <>
       <Todo documents={documents} title={title} isProcessing={isProcessing}/>
    </>
  );
}
