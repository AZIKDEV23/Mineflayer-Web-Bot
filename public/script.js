document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const server = document.getElementById("server").value;
  const port = document.getElementById("port").value;

  fetch("/start-bot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, server, port }),
  });
});
