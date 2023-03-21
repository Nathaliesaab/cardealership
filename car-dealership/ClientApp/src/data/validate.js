import { orders } from "./orders";

const emailRegex =
  /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

export const validate = (email, password, name, nameRequired = false) => {
  if (!email) {
    return "Please enter email";
  } else if (emailRegex.test(email)) {
    return "Please enter a valid email";
  }

  if (!password) {
    return "Please enter password";
  } else if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  if (!name && nameRequired) {
    return "Please enter name";
  }
};

export const canPostReview = (carId, userId) => {
  return orders.find(
    (order) => order.carId === +carId && order.cusomerId === +userId
  );
};
