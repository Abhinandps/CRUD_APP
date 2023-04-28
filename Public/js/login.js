/* eslint-disable */

const errorElement = document.querySelector('#errorElement');

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/user/login',
      data: {
        email,
        password,
      },
    });
    errorElement.textContent = '';
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    errorElement.textContent = err.response.data.message;
  }
};

const adminLogin = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/admin/login',
      data: {
        email,
        password,
      },
    });
    errorElement.textContent = '';
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    errorElement.textContent = err.response.data.message;
  }
};

const signup = async (email, password, firstName, lastName, phone) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/user/signup',
      data: {
        email,
        password,
        firstName,
        lastName,
        phone,
      },
    });
    errorElement.textContent = '';
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/login');
      }, 1500);
    }
  } catch (err) {
    errorElement.textContent = `All fields are required`;
  }
};

const createUser = async (email, password, firstName, lastName, phone) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/admin/addUser',
      data: {
        email,
        password,
        firstName,
        lastName,
        phone,
      },
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        alert('User Created Successfully');
        // location.reload(true)
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    console.log(err);
  }
};

const logout = async () => {
  try {
    const result = window.confirm('Are you sure you want to logout ?');
    if (result) {
      const res = await axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/api/v1/user/logout',
      });
      if ((res.data.status = 'success')) location.reload(true);
    } else {
      // not handled
    }
  } catch (err) {
    console.log(err);
  }
};

const adminLogout = async () => {
  try {
    const result = window.confirm('Are you sure you want to logout ?');
    if (result) {
      const res = await axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/api/v1/admin/logout',
      });
      if ((res.data.status = 'success')) location.reload(true);
    } else {
      // not handled
    }
  } catch (err) {
    console.log(err);
  }
};

// USER
const loginForm = document.querySelector('#login-form');
const signUpForm = document.querySelector('#signup-form');
const logoutBtn = document.querySelector('#logoutBtn');

// ADMIN
const adminLoginForm = document.querySelector('#admin-login-form');
const adminLogoutBtn = document.querySelector('#adminLogoutBtn');
const createUserForm = document.querySelector('#createUser-form');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    adminLogin(email, password);
  });
}

if (signUpForm) {
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const phone = document.getElementById('phone').value;
    signup(email, password, firstName, lastName, phone);
  });
}

if (createUserForm) {
  createUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const phone = document.getElementById('phone').value;
    createUser(email, password, firstName, lastName, phone);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

if (adminLogoutBtn) {
  adminLogoutBtn.addEventListener('click', adminLogout);
}
