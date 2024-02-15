//import express, express router as shown in lecture code
import { Router } from 'express';
const router = Router();
import { registerUser, loginUser } from "../data/users.js";


router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: 'YOU SHOULD NOT BE HERE!' });
});

router
  .route('/register')
  .get(async (req, res) => {
    if (!req.session.login) {
      return res.render("register", { title: "Register" })
    }
    return res.redirect("/protected");
  })
  .post(async (req, res) => {
    let registrationUser = req.body;
    try {
      if ((typeof (registrationUser.firstNameInput) === undefined) || (typeof (registrationUser.lastNameInput) === undefined) || (typeof (registrationUser.emailAddressInput) === undefined) || (typeof (registrationUser.passwordInput) === undefined) || (typeof (registrationUser.roleInput) === undefined)) {
        throw "Error: Argument is not valid";
      }
      if ((typeof registrationUser.firstNameInput !== 'string' || (typeof registrationUser.lastNameInput !== 'string'))) {
        throw "Error: Argument is not a string.";
      }
      const nameValid = /^[a-zA-Z]{2,25}$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[^\s]{8,}$/;

      let firstNameInput = registrationUser.firstNameInput.trim();
      let lastNameInput = registrationUser.lastNameInput.trim();
      let emailAddressInput = registrationUser.emailAddressInput.trim();
      emailAddressInput = emailAddressInput.toLowerCase();
      let passwordInput = registrationUser.passwordInput.trim();
      let confirmPasswordInput = registrationUser.confirmPasswordInput.trim();
      let roleInput = registrationUser.roleInput.trim();
      if ((nameValid.test(firstNameInput) === false) || (nameValid.test(lastNameInput) === false)) {
        throw { code: 400, error: "Error: Invalid name." };
      }
      if (emailRegex.test(emailAddressInput) === false) {
        throw { code: 400, error: "Error: Invalid email." };
      }
      if (passwordValid.test(passwordInput) === false) {
        throw { code: 400, error: "Error: Invalid password." };
      }
      if (roleInput.toLowerCase() != "admin" && roleInput.toLowerCase() != "user") {
        throw { code: 400, error: "Error: Invalid role." };
      }
      if (registrationUser.passwordInput !== registrationUser.confirmPasswordInput) {
        throw { code: 400, error: "Error: Passwords do not match." };
      }
      let userCheck = await registerUser(registrationUser.firstNameInput, registrationUser.lastNameInput, registrationUser.emailAddressInput, registrationUser.passwordInput, registrationUser.roleInput);
      if (userCheck.insertedUser) {
        return res.redirect('/login');
      }
      else {
        return res.status(500).render('error: Could not register user');
      }
    }
    catch (e) {
      if (e.code) {
        return res.status(e.code).render('register', { errors: true, error: e.error })
      }
      return res.status(400).render('error');
    }
  });

router
  .route('/login')
  .get(async (req, res) => {
    return res.status(200).render("login")
  })
  .post(async (req, res) => {
    let registrationUser = req.body;
    try {
      if ((typeof (registrationUser.emailAddressInput) === undefined) || (typeof (registrationUser.passwordInput) === undefined)) {
        throw "Error: Argument is not valid";
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[^\s]{8,}$/;
      if (emailRegex.test(registrationUser.emailAddressInput) === false) {
        throw { code: 400, error: "Invalid email." };
      }
      if (passwordValid.test(registrationUser.passwordInput) === false) {
        throw { code: 400, error: "Invalid password." };
      }
      //logging in + storing info
      req.session.user = await loginUser(registrationUser.emailAddressInput, registrationUser.passwordInput);

      //create cookies
      res.cookie("AuthState", "authenticated");
      if (req.session.user.role === "admin") {
        return res.redirect("/admin");
      }
      return res.redirect('/protected');
    }
    catch (e) {
      if (e.code) {
        return res.status(e.code).render('login', { errors: true, error: e.error })
      }
      return res.status(500).render('error')
    }
  });

router.route('/protected').get(async (req, res) => {
  let time = new Date().toLocaleTimeString();
  let isAdmin = req.session.user && req.session.user.role === 'admin';
  return res.render("protected", { user: req.session.user, currentTime: time, isAdmin: isAdmin });
});

router.route('/admin').get(async (req, res) => {
  let time = new Date().toLocaleTimeString();
  return res.render("admin", { user: req.session.user, currentTime: time });
});

router.route('/error').get(async (req, res) => {
  return res.render("error", { code: req.session.code, error: req.session.error });
});

router.route('/logout').get(async (req, res) => {
  req.session.destroy();
  res.clearCookie('AuthState', '', { expires: new Date(0) });
  return res.render("logout");
});

export default router;
