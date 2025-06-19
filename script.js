let display = document.getElementById("display");
let expression = "";

// Load saved history on startup
window.onload = renderHistory;

function appendValue(value) {
  if (display.textContent === "0") display.textContent = "";
  expression += value;
  display.textContent = expression;
}

function clearDisplay() {
  expression = "";
  display.textContent = "0";
}

function calculateResult() {
  try {
    const result = eval(expression);
    const fullExpression = `${expression} = ${result}`;
    expression = result.toString();
    display.textContent = expression;

    saveToHistory(fullExpression);
    renderHistory();
  } catch {
    display.textContent = "Error";
    expression = "";
  }
}

function saveToHistory(entry) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.unshift(entry); // Add latest at top
  if (history.length > 10) history.pop(); // Only keep 10
  localStorage.setItem("calcHistory", JSON.stringify(history));
}

function renderHistory() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";

  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}