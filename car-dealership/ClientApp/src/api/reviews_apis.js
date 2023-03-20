//GET JWT Token from local storage to added as authorization for needed request
const token = localStorage.getItem("jwt");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token?.replace(/"/g, "")}`,
};

// POST REQUEST to allow customer to save a car
export const post_review = async (review) => {
  try {
    const response = await fetch("/api/review/postreview", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(review),
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

//localhost:44396/api/review/carreviews/3

export const car_reviews = async (carId) => {
  try {
    const response = await fetch(`/api/review/carreviews/${carId}`, {
      method: "GET",
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