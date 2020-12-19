import axios from "axios";
axios.defaults.headers.get["Authorization"] = localStorage.getItem("token");

export const findUserById = async (userId) => {
  try {
    return await axios.get(`/users/${userId}`);
  } catch (e) {
    throw new Error(e);
  }
};

export const findUserByUsername = async (username) => {
  try {
    return await axios.get(`/api/users/username/${username}`);
  } catch (e) {
    console.error(`API Error: Failed to get user by username`);
    throw new Error(e);
  }
};

export const findCompanyById = async (companyId) => {
  try {
    return await axios.get(`/api/company/${companyId}`);
  } catch (e) {
    console.error(`API Error: Failed to get company by id ${companyId}\n ${e}`);
    throw new Error(e);
  }
};

export const getEmployeeDirectory = async ({ companyId }) => {
  try {
    // needs date, companyId
    return await axios.get(`/api/users/directory/${companyId}/`);
  } catch (e) {
    console.error(`API Error: Could not find employee directory. \n ${e}`);
    throw new Error(e);
  }
};

export const getAvailableSeats = async ({ companyId, date }) => {
  try {
    // needs date, companyId
    return await axios.get(`/api/chairs/available/${companyId}/${date}`);
  } catch (e) {
    console.error(`API Error: Could not find available seats. \n ${e}`);
    throw new Error(e);
  }
};

export const doesUserHaveSeatDate = async ({ date, userId }) => {
  try {
    // needs date, userId
    return await axios.get(`/api/occupy/hasSeat/${userId}/${date}`);
  } catch (e) {
    console.error(`API Error: Could not get seats for ${userId} on ${date}.`);
    throw new Error(e);
  }
};

export const getAllEmployeeSeats = async (userId) => {
  try {
    // needs userId
    return await axios.get(`/api/occupy/employee/${userId}`);
  } catch (e) {
    console.error(
      `API Error: Could not get employee seats for id: ${userId}\n ${e}`
    );
    throw new Error(e);
  }
};

export const getChairLocation = async (chairId) => {
  try {
    // needs chairId
    return await axios.get(`/api/chairs/location/${chairId}`);
  } catch (e) {
    console.error(
      `API Error: Could not get chair location by id: ${chairId}\n ${e}`
    );
    throw new Error(e);
  }
};

export const getUserInfoById = async (userId) => {
  try {
    // needs userId
    return await axios.get(`/api/users/${userId}`);
  } catch (e) {
    console.error(`API Error: Could not get user info by id: ${userId}\n ${e}`);
    throw new Error(e);
  }
};

export const postSignUp = async (formValues) => {
  try {
    return await axios.post("/auth/signup", formValues);
  } catch (e) {
    throw new Error(e);
  }
};

export const postSignIn = async (formValues) => {
  try {
    return await axios.post("/auth/signin", formValues);
  } catch (e) {
    throw new Error(e);
  }
};

export const addCompany = async (name) => {
  try {
    return await axios.post("/api/company", { name });
  } catch (e) {
    throw new Error(e);
  }
};

export const addRole = async (name) => {
  try {
    return await axios.post("/api/roles", { name });
  } catch (e) {
    throw new Error(e);
  }
};

export const getBuildings = async () => {
  try {
    return await axios.get("/api/building");
  } catch (e) {
    throw new Error(e);
  }
};

export const addBuilding = async (name, companyId) => {
  return axios.post("/api/building", { name, companyId });
};

export const addFloor = async (name, buildingId, deskCapacity, companyId) => {
  return axios.post("/api/floor", {
    name,
    buildingId,
    deskCapacity,
    companyId,
  });
};

export const addTable = async (name, floorId, chairCapacity) => {
  return axios.post("/api/desks", { name, floorId, chairCapacity });
};

export const addChair = async (name, deskId) => {
  return axios.post("/api/chairs", { name, deskId });
};

export const reserveSeat = async (formValues) => {
  try {
    // Needs date, chairId, userId
    return await axios.post("/api/occupy", formValues);
  } catch (e) {
    console.error(`API Error: Could not reserve seat. \n ${e}`);
    throw new Error(e);
  }
};

export const removeSeatDate = async ({ date, userId }) => {
  try {
    // needs date, userId
    const { data } = await doesUserHaveSeatDate({ date, userId });
    return await axios.delete(`/api/occupy/${data.id}`);
  } catch (e) {
    console.error(
      `API Error: Could not remove seats for ${userId} on ${date}.`
    );
    throw new Error(e);
  }
};

export const getCompanyAndUserData = async (username) => {
  let roleName = "";
  let companyName = "";
  let companyId = "";
  let userId = "";
  let reservations = [];
  await axios.get(`/api/users/username/${username}`).then(async ({ data }) => {
    userId = data.id;
    await axios
      .all([
        axios.get(`/api/roles/${data.roleId}`),
        axios.get(`/api/company/${data.companyId}`),
        axios.get(`/api/occupy/employee/${data.id}`),
      ])
      .then((res) => {
        roleName = res[0].data.name;
        companyName = res[1].data.name;
        companyId = res[1].data.id;
        reservations.push(res[2].data);
      });
  });
  return { userId, roleName, companyName, reservations, companyId };
};

export const getReservationData = async (chairId) => {
  let building = "";
  let floor = "";
  let desk = "";
  let seat = "";
  await axios.get(`/api/chairs/${chairId}`).then(async ({ data }) => {
    seat = data.name;
    await axios.get(`/api/desks/${data.deskId}`).then(async ({ data }) => {
      desk = data.name;
      await axios.get(`/api/floor/${data.floorId}`).then(async ({ data }) => {
        floor = data.name;
        await axios.get(`/api/building/${data.buildingId}`).then(({ data }) => {
          building = data.name;
        });
      });
    });
  });
  return { building, floor, desk, seat };
};
