import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { checkOutGuest } from "../redux/actions";
import { ref, set, onValue, get } from "firebase/database";
import FirebaseDB from "../firebase";
import { Modal, Button } from "antd";

const db = FirebaseDB();
const { confirm } = Modal;

const CheckOut = () => {
  const dispatch = useDispatch();
  const [guestName, setGuestName] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [roomNumber, setRoomNumber] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { key } = useParams();

  useEffect(() => {
    const roomRef = ref(db, `Rooms/${key}`);
    console.log("roomId:", key);

    const unsubscribe = onValue(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("roomData:", data);
        setGuestName(data.guest);
        setRoomNumber(data.number);
        setIsCheckedIn(Boolean(data.isCheckedIn));
        setCheckInDate(data.checkInDate ? new Date(data.checkInDate) : null);
      } else {
        console.log("Room does not exist");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [key]);

  const handleCheckOut = () => {
    const roomRef = ref(db, `Rooms/${key}`);

    get(roomRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const roomData = snapshot.val();

          roomData.isCheckedIn = false;
          roomData.checkInDate = null;
          roomData.guest = "";

          return set(roomRef, roomData);
        } else {
          console.log("Room does not exist");
          return Promise.reject();
        }
      })
      .then(() => {
        console.log("Check-out successful");
        dispatch(
          checkOutGuest(guestName, roomNumber, isCheckedIn, checkInDate)
        );
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.log("Error updating room:", error);
      });

    setIsModalVisible(false);
  };

  const showConfirm = () => {
    confirm({
      title: "Check Out",
      content: `Do you confirm the check out of Room ${roomNumber}?`,
      onCancel: () => {
        setGuestName("");
      },
      okText: "Confirm",
      onOk: handleCheckOut,
    });
  };
  return (
    <>
      <Button type="primary" className="room-button" onClick={showConfirm}>
        Check Out
      </Button>
    </>
  );
};

export default CheckOut;
