export const filterGroupEvent = (eventArray) => {
  return eventArray.filter((event) => {
    if (event.isgroupallowed) {
      return event;
    }
  });
};
export const groupEventId = (eventArr) => {
  return eventArr.map((eve) => {
    return eve._id;
  });
};
export const grpEveIdToRegister = (totalEve, userHadRegistered) => {
  return totalEve.filter((eve) => {
    if (userHadRegistered.indexOf(eve) !== -1) {
    } else {
      return eve;
    }
  });
};
export const findCurrentDetails = (id, data) => {
  return data.filter((eve) => {
    if (eve._id == id) {
      return eve;
    }
  });
};
