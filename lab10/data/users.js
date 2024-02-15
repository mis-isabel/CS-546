//import mongo collections, bcrypt and implement the following data functions

import { users } from '../config/mongoCollections.js';
import bcrypt from 'bcrypt';
const saltRounds = 2;


export const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  if ((typeof firstName === undefined) || (typeof lastName === undefined) || (typeof emailAddress === undefined) || (typeof password === undefined) || (typeof role === undefined)) {
    throw "Error: Argument is not valid";
  }
  if ((typeof firstName !== 'string' || (typeof lastName !== 'string'))) {
    throw "Error: Argument is not a string.";
  }
  const nameValid = /^[a-zA-Z]{2,25}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[^\s]{8,}$/;
  firstName = firstName.trim();
  lastName = lastName.trim();
  emailAddress = emailAddress.trim();
  emailAddress = emailAddress.toLowerCase();
  password = password.trim();
  role = role.trim();
  if ((nameValid.test(firstName) === false) || (nameValid.test(lastName) === false)) {
    throw { code: 400, error: "Invalid name." };
  }

  if (emailRegex.test(emailAddress) === false) {
    throw { code: 400, error: "Invalid email." };
  }

  if (passwordValid.test(password) === false) {
    throw { code: 400, error: "Invalid password." };
  }

  if ((role.toLowerCase() !== "admin") && (role.toLowerCase() !== "user")) {
    throw { code: 400, error: "Invalid role." };
  }

  const userList = await users();
  let findEmail = await userList.findOne({ emailAddress: emailAddress });
  if (findEmail) {
    throw {
      code: 400, error:
        "Error: Email already exists."
    }
  }
  let hashed = await bcrypt.hash(password, saltRounds);
  let newUser = {
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    password: hashed,
    role: role
  }
  let insertedUser = await userList.insertOne(newUser);
  if (!insertedUser.insertedCount === 0)
    throw {
      code: 500, error:
        "Could not create a new user."
    };
  return { insertedUser: true };
};

export const loginUser = async (emailAddress, password) => {
  if ((typeof emailAddress === undefined) || (typeof password === undefined)) {
    throw "Error: Argument is not valid";
  }
  emailAddress = emailAddress.trim();
  emailAddress = emailAddress.toLowerCase();
  password = password.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(emailAddress) === false) {
    throw { code: 400, error: "Error: Invalid email." };
  }
  const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[^\s]{8,}$/;
  if (passwordValid.test(password) === false) {
    throw { code: 400, error: "Error: Invalid password." };
  }
  let userList = await users();
  let findEmail = await userList.findOne({ emailAddress: emailAddress });
  if (!findEmail) {
    throw {
      code: 400, error:
        "Either the email address or password is invalid"
    }
  }
  let unhash = await bcrypt.compare(password, findEmail.password);
  if (!unhash) {
    throw {
      code: 400, error:
        "Either the email address or password is invalid"
    }
  }
  const noPass = {
    firstName: findEmail.firstName,
    lastName: findEmail.lastName,
    emailAddress: findEmail.emailAddress,
    role: findEmail.role
  }
  return noPass;
};
