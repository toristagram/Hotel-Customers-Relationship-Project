import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, theme, Avatar, Button } from "antd";
import FirebaseDB from "../firebase";
import { ref, onValue } from "firebase/database";
import "../sass/main.scss";

const db = FirebaseDB();

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(null);
  const [userImages, setUserImages] = useState({});

  const logOut = () => {
    localStorage.removeItem("authenticated");
    setAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("authenticated");
    if (loggedIn) {
      setAuthenticated(loggedIn);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const userRef = ref(db, "Accounts");
    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserImages(snapshot.val());
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const avatarImage = authenticated ? userImages[authenticated]?.image : null;

  return (
    <Layout>
      <Header>
        <Link to="/mainLayout">
          <img
            className="logo"
            alt="Logo"
            src="https://firebasestorage.googleapis.com/v0/b/hotel-da9e2.appspot.com/o/logo.svg?alt=media&token=6fc01e64-7f46-411a-a0b4-242e9fa3e6b6"
          />
        </Link>

        {authenticated && (
          <div className="avatar-btn">
            <Avatar src={avatarImage} alt="" />
            <Button onClick={logOut} type="text" style={{ color: "#fff" }}>
              Log Out
            </Button>
          </div>
        )}

        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} />
      </Header>

      <Content>
        <div className="content-wrapper">{children}</div>
      </Content>

      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
};

export default MainLayout;
