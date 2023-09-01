import React, { useState } from "react";

import {
  Card,
  Modal,
  message,
  Input,
  Select,
  Button,
  Form,
  DatePicker,
  ColorPicker,
  Typography,
} from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore/lite";
import { firestore } from "../../config/firebase";
import ShowTask from "./ShowTask";
import { useAuthContext } from "../../context/AuthContext";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
export default function AddTask() {
  const [quill, setQuill] = useState("")
  const { user } = useAuthContext();
  const { Title } = Typography;
  const [color, setColor] = useState("#FFFF00");
  const [date, setDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addTodo, setAddTodo] = useState({});
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleDate = (_, date) => {
    setDate(date);
  };
  const handleFinsih = async (values) => {
    const { title, description, todoType } = values;
    //  const dob = date
    // const mycolor = color
    const todoId = Math.random().toString(36).slice(2);
    const todo = {
      title,
      description: quill,
      // description,
      todoType,
      date,
      color,
      id: todoId,
      createdBy: {
        email: user.createdBy.email,
        uid: user.createdBy.uid,
        fullname: user.fullname,
      },
    };

    try {
      setIsLoading(true);
      await setDoc(doc(firestore, "todos", todo.id), todo);
      setAddTodo(todo);
      message.success("Todo has been added successfully");
    } catch (error) {
      console.error(error);
      message.error("Something went wrong while adding Todo");
    }

    setIsLoading(false);
    setIsModalOpen(false);
  };
  const handleFinsihFailed = () => {
    message.error("Something went wrong while adding Todo");
  };

  return (
    <>
     
        <div className="container-fluid ">
          <div className="row  ">
            <div className="col ">
              <h1 className="mt-3 mb-4">Sticky wall</h1>

              <Card
                bordered={false}
                onClick={showModal}
                style={{
                  maxWidth: 250,
                  minHeight: 250,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "5px ",
                  backgroundColor: "#fefae0",
                  boxShadow: "0px 16px 48px 0px rgba(0, 0, 0, 0.176)",
                }}
                hoverable={true}
              >
                <AiOutlinePlus
                  style={{ fontSize: "50", fontWeight: "light" }}
                />
              </Card>
              <ShowTask addTodo={addTodo}  />
              <Modal
                open={isModalOpen}
                onCancel={() => {
                  setIsModalOpen(false);
                }}
                onOk={() => {
                  setIsModalOpen(false);
                }}
              >
                <Form
                  layout="vertical"
                  onFinish={handleFinsih}
                  onFinishFailed={handleFinsihFailed}
                >
                  <Title level={2}>Add TASK</Title>
                  <Form.Item
                    name="todoType"
                    rules={[
                      { required: true, message: "Please Select Category" },
                    ]}
                    hasFeedback
                  >
                    <Select
                      name="todoType"
                      className="text-center"
                      placeholder="Select Todo Category"
                    >
                      <Select.Option value="Personal">Personal</Select.Option>
                      <Select.Option value="Bussiness">Business</Select.Option>
                      <Select.Option value="List3">List 3</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="title"
                    rules={[
                      {
                        required: true,
                        min: 5,
                        message: "Title must contain atleast 5 characters",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input name="title" placeholder="Enter Title" />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    rules={[
                      {
                        required: true,
                        min: 10,
                        message:
                          "Description must contain atleast 10 characters",
                      },
                    ]}
                    hasFeedback
                  >
                    <ReactQuill theme="snow" name="description" value={quill} onChange={setQuill} />
                    {/* <Input.TextArea
                      name="description"
                      placeholder="Enter Description"
                    /> */}
                  </Form.Item>
                  <Form.Item
                    name="dob"
                    rules={[
                      {
                        required: true,
                        message:
                          "Description must contain atleast 10 characters",
                      },
                    ]}
                    hasFeedback
                  >
                    <DatePicker
                      name="dob"
                      placeholder="Select date"
                      className="w-100 text-center"
                      onChange={handleDate}
                    />
                  </Form.Item>
                  <Form.Item>
                    <ColorPicker
                      value={color}
                      onChange={(e, color) => {
                        setColor(color);
                      }}
                    />
                  </Form.Item>
                  <Form.Item className="text-center">
                    <Button
                      type="primary"
                      className="w-50"
                      loading={isLoading}
                      disabled={isLoading}
                      htmlType="submit"
                    >
                      Add Task
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
    </>
  );
}
