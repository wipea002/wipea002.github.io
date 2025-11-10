document.addEventListener("DOMContentLoaded", function () {
  let money = 0;
  let fans = 0;
  let trainings = 0;
  let wins = 0;
  let currentTask = 0;

  let autoClickerActive = false;
  let autoClickerInterval = null;

  const tasks = [
    { text: "Tjen 100 kr", condition: () => money >= 100 },
    { text: "Tren laget 3 ganger", condition: () => trainings >= 3 },
    { text: "Få 200 fans", condition: () => fans >= 200 },
    { text: "Vinn 1 kamp", condition: () => wins >= 1 },
    { text: "Du har fullført alle oppgaver!", condition: () => false },
  ];

  function clickBall() {
    money += 1;
    checkAutoClicker();
    updateStats();
  }

  function train() {
    if (money >= 300) {
      money -= 300;
      trainings++;
      alert("Du trente laget!");
    } else {
      alert("Ikke nok penger!");
    }
    updateStats();
  }

  function buyFans() {
    if (money >= 500) {
      money -= 500;
      fans += 50;
      alert("Du kjøpte 50 fans!");
    } else {
      alert("Ikke nok penger!");
    }
    updateStats();
  }

  function playMatch() {
    const result = Math.random();
    if (result < 0.5) {
      money += 50;
      wins++;
      alert("Du vant kampen! +50 kr");
    } else {
      money -= 50;
      alert("Du tapte kampen. -50 kr");
    }
    checkAutoClicker();
    updateStats();
  }

  function checkAutoClicker() {
    if (money >= 50000 && !autoClickerActive) {
      autoClickerActive = true;
      alert("Auto-clicker låst opp! Du tjener nå penger automatisk!");
      autoClickerInterval = setInterval(() => {
        money += 1;
        updateStats();
      }, 1000);
    }
  }

  function updateStats() {
    document.getElementById("money").textContent = money;
    document.getElementById("fans").textContent = fans;

    if (currentTask < tasks.length - 1 && tasks[currentTask].condition()) {
      currentTask++;
      document.getElementById("task-text").textContent =
        tasks[currentTask].text;
    }
  }

  const football = document.getElementById("football");
  if (football) {
    football.addEventListener("click", clickBall);
  }
  window.train = train;
  window.buyFans = buyFans;
  window.playMatch = playMatch;
});
