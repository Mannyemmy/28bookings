import api from "../Api";

export const register = async (
  first_name,
  last_name,
  email,
  password,
  phone,
  location
) => {
  const res = await api.post("/signup", {
    first_name,
    last_name,
    phone,
    email,
    password,
    location
  });
  return res;
};
export const login = async (username, password) => {
  var data = new FormData();
  data.append("username", username);
  data.append("password", password);
  try {
    const response = await api.post("/token", data);

    if (response.data.access_token) {
      localStorage.setItem("token", JSON.stringify(response.data.access_token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("id", JSON.stringify(response.data.user.id));
    }
    return response.data;
  } catch (error) {
    return error.response.data.detail;
  }
};
export const signout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("id");
  window.location.assign("/");
};
