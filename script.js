const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', () => {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;
    console.log('Command:', command);
    sendCommandToServer(command);
  };

  recognition.start();
});

function sendCommandToServer(command) {
  fetch('/api/command', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ command })
  })
  .then(response => response.json())
  .then(data => console.log('Server response:', data))
  .catch(error => console.error('Error sending command:', error));
}
