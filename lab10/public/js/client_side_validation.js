// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

if (document.getElementById('registration-form')) {
    const registrationForm = document.getElementById('registration-form');
    registrationForm.addEventListener('submit', (event) => {
        // error checking
        try {
            let firstName = document.getElementById("firstNameInput").value;
            if (typeof firstName === undefined) {
                throw "Error: firstName undefined"
            }
            if (typeof firstName !== 'string') {
                throw "Error: firstName must be a string"
            }
            firstName = firstName.trim();
            const nameValid = /^[a-zA-Z]{2,25}$/;
            if (nameValid.test(firstName) === false) {
                throw { code: 400, error: "Invalid name" };
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
        try {
            let lastName = document.getElementById("lastNameInput").value;
            if (typeof lastName === undefined) {
                throw "Error: lastName undefined"
            }
            if (typeof lastName !== 'string') {
                throw "Error: lastName must be a string"
            }
            lastName = lastName.trim();
            const nameValid = /^[a-zA-Z]{2,25}$/;
            if (nameValid.test(lastName) === false) {
                throw { code: 400, error: "Invalid name" };
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
        try {
            let emailAddress = document.getElementById("emailAddressInput").value;
            if (typeof emailAddress === undefined) {
                throw "Error: emailAddress undefined"
            }
            else if (typeof emailAddress !== 'string') {
                throw "Error: emailAddress must be a string"
            }
            emailAddress = emailAddress.trim().toLowerCase();
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (emailRegex.test(emailAddress) === false) {
                throw { code: 400, error: "Invalid email" };
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
        try {
            let password = document.getElementById("passwordInput").value;
            if (typeof password === undefined) {
                throw "Error: password undefined"
            }
            else if (typeof password !== 'string') {
                throw "Error: password must be a string"
            }
            password = password.trim();
            const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[^\s]{8,}$/;
            if (passwordValid.test(password) === false) {
                throw { code: 400, error: "Invalid password" };
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
        try {
            let password = document.getElementById("confirmPasswordInput").value;
            if (typeof password === undefined) {
                throw "Error: password undefined"
            }
            else if (typeof password !== 'string') {
                throw "Error: password must be a string"
            }
            password = password.trim();
            const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[^\s]{8,}$/;
            if (passwordValid.test(password) === false) {
                throw { code: 400, error: "Invalid password" };
            }
            if (document.getElementById("passwordInput").value !== password) {
                errors.push("Passwords do not match")
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
        try {
            let role = document.getElementById("roleInput").value;
            if (typeof role === undefined) {
                throw "Error: role undefined"
            }
            else if (typeof role !== 'string') {
                throw "Error: role must be a string"
            }
            role = role.trim().toLowerCase();
            if (role === '') {
                throw "Error: role is empty"
            }
            if (role !== 'admin' && role !== 'user') {
                throw "Error: invalid role"
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
    });
}

if (document.getElementById('login-form')) {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (event) => {
        try {
            let emailAddress = document.getElementById("emailAddressInput").value;
            if (typeof emailAddress === undefined) {
                throw "Error: emailAddress undefined"
            }
            else if (typeof emailAddress !== 'string') {
                throw "Error: emailAddress must be a string"
            }
            emailAddress = emailAddress.trim().toLowerCase();
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (emailRegex.test(emailAddress) === false) {
                throw { code: 400, error: "Invalid email" };
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
        try {
            let password = document.getElementById("passwordInput").value;
            if (typeof password === undefined) {
                throw "Error: password undefined"
            }
            else if (typeof password !== 'string') {
                throw "Error: password must be a string"
            }
            password = password.trim();
            const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[^\s]{8,}$/;
            if (passwordValid.test(password) === false) {
                throw { code: 400, error: "Invalid password" };
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).render('register', { errors: true, error: e.error })
            }
            return res.status(400).render('error');
        }
    });
}
