import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import "antd/dist/reset.css";
import "../sass/main.scss";

const Signin = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("authenticated") || null
  );

  const users = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" },
  ];

  const handleSubmit = (values) => {
    const account = users.find((user) => user.username === username);
    if (account && account.password === password) {
      setAuthenticated(account.username);
      localStorage.setItem("authenticated", account.username);
      navigate("/mainLayout");
    } else {
      messageApi.open({
        type: "error",
        content: "Wrong username or password",
      });
    }
  };

  return (
    <div>
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
            onFinish={handleSubmit}
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 16,
                offset: 8,
              }}
            >
              {contextHolder}
              <Button type="primary" htmlType="submit">
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
