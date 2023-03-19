//POST REQUEST TO CREATE NEW ACCOUNT
export const register = async (user) => {
  try {
    const response = await fetch("/api/customer/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.status == 400) {
      return ["Customer with this email already exist", null];
    }
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

//POST REQUEST TO SIGN IN
export const sign_in = async (credentials) => {
  try {
    const res = await fetch("/api/customer/authenticate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const resp = await res.json();
    if (res.ok) {
      localStorage.setItem("jwt", JSON.stringify(resp.jwtToken));
      return [resp, null];
    } else {
      return ["Login failed, invalid credentials", null];
    }
  } catch (err) {
    return [null, err];
  }
};

//GET JWT Token from local storage to added as authorization for needed request
const token = localStorage.getItem("jwt");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token?.replace(/"/g, "")}`,
};

// API GET REQUEST to retreive all cars saved by customer
export const customer_saved_cars = async (id) => {
  try {
    const response = await fetch(`/api/favourite/customerfavourite/${id}`, {
      headers: headers,
    }).then((result) => {
      return result.json();
    });
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

// POST REQUEST to allow customer to save a car
export const favourite_car = async (details) => {
  try {
    const response = await fetch("/api/favourite/save", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(details),
    })
      .then((result) => result.json())
      .then((res) => {
        return res;
      });
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

// POST REQUEST to allow customer to unsave a car
export const unfavourite_car = async (details) => {
  try {
    const response = await fetch("/api/favourite/remove", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(details),
    })
      .then((result) => result.json())
      .then((res) => {
        return res;
      });
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};
