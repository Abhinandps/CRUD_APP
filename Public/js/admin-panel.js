/* eslint-disable */

const fetchAllUsersData = async () => {
  try {
    const res = await axios.get('http://127.0.0.1:3000/api/v1/admin/');
    const data = res.data.data;
    const users = data.users;

    const table = document.querySelector('table');

    const filterInput = document.querySelector('#filter-input');

    const filterUsers = (searchTerm) => {
      const filteredUsers = users.filter((user) => {
        const fullName = user.firstName + ' ' + user.lastName;
        const email = user.email;
        return (
          fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      // Remove all rows from the table
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }

      filteredUsers.forEach((user, index) => {
        const row = document.createElement('tr');

        const updateButton = `<button type="button" class="updateBtn btn text-white bg-dark" data-user-id="${user._id}">update</button>`;
        const deleteButton = `<button  type="button"class="deleteBtn btn text-white bg-danger" data-user-id="${user._id}">delete</button>`;

        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${updateButton} ${deleteButton}</td>
            `;
        table.appendChild(row);
      });

      const updateButtons = table.querySelectorAll('.updateBtn');
      const deleteButtons = table.querySelectorAll('.deleteBtn');

      // Update the User Details
      if (updateButtons) {
        updateButtons.forEach((button) => {
          button.addEventListener('click', async () => {
            const userId = button.dataset.userId;
            try {
              const res = await axios.get(
                `http://127.0.0.1:3000/api/v1/admin/${userId}`
              );

              if (res.data.status === 'success') {
                const formHTML = `
               

                <form id="myForm" class="w-50 p-5 mt-3">
                <h2 class="text-center my-2">Update User</h2>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email:</label>
                    <input type="text" class="form-control" id="email" name="email" required>
                  </div>

                  <div class="mb-3">
                    <label for="firstName" class="form-label">First Name:</label>
                    <input type="text" class="form-control" id="firstName" name="firstName" required>
                  </div>

                  <div class="mb-3">
                    <label for="lastName" class="form-label">Last Name:</label>
                    <input type="text" class="form-control" id="lastName" name="lastName" required>
                  </div>

                  <div class="mb-3">
                    <label for="phone" class="form-label">Phone:</label>
                    <input type="text" class="form-control" id="phone" name="phone" required>
                  </div>

                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              `;

                document.getElementById('formContainer').innerHTML = formHTML;

                const userData = res.data.data.user;
                document.getElementById('email').value = userData.email;
                document.getElementById('firstName').value = userData.firstName;
                document.getElementById('lastName').value = userData.lastName;
                document.getElementById('phone').value = userData.phone;

                const form = document.getElementById('myForm');

                form.addEventListener('submit', async (event) => {
                  event.preventDefault();
                  const email = document.getElementById('email').value;
                  const firstName = document.getElementById('firstName').value;
                  const lastName = document.getElementById('lastName').value;
                  const phone = document.getElementById('phone').value;

                  const formData = { email, firstName, lastName, phone };

                  try {
                    const res = await axios.patch(
                      `http://127.0.0.1:3000/api/v1/admin/${userId}`,
                      formData
                    );

                    if (res.data.status === 'success') {
                      alert('Updated Successfully');
                      window.location.href = '/dashboard';
                    }
                  } catch (err) {
                    console.log(err);
                  }
                });
              }
            } catch (err) {
              console.log(err);
            }
          });
        });
      }

      // Delete User Details
      if (deleteButtons) {
        deleteButtons.forEach((button) => {
          button.addEventListener('click', async () => {
            const userId = button.dataset.userId;
            try {
              const result = window.confirm(
                'Are you sure you want to delete this item?'
              );
              if (result) {
                const res = await axios.delete(
                  `http://127.0.0.1:3000/api/v1/admin/${userId}`
                );
                if (res.status === 204) {
                  window.setTimeout(() => {
                    location.reload(true);
                  }, 100);
                }
              } else {
                // not handled
              }
            } catch (err) {
              console.log(err);
            }
          });
        });
      }
    };

    // Filter Users
    if (filterInput) {
      filterInput.addEventListener('input', (e) => {
        const filterValue = e.target.value;
        filterUsers(filterValue);
      });
      filterUsers('');
    }
  } catch (err) {
    console.log(err);
  }
};

fetchAllUsersData();
