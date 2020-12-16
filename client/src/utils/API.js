import axios from "axios";

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

export const findUserById = async (userId) => {
  try {
    return await axios.get(`/users/${userId}`);
  } catch (e) {
    throw new Error(e);
  }
}

export const findUserByUsername = async (username) => {
  try {
    return await axios.get(`/api/users/username/${username}`)
  } catch (e){
    console.error(`API Error: Failed to get user by username`);
    throw new Error(e);
  }
}

export const findCompanyById = async (companyId) => {
  try {
    return await axios.get(`/api/company/${companyId}`)
  } catch (e) {
    console.error(`API Error: Failed to get company by id ${companyId}\n ${e}`)
    throw new Error(e);
  }
}
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

export const reserveSeat = async (formValues) => {
  try {
    // Needs date, chairId, userId
    return await axios.post("/api/occupy", formValues);
  } catch (e) {
    console.error(`API Error: Could not reserve seat. \n ${e}`);
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

export const getEmployeeDirectory = async ({companyId}) => {
  try{
    // needs date, companyId
    return await axios.get(`/api/users/directory/${companyId}/`);
  } catch (e){
    console.error(`API Error: Could not find employee directory. \n ${e}`);
    throw new Error(e);
  }
}

export const doesUserHaveSeatDate = async ({date, userId}) => {
  try {
    // needs date, userId
    return await axios.get(`/api/occupy/hasSeat/${userId}/${date}`);
  } catch (e) {
    console.error(`API Error: Could not get seats for ${userId} on ${date}.`);
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
  let userId = "";
  let reservations = [];
  await axios.get(`/api/users/username/${username}`).then(async ({ data }) => {
    userId = data.id;
    await axios
      .all([
        axios.get(`/api/roles/${data.roleId}`),
        axios.get(`/api/company/${data.companyId}`),
        axios.get(`/api/occupy/employee/${data.id}`)
      ])
      .then((res) => {
        roleName = res[0].data.name;
        companyName = res[1].data.name;
        reservations.push(res[2].data);
      });
  });
  return { userId, roleName, companyName, reservations };
};

export const getReservationData = async (chairId) => {
  let building = "";
  let floor = "";
  let desk = "";
  let seat = "";
  await axios
    .get(`/api/chairs/${chairId}`)
    .then(async ({ data }) => {
      seat = data.name;
      await axios.get(`/api/desks/${data.deskId}`).then(async ({ data }) => {
        desk = data.name;
        await axios
          .get(`/api/floor/${data.floorId}`)
          .then(async ({ data }) => {
            floor = data.name;
            await axios
              .get(`/api/building/${data.buildingId}`)
              .then(({ data }) => {
                building = data.name;
              });
          });
      });
    });
  return { building, floor, desk, seat };
};
