import axios from "axios";

const BASE_URL = "https://eacp.energyaustralia.com.au/codingtest/api/v1";

let cache = [];

export const fetchData = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/festivals`);
    if (res.data) {
      cache = res.data;
      return { data: res.data, error: null };
    }
    // Return the latest cache
    return { data: cache, error: null };
  } catch (error) {
    if (error.response.status === 429) {
      return {
        data: cache,
        error: "Too many requests, slow down!",
      };
    }

    return { data: cache, error: "There are some errors.." };
  }
};
