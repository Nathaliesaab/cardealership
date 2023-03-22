export const register = async (user) => {
  try {
    const response = await fetch("/api/customer/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.status === 400) {
      return [null, "Customer with this email already exist"];
    }
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

export const sign_in = async (credentials) => {
  try {
    const response = await fetch("/api/customer/authenticate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const tokens = await response.json();
    if (response.ok) {
      localStorage.setItem("jwt", JSON.stringify(tokens.jwtToken));
      return [tokens, null];
    } else {
      return ["Login failed, invalid credentials", null];
    }
  } catch (err) {
    return [null, err];
  }
};


export const customer_saved_cars = async (id, token) => {
  try {
    const response = await fetch(`/api/favourite/customerfavourite/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.replace(/"/g, "")}`,
      },
    }).then((result) => {
      return result.json();
    });
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

export const favourite_car = async (details, token) => {
  try {
    const response = await fetch("/api/favourite/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.replace(/"/g, "")}`,
      },
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

export const unfavourite_car = async (details, token) => {
  try {
    const response = await fetch("/api/favourite/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.replace(/"/g, "")}`,
      },
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
