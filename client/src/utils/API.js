import axios from "axios";

export const postSignUp = async (formValues) => {
  try {
    return await axios.post("/auth/signup", formValues);
  } catch (e) {
    throw new Error(e);
  }
}

export const postSignIn = async (formValues) => {
  try {
    return await axios.post("/auth/signin", formValues);
  } catch (e) {
    throw new Error(e);
  }
}

export const findUserById = async (userId) => {
  try {
    return await axios.get(`/users/${userId}`);
  } catch (e) {
    throw new Error(e);
  }
}

export const reserveSeat = async (formValues) => {
  try {
    // Needs date, chairId, userId
    return await axios.post("/api/occupy", formValues);

  } catch (e){
    console.error(`API Error: Could not reserve seat. \n ${e}`);
    throw new Error(e);
  }
}

export const getAvailableSeats = async ({companyId, date}) => {
  try{
    // needs date, companyId
    return await axios.get(`/api/chairs/available/${companyId}/${date}`);
  } catch (e){
    console.error(`API Error: Could not find available seats. \n ${e}`);
    throw new Error(e);
  }
}

export const getEmployeeDirectory = async ({companyId, date}) => {
  try{
    // needs date, companyId
    return await axios.get(`/api/users/directory/${companyId}/${date}`);
  } catch (e){
    console.error(`API Error: Could not find employee directory. \n ${e}`);
    throw new Error(e);
  }
}

export const doesUserHaveSeatDate = async ({date, userId}) => {
  try {
    // needs date, userId
    return await axios.get(`/api/occupy/${userId}/${date}`);
  } catch(e){
    console.error(`API Error: Could not get seats for ${userId} on ${date}.`)
    throw new Error(e)
  }
}

export const removeSeatDate = async({date, userId}) => {
  try{
    // needs date, userId
    const {data} = await doesUserHaveSeatDate({date, userId});
    return await axios.delete(`/api/occupy/${data.id}`);
  } catch (e){
    console.error(`API Error: Could not remove seats for ${userId} on ${date}.`)
    throw new Error(e);
  }
}

