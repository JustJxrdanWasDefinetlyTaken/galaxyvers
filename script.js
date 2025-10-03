const games = [
    { title: "Suggestions", thumbnail: "https://iili.io/3OM27wv.th.jpg", url: "https://forms.gle/XbZtk1jfGcqLrVRn6" },
    { title: "1v1.lol", thumbnail: "https://iili.io/K0FXGrg.md.jpg", url: "https://scramjet.mercurywork.shop/scramjet/https%3A%2F%2F1v1.lol%2F"},
    { title: "1v1.Older", thumbnail: "https://iili.io/K5IQqnn.jpg", url: "https://learn-with.jskjsv6.workers.dev/1v1-lol-online/1v1-lol-online.github.io/main/file/index.html" },
    { title: "1v1 Oldest", thumbnail: "https://iili.io/K5mxV4e.th.jpg", url: "https://portal1.statetestingstudies.com.cdn.cloudflare.net/scramjet/https%3A%2F%2Fraw.githack.com%2Fgameazzetz%2Fassets%2Frefs%2Fheads%2Fmain%2F1v1lolold.html" },
    { title: "Amazing Strange Police", thumbnail: "https://iili.io/K7FraGp.jpg", url: "https://script.google.com/macros/s/AKfycbwAoMJxFkkCGbz6H0x2lq5uVhb1vvQRKraex1znydX5Gm0jWse3HWUTvdU34ghoPqQauQ/exec"},
    { title: "Cookie Clicker", thumbnail: "https://iili.io", url: "https://raw.githack.com/BinBashBanana/gfiles/master/gfiles/html5/cookieclicker/index.html"},
    { title: "BasketBros.IO", thumbnail: "https://iili.io/2DOa1lR.md.png", url: "https://script.google.com/macros/s/AKfycbxUfaDSpH-0SJL0WPKt38JY7OOOGMmtpY9JTSbL8pvtjxS7jSpNHHu6MdZgWUshIU00Kw/exec"},
    { title: "Paper.io 2", thumbnail: "https://iili.io/Klmfuvj.webp", url: "https://html5.gamedistribution.com/rvvASBMg/paperio2/" },
    { title: "Slope", thumbnail: "https://iili.io/KlmT06Q.md.png", url: "https://deltamath111373269.netlify.app/games/slope/" },
    { title: "Subway Surfers", thumbnail: "https://iili.io/KlmxoGV.md.jpg", url: "https://deltamath111373269.netlify.app/games/subwaysurfers/" },
    { title: "Wordle", thumbnail: "https://iili.io/KIWKE12.md.png", url: "https://gregcameron.com/infinite-wordle/"},
    { title: "Retro Bowl", thumbnail: "https://iili.io/K0FNvt4.jpg", url: "https://portal1.statetestingstudies.com.cdn.cloudflare.net/yalp/ela.html?book=retro-bowl&type=3kh0"}
];

const apps = [
    { title: "YouTube", thumbnail: "https://placehold.co/512x512", url: "https://www.youtube.com" },
    { title: "Spotify", thumbnail: "https://placehold.co/512x512", url: "https://scramjet.mercurywork.shop/scramjet/https%3A%2F%2Fopen.spotify.com%2F" },
    { title: "Soundboard", thumbnail: "https://placehold.co/512x512", url: "https://raw.githack.com/Teerths/TimelessDevelopments/refs/heads/main/game/soundboard/index.html" }
];

function renderGames(gameList) {
    const gameListContainer = document.getElementById('game-list');
    gameListContainer.innerHTML = '';
    if (gameList.length === 0) {
        gameListContainer.innerHTML = "<p>No games found. Try a different search term.</p>";
        return;
    }
    gameList.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}">
            <h3>${game.title}</h3>
        `;
        gameCard.onclick = () => loadGame(game.url);
        gameListContainer.appendChild(gameCard);
    });
}

function renderApps(appList) {
    const appListContainer = document.getElementById('app-list');
    appListContainer.innerHTML = '';
    appList.forEach(app => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        appCard.innerHTML = `
            <img src="${app.thumbnail}" alt="${app.title}">
            <h3>${app.title}</h3>
        `;
        appCard.onclick = () => loadGame(app.url);
        appListContainer.appendChild(appCard);
    });
}

function loadGame(url) {
    document.querySelectorAll('.content').forEach(el => el.style.display = 'none');
    const gameDisplay = document.getElementById('game-display');
    const gameIframe = document.getElementById('game-iframe');
    const playArea = document.getElementById('game-play-area');
    if (playArea.classList.contains('fullscreen')) {
        toggleFullscreen(true);
    }
    gameIframe.src = url;
    gameDisplay.style.display = 'block';
}

function showHome() {
    document.querySelectorAll('.content').forEach(el => el.style.display = 'none');
    document.getElementById('content-home').style.display = 'block';
    document.querySelectorAll('.navbar li a').forEach(link => link.classList.remove('active'));
    document.getElementById('homeLink').classList.add('active');
}

function showGames() {
    document.querySelectorAll('.content').forEach(el => el.style.display = 'none');
    document.getElementById('content-games').style.display = 'block';
    document.querySelectorAll('.navbar li a').forEach(link => link.classList.remove('active'));
    document.getElementById('gameLink').classList.add('active');
    renderGames(games);
}

function showAbout() {
    document.querySelectorAll('.content').forEach(el => el.style.display = 'none');
    document.getElementById('content-about').style.display = 'block';
    document.querySelectorAll('.navbar li a').forEach(link => link.classList.remove('active'));
    document.getElementById('aboutLink').classList.add('active');
}

function showApps() {
    document.querySelectorAll('.content').forEach(el => el.style.display = 'none');
    document.getElementById('content-apps').style.display = 'block';
    document.querySelectorAll('.navbar li a').forEach(link => link.classList.remove('active'));
    document.getElementById('appsLink').classList.add('active');
    renderApps(apps);
}

function showContact() {
    document.querySelectorAll('.content').forEach(el => el.style.display = 'none');
    document.getElementById('content-contact').style.display = 'block';
    document.querySelectorAll('.navbar li a').forEach(link => link.classList.remove('active'));
    document.getElementById('contactLink').classList.add('active');
}

function searchGames() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredGames = games.filter(game => game.title.toLowerCase().includes(searchTerm));
    showGames();
    renderGames(filteredGames);
}

let isFullscreen = false;
function toggleFullscreen(forceExit = false) {
    const playArea = document.getElementById('game-play-area');
    const btn = document.getElementById('fullscreenBtn');
    if (forceExit || isFullscreen) {
        playArea.classList.remove('fullscreen');
        btn.textContent = 'Fullscreen';
        isFullscreen = false;
    } else {
        playArea.classList.add('fullscreen');
        btn.textContent = 'Exit Fullscreen';
        isFullscreen = true;
    }
}

window.onload = () => {
    showHome();

    // Event listeners for navigation
    document.getElementById('homeLink').addEventListener('click', e => { e.preventDefault(); showHome(); });
    document.getElementById('gameLink').addEventListener('click', e => { e.preventDefault(); showGames(); });
    document.getElementById('aboutLink').addEventListener('click', e => { e.preventDefault(); showAbout(); });
    document.getElementById('appsLink').addEventListener('click', e => { e.preventDefault(); showApps(); });
    document.getElementById('contactLink').addEventListener('click', e => { e.preventDefault(); showContact(); });
    document.getElementById('searchBtn').addEventListener('click', searchGames);
    document.getElementById('backToHomeApps').addEventListener('click', showHome);
    document.getElementById('backToHomeGame').addEventListener('click', showHome);

    // Fullscreen button event
    document.getElementById('fullscreenBtn').addEventListener('click', () => toggleFullscreen());
};

function getRandomSegment(length) {
    const chars = '(){~-12345abcdefg';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

setInterval(() => {
    const randomSegment = getRandomSegment(15);
    const newUrl = `https://galaxyverse.com/${randomSegment}`;
    window.history.pushState({}, '', newUrl);
}, 150);
