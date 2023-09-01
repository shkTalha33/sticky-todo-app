import React from 'react'
import { Card ,Divider} from "antd";
import dayjs from 'dayjs';
export default function todo({documents,title,isProcessing}) {
  return (
    <>
    {isProcessing ? 
      <div className='loader' >
        <div className="spinner-border text-info spinner-border-lg fw-100 "  style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
      </div>
      :
    
      <div className="container-fluid">
      <div className="row d-flex flex-direction-row">
        <h1 className='mt-3 mb-4  '  >{title}</h1>
        {documents.map((doc,index)=>{
      return <Card
      key={index}
      style={{maxWidth:250,minHeight:250,margin:"10px 0px 10px 5px",cursor:"pointer",backgroundColor:doc.color,position:"relative",display:"flex",flexDirection:"column"}}
      hoverable={true}
      >
        <h3 className='text-center '>{doc.todoType}</h3>
        <Divider className='mt-0' />
        <h5 className='title'>{doc.title}</h5>
        {/* <p className='desc'>{doc.description}</p> */}
        <p className='desc' dangerouslySetInnerHTML={{__html:doc.description}}></p>
        <strong style={{position:"absolute",bottom:10}}>Date: {doc.date ? dayjs(doc.date).format("DD-MM-YY"):""}</strong>
           
      </Card>
        })}
        </div>
      </div>
}
    </>
  )
}
