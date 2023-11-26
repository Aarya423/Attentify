document.getElementById('chat-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const userMessage = document.getElementById('user-message').value;
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();
    document.getElementById('bot-response').textContent = data.message;
});