import { Axios, AxiosError } from "axios";
import { getBackendHostname } from "@/helpers/hostname";
import { getAuthToken } from "@/helpers/token";

const baseURL = `${getBackendHostname() ?? ""}/api`;

const axios = new Axios({
  baseURL,
});

axios.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else if (typeof config.data === "object") {
    config.data = JSON.stringify(config.data);
    config.headers["Content-Type"] = "application/json";
  }

  if (!config.headers["Authorization"]) {
    config.headers["Authorization"] = `Bearer ${getAuthToken()}`;
  }

  return config;
});

axios.interceptors.response.use((response) => {
  if (
    typeof response.data === "string" &&
    ["{", "["].includes(response.data[0]) &&
    ["}", "]"].includes(response.data[response.data.length - 1])
  ) {
    try {
      response.data = JSON.parse(response.data);
      response.headers["Content-Type"] = "application/json";
    } catch (err) {
      console.error(err);
    }
  }

  if (response.status >= 400) {
    throw new AxiosError(
      "Unsuccessful request",
      response.status.toString(),
      response.config,
      response.request,
      response,
    );
  }

  return response;
});

export default axios;
