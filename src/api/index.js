import axios from 'axios';

const api = () => {
  const config = {
    baseURL: 'https://api.github.com',
    headers: {
      "Content-type": "application/json",
      Accept: "application/vnd.github.v3+json",
    }
  }

  const apiConfig = axios.create(config)

  return apiConfig
}

export default api;