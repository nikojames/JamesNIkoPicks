document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;

        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const message = await response.text();
            document.getElementById('signupMessage').innerText = message;
        } catch (error) {
            document.getElementById('signupMessage').innerText = 'Error signing up. Please try again later.';
        }
    });
});
