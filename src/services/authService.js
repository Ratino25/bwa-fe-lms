import apiInstance from "../utils/axios";

export const postSignUP = async (data) => apiInstance.post("/sign-up", data).then((res) => res.data)

