export const post_review = async (review,token) => {
  try {
    const response = await fetch("/api/review/postreview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.replace(/"/g, "")}`,
      },
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
