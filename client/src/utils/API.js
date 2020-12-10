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
    return await axios.get(`/${companyId}/${date}`);
  } catch (e){
    console.error(`API Error: Could not find available seats. \n ${e}`);
    throw new Error(e);
  }
}
