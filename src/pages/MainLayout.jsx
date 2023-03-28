import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Layout, Menu, theme, Avatar, Button, Checkbox } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const MainLayout = () => {
  const { logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header>
        <a href="/mainLayout">
          <img
            className="logo"
            alt=""
            src="/FE-2-design_favicon.png"
            width="50"
            height="50"
          />
        </a>
        <div className="avatar-btn">
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
          <Button onClick={handleLogout} type="text" style={{ color: "#fff" }}>
            Log Out
          </Button>
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} />
      </Header>
      <div className="content-wrapper">
        <div className="filter-items">
          <Button type="primary" htmlType="submit" className="filter-btn">
            Clear all filters
          </Button>
          <Checkbox onChange={onChange}>Free rooms only</Checkbox>
        </div>
        <Content style={{ padding: "0 50px" }}>
          <div
            className="site-layout-content"
            style={{ background: colorBgContainer }}
          >
            Content
          </div>
        </Content>
      </div>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
};

export default MainLayout;
