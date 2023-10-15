const leaderboard = document.getElementById('leaderboard');
const addPlayerForm = document.getElementById('addPlayerForm');
const resetButton = document.getElementById('resetButton');
const playerNameInput = document.getElementById('playerName');
const playerScoreInput = document.getElementById('playerScore');
const nameError = document.getElementById('nameError');
const scoreError = document.getElementById('scoreError');
let players = [];

function clearErrors() {
    nameError.textContent = '';
    scoreError.textContent = '';
}

function updateLeaderboard() {
    leaderboard.innerHTML = '';
    players.sort((a, b) => b.score - a.score);
    players.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.score}</td>
            <td><button class="btn btn-danger" onclick="removePlayer(${index})">Remove</button></td>
        `;
        leaderboard.appendChild(row);
    });
}

function addPlayer() {
    clearErrors();
    const playerName = playerNameInput.value.trim();
    const playerScore = parseInt(playerScoreInput.value);

    if (!playerName) {
        nameError.textContent = 'Name is required.';
        return;
    }

    if (isNaN(playerScore) || playerScore < 0) {
        scoreError.textContent = 'Score must be a non-negative number.';
        return;
    }

    players.push({ name: playerName, score: playerScore });
    updateLeaderboard();
    addPlayerForm.reset();
}

function removePlayer(index) {
    players.splice(index, 1);
    updateLeaderboard();
}

addPlayerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addPlayer();
});

resetButton.addEventListener('click', () => {
    players = [];
    updateLeaderboard();
});
