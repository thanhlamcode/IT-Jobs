// const API_DOMAIN = "http://localhost:3002";
const API_DOMAIN = "https://database-tuyendung.onrender.com";

export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path);
  const results = await response.json();
  return results;
};

export const post = async (path, data) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const patch = async (path, id, data) => {
  const response = await fetch(`${API_DOMAIN}${path}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteApi = async (path, id) => {
  const response = await fetch(`${API_DOMAIN}${path}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
