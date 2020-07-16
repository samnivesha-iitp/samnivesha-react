const adminWorker = () => {
  self.onmessage = ({ data: { data, name, id } }) => {
    let filteredData;
    switch (name) {
      case "soloEvent":
        filteredData = FilterSoloEvent(data, id);
        break;
      case "grpEvent":
        filteredData = FilterGroupEvent(data);
        break;
      default:
        filteredData = AdminDataApi(data);
        break;
    }
    self.postMessage(filteredData);
  };
  function AdminDataApi(data) {
    const mockdata = data;
    mockdata.map((user) => {
      user.fullName = user.firstName + " " + user.lastName;
      delete user.firstName;
      delete user.lastName;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.resetPasswordExpires;
      delete user.resetPasswordToken;
      delete user.__v;
      delete user.email;
      if (user.events.length > 0) {
        user.event = "";
        for (let i = 0; i < user.events.length; i++) {
          user.event = user.event + user.events[i].eventName + ",";
        }
        delete user.events;
      } else {
        user.event = "";
        delete user.events;
      }
    });
    return mockdata;
  }

  function FilterGroupEvent(data) {
    const mockData = data;
    mockData.map((user) => {
      delete user.event;
      delete user.__v;
      delete user.createdAt;
      delete user.updatedAt;
      const { firstName, lastName, mobileNumber, username } = user.groupleader;
      user.fullName = firstName + " " + lastName;
      user.contact = mobileNumber;
      user.username = username;
      if (user.groupmembers.length > 0) {
        user.groups = "";
        for (let i = 0; i < user.groupmembers.length; i++) {
          user.groups = user.groups + user.groupmembers[i] + ",";
        }
        delete user.groupmembers;
      } else {
        user.groups = "";
        delete user.groupmembers;
      }
    });
    return mockData;
  }
  function FilterSoloEvent(data, id) {
    let mockData = data;
    mockData = mockData.filter((user) => {
      user.fullName = user.firstName + " " + user.lastName;
      delete user.firstName;
      delete user.lastName;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.resetPasswordExpires;
      delete user.resetPasswordToken;
      delete user.__v;
      delete user.email;
      if (user.events.length > 0) {
        for (let i = 0; i < user.events.length; i++) {
          if (user.events[i]._id == id) {
            return user;
          }
        }
        delete user.events;
      } else {
        delete user.events;
      }
    });
    return mockData;
  }
};

let code = adminWorker.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);
export default worker_script;
