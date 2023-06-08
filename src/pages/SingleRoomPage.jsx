import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import CheckIn from "../components/CheckIn";
import CheckOut from "../components/CheckOut";
import FirebaseDB from "../firebase";
import { ref, onValue } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Carousel,
  Descriptions,
  Row,
  Col,
  List,
  Typography,
} from "antd";
import { HomeOutlined, CheckOutlined } from "@ant-design/icons";
import "../sass/main.scss";

const db = FirebaseDB();

const contentStyle = {
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const SingleRoomPage = () => {
  const navigate = useNavigate();
  const { key } = useParams();
  const goBack = () => {
    navigate(-1);
  };

  const [roomData, setRoomData] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const roomRef = ref(db, `Rooms/${key}`);
    console.log("roomId:", key);

    const unsubscribe = onValue(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("roomData:", data);
        setRoomData(data);
        if (data.gallery) {
          setGalleryImages(data.gallery);
        }
      } else {
        console.log("Room does not exist");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [key]);

  console.log("roomData:", roomData);
  console.log("galleryImages:", galleryImages);

  if (roomData === null) {
    return null;
  }

  return (
    <MainLayout>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Button type="link" onClick={goBack} style={{ fontSize: '18px'}}>
            <HomeOutlined />
            &nbsp; Back Home
          </Button>
        </Col>
        <Col span={12}>
          <Carousel autoplay>
            {galleryImages.map((imageUrl) => (
              <div key={imageUrl} style={contentStyle}>
                <img src={imageUrl} alt="Room" style={{ maxWidth: '100%', height: 'auto' }}/>
              </div>
            ))}
          </Carousel>
        </Col>
        <Col span={12}>
        <Row justify="space-between">
          <Col>
            <Typography.Title
              level={2}
              underline
            >{`Room ${roomData.number}`}</Typography.Title>
          </Col>
          <Col>
            <CheckIn />
            <CheckOut />
          </Col>
        </Row>
        <Row>
            <Col span={12}>
              <Descriptions
                className="custom-labels"
                column={1}
              >
                <Descriptions.Item label="Type">{roomData.type}</Descriptions.Item>
                <Descriptions.Item label="Occupancy">{roomData.occupancy}</Descriptions.Item>
                <Descriptions.Item label="Price">{`${roomData.price}$`}</Descriptions.Item>
                <Descriptions.Item label="Guest">{roomData.guest}</Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={12}>
              <Descriptions
                layout="vertical"
                className="custom-labels"
              >
                <Descriptions.Item label="Features">
                  <List
                    size="small"
                    dataSource={roomData.features}
                    renderItem={(item) => (
                      <List.Item>
                        <CheckOutlined />
                        &nbsp;
                        {item}
                      </List.Item>
                    )}
                  />
                </Descriptions.Item>
              </Descriptions>
            </Col>
            </Row>
        </Col>
        <Col span={24}>
          <Descriptions className="custom-labels" column={2}>
            <Descriptions.Item label="Description">{roomData.description}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default SingleRoomPage;
