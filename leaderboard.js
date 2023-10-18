document.addEventListener("DOMContentLoaded", function () {
    const leaderboard = document.querySelector('#leaderboard');
    const addPlayerForm = document.querySelector('#addPlayerForm');
    const resetButton = document.querySelector('#resetButton');
    const playerNameInput = document.querySelector('#playerName');
    const playerScoreInput = document.querySelector('#playerScore');
    const nameError = document.querySelector('#nameError');
    const scoreError = document.querySelector('#scoreError');
    const updateScoreModal = new bootstrap.Modal(document.querySelector('#updateScoreModal'));
    const updateScoreForm = document.querySelector('#updateScoreForm');
    const newScoreInput = document.querySelector('#newScore');
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
                <td>
                    <button class="btn btn-danger remove" data-index="${index}">Remove</button>
                    <button class="btn btn-primary update" data-index="${index}">Update</button>
                </td>
            `;
            leaderboard.appendChild(row);
        });

        // Add event listeners to the update and remove buttons
        const removeButtons = document.querySelectorAll('.remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const index = parseInt(button.getAttribute('data-index'));
                removePlayer(index);
            });
        });

        const updateButtons = document.querySelectorAll('.update');
        updateButtons.forEach(button => {
            button.addEventListener('click', function () {
                const index = parseInt(button.getAttribute('data-index'));
                openUpdateScoreModal(index);
            });
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

    function openUpdateScoreModal(index) {
        const player = players[index];
        newScoreInput.value = player.score;
        updateScoreModal.show();

        updateScoreForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const newScore = parseInt(newScoreInput.value);
            if (!isNaN(newScore) && newScore >= 0) {
                players[index].score = newScore;
                updateLeaderboard();
                updateScoreModal.hide();
            }
        });
    }

    addPlayerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addPlayer();
    });

    resetButton.addEventListener('click', function () {
        players = [];
        updateLeaderboard();
    });
});
