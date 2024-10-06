document.getElementById('reg').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent form from submitting and refreshing the page

    // Fetching values from the input fields
    let name = document.getElementById('name').value;
    let pass = document.getElementById('Password').value;
    let cpass = document.getElementById('confirmPassword').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;

    // Basic validation for empty fields
    if (name === '' || pass === '' || cpass === '' || email === '' || phone === '') {
        alert('Please fill out all fields.');
        return;
    }
    if (cpass !== pass) {
        alert('The password and confirm password do not match.');
        return;
    }

    // Email format validation (basic regex for email pattern)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Phone number validation (basic validation for 10-digit numbers)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    // Prepare the data to be sent in the POST request
    const userData = {
        username: name,
        password: pass,
        email: email,
        phone: phone
    };

    try {
        // Sending the data to the server using Fetch API
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // Parse the JSON response
        const result = await response.json();

        // Handle the server response
        if (response.ok) {
            alert(result.message);  // Registration success message from the server
            window.location.href = 'login.html';  // Redirect to the login page after successful registration
        } else {
            alert(result.message);  // Show error message if registration failed
        }
    } catch (error) {
        alert('Error occurred while registering. Please try again.');
    }
});
