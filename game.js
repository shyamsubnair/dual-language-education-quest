const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const details = document.getElementById('details');

const player = { x: 50, y: 50, size: 20, speed: 5 };
const items = [
    { x: 100, y: 100, type: 'opportunity', text: 'Enhanced Cognitive Skills' },
    { x: 200, y: 150, type: 'opportunity', text: 'Cultural Awareness' },
    { x: 300, y: 200, type: 'opportunity', text: 'Improved Academic Performance' },
    { x: 400, y: 250, type: 'opportunity', text: 'Better Career Opportunities' },
    { x: 500, y: 300, type: 'opportunity', text: 'Multilingual Communication' },
    { x: 150, y: 50, type: 'challenge', text: 'Standardized Testing Constraints' },
    { x: 250, y: 100, type: 'challenge', text: 'Limited Time for Collaborative Planning, Teaching, and Assessment' },
    { x: 350, y: 150, type: 'challenge', text: 'Limited Parental and Community Involvement' },
    { x: 450, y: 200, type: 'challenge', text: 'Balancing Both Languages' },
    { x: 550, y: 250, type: 'challenge', text: 'Misinterpreting Results' }
];

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawItems() {
    items.forEach(item => {
        ctx.fillStyle = item.type === 'opportunity' ? 'green' : 'red';
        ctx.beginPath();
        ctx.arc(item.x, item.y, 10, 0, Math.PI * 2);
        ctx.fill();
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function detectCollision() {
    items.forEach((item, index) => {
        if (player.x < item.x + 10 &&
            player.x + player.size > item.x &&
            player.y < item.y + 10 &&
            player.y + player.size > item.y) {
                details.innerHTML += `<p>${item.type === 'opportunity' ? 'Opportunity' : 'Challenge'}: ${item.text}</p>`;
                items.splice(index, 1);
        }
    });
}

function update() {
    clearCanvas();
    drawPlayer();
    drawItems();
    detectCollision();
    requestAnimationFrame(update);
}

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp': player.y -= player.speed; break;
        case 'ArrowDown': player.y += player.speed; break;
        case 'ArrowLeft': player.x -= player.speed; break;
        case 'ArrowRight': player.x += player.speed; break;
    }
});

update();
