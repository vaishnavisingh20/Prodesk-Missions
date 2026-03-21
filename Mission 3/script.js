// --- DOM Elements ---
const searchBtn = document.getElementById('searchBtn');
const usernameInput = document.getElementById('usernameInput');
const battleToggle = document.getElementById('battleToggle');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');

// Card 1 Elements
const card1 = document.getElementById('card1');
const avatar1 = document.getElementById('avatar1');
const name1 = document.getElementById('name1');
const bio1 = document.getElementById('bio1');
const joined1 = document.getElementById('joined1');
const website1 = document.getElementById('website1');
const repos1 = document.getElementById('repos1');

// Card 2 Elements
const card2 = document.getElementById('card2');
const avatar2 = document.getElementById('avatar2');
const name2 = document.getElementById('name2');
const bio2 = document.getElementById('bio2');
const joined2 = document.getElementById('joined2');
const website2 = document.getElementById('website2');
const repos2 = document.getElementById('repos2');

// --- Helper Functions ---

// Level 2: Format Date (e.g., "2023-01-25T12:00:00Z" -> "25 Jan 2023")
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// UI Helpers
function showLoading() {
    loadingEl.classList.remove('hidden');
    errorEl.classList.add('hidden');
    card1.classList.add('hidden');
    card2.classList.add('hidden');
}

function hideLoading() {
    loadingEl.classList.add('hidden');
}

function showError(msg) {
    hideLoading();
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
}

function clearCards() {
    card1.classList.add('hidden');
    card2.classList.add('hidden');
    errorEl.classList.add('hidden');
    // Clear content
    repos1.innerHTML = '';
    repos2.innerHTML = '';
}

// --- Core Logic ---

// Level 1: Fetch User Data
async function fetchUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
        if (response.status === 404) throw new Error("User not found. Check the spelling.");
        throw new Error("Failed to fetch data from GitHub.");
    }
    return await response.json();
}

// Level 2: Fetch Repositories
async function fetchRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=updated`);
    if (!response.ok) throw new Error("Could not fetch repositories.");
    return await response.json();
}

// Render Data to DOM
function renderUser(data, cardId, repos) {
    // FIX: Construct the correct ID (e.g., 'card1' instead of '1')
    const card = document.getElementById('card' + cardId);
    
    if (!card) return; // Safety check

    // Basic Info
    card.classList.remove('hidden');
    document.getElementById(`avatar${cardId}`).src = data.avatar_url;
    document.getElementById(`name${cardId}`).textContent = data.name || data.login;
    document.getElementById(`bio${cardId}`).textContent = data.bio || "No bio available.";
    document.getElementById(`joined${cardId}`).textContent = formatDate(data.created_at);
    
    // Website
    const websiteLink = document.getElementById(`website${cardId}`);
    if (data.blog) {
        websiteLink.href = data.blog;
        websiteLink.textContent = data.blog;
    } else {
        websiteLink.href = "#";
        websiteLink.textContent = "No website";
    }

    // Level 2: Render Repos
    const repoList = document.getElementById(`repos${cardId}`);
    repoList.innerHTML = ''; // Clear previous
    
    repos.forEach(repo => {
        const li = document.createElement('li');
        li.className = 'repo-item';
        li.innerHTML = `
            <a href="${repo.html_url}" target="_blank" class="repo-link">📂 ${repo.name}</a>
            <span class="repo-date">${formatDate(repo.updated_at)}</span>
        `;
        repoList.appendChild(li);
    });
}

// --- Main Search Handler ---

async function handleSearch() {
    const user1Name = usernameInput.value.trim();
    const isBattleMode = battleToggle.checked;

    if (!user1Name) {
        showError("Please enter a username!");
        return;
    }

    showLoading();

    try {
        // Level 1: Fetch User 1
        const user1Data = await fetchUser(user1Name);
        const user1Repos = await fetchRepos(user1Name);
        renderUser(user1Data, '1', user1Repos);

        if (isBattleMode) {
            // Level 3: Battle Mode Logic
            const user2Name = prompt("Enter the second username to battle:");
            if (!user2Name) {
                hideLoading();
                return; // Cancelled
            }

            // Fetch User 2
            const user2Data = await fetchUser(user2Name);
            const user2Repos = await fetchRepos(user2Name);
            renderUser(user2Data, '2', user2Repos);

            // Level 3: Compare Stats (Follower Count)
            const winner = user1Data.followers_count > user2Data.followers_count ? '1' : '2';
            const loser = winner === '1' ? '2' : '1';

            document.getElementById(`card${winner}`).classList.add('winner');
            document.getElementById(`card${loser}`).classList.add('loser');
            
            // Add a badge to the winner
            const badge = document.createElement('div');
            badge.className = 'battle-badge';
            badge.style.background = 'var(--success)';
            badge.style.top = '-10px';
            badge.style.right = '-10px';
            badge.textContent = 'WINNER';
            document.getElementById(`card${winner}`).appendChild(badge);

        } else {
            // Single User Mode
            document.getElementById('card1').classList.remove('winner', 'loser');
        }

        // FIX: Hide loading after successful render
        hideLoading();

    } catch (err) {
        showError(err.message);
    }
}

// --- Event Listeners ---
searchBtn.addEventListener('click', handleSearch);

// Allow pressing "Enter" to search
usernameInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});