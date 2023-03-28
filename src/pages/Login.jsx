import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import { LOGIN } from "../redux/actions/usersActions";
import { useDispatch } from "react-redux";
import "antd/dist/reset.css";
import "../sass/main.scss";

function Login() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = userData;
    try{
      const response = await dispatch(LOGIN(username, password));
      if (response === 'success') {
        setError("");
        if (rememberMe) {
          localStorage.setItem("username", userData.username);
          localStorage.setItem("password", userData.password);
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
        }
        navigate("/mainLayout");
      } else {
        setError("Invalid username or password");
        errorMessage();
      }
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      errorMessage();
    }
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "Invalid username or password",
    });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="loginFormContainer">
      <div className="loginForm">
        <header className="loginFormTitle">
          <h3 style={{ fontWeight: "550" }}>Authentication</h3>
        </header>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 19,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            labelCol={{ span: 4 }}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              onChange={handleInputChange}
              value={userData.username}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            labelCol={{ span: 4 }}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              onChange={handleInputChange}
              value={userData.password}
            />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              span: 16,
            }}
          >
            <Checkbox
              defaultChecked={rememberMe}
              onChange={handleRememberMeChange}
            >
              Remember me
            </Checkbox>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 16,
              offset: 8,
            }}
          >
            {contextHolder}
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
