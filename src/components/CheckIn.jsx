import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { checkInGuest } from "../redux/actions";
import { ref, set, onValue, get } from "firebase/database";
import FirebaseDB from "../firebase";
import { Modal, Input, Button, DatePicker } from "antd";

const db = FirebaseDB();

const CheckIn = () => {
  const dispatch = useDispatch();
  const [guestName, setGuestName] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [checkInDate, setCheckInDate] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [guestNameError, setGuestNameError] = useState("");
  const { key } = useParams();

  useEffect(() => {
    const guestRef = ref(db, `Rooms/${key}`);
    console.log("roomId:", key);

    const unsubscribe = onValue(guestRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("roomData:", data);
        setGuestName(data.guest);
        setIsCheckedIn(Boolean(data.isCheckedIn));
        setCheckInDate(data.checkInDate ? new Date(data.checkInDate) : null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [key]);

  const handleCheckIn = () => {
    if (!guestName) {
      setGuestNameError("Please enter the guest's name");
      return;
    }

    const roomRef = ref(db, `Rooms/${key}`);
    get(roomRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const roomData = snapshot.val();

          roomData.isCheckedIn = true;
          roomData.checkInDate = new Date().toDateString();
          roomData.guest = guestName;

          return set(roomRef, roomData);
        } else {
          console.log("Room does not exist");
          return Promise.reject();
        }
      })
      .then(() => {
        console.log("Check-in successful");
        dispatch(checkInGuest(guestName, true, checkInDate));
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.log("Error updating room:", error);
      });

    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setGuestName("");
    setCheckInDate("");
    setCheckOutDate("");
    setGuestNameError("");

    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" className="room-button" onClick={showModal}>
        Check In
      </Button>
      <Modal
        title="Check-In"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleCheckIn}>
            Check In
          </Button>,
        ]}
      >
        <label>
          <span style={{ color: "red" }}>*</span>
          Please enter the guest's name:
          <Input
            placeholder="Guest's Name"
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
          {guestNameError && (
            <div style={{ color: "red" }}>{guestNameError}</div>
          )}
        </label>
        <br />
        <div style={{ marginTop: "20px" }}>
          <label>
            Please enter the approximate date of guest checkout:
            <DatePicker
              value={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
            />
          </label>
        </div>
      </Modal>
    </>
  );
};

export default CheckIn;
