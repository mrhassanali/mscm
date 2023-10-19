import React from "react";

export const sendData = (path, data) => {
  fetch(`http://localhost:3000/api/${path}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

// Update the Record
export const updateData = (path,data) => {
  console.log(data);
  let id = data.id;
 // console.log(JSON.stringify(userData));
//  fetch(`http://localhost:3000/api/${path}/:id`, {
  fetch(`http://localhost:3000/api/${path}/${id}`, {
  method: "PATCH",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  mode: "cors",
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
};
   
// received data using fetch api
export const receivedData = async (path) => {
  let response = await fetch(`http://localhost:3000/api/${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    mode: "cors",
  });
  let data = await response.json();
  return data;
};

// Search data using fetch api
export const searchData = async (path, id) => {
  let response = await fetch(`http://localhost:3000/api/${path}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    mode: "cors",
  });
  let data = await response.json();
  return data;
};


// Search data using fetch api
export function allUsers() {
  return fetch("http://localhost:3000/api/allusers")
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}


