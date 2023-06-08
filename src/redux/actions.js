export const checkInGuest = (guestName, roomNumber, isCheckedIn, checkInDate, checkOutDate) => {
    return {
      type: 'CHECK_IN_GUEST',
      payload: {
        guestName,
        roomNumber,
        isCheckedIn,
        checkInDate,
        checkOutDate
      },
    };
  };
  
  export const checkOutGuest = (guestName, roomNumber, isCheckedIn, checkInDate) => {
    return {
      type: 'CHECK_OUT_GUEST',
      payload: {
        guestName,
        roomNumber,
        isCheckedIn,
        checkInDate,
      },
    };
  };