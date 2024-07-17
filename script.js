let history = [];
let isDrawing = false;
let lastX = 0;
let lastY = 0;

const colorPicker = document.getElementById('colorPicker');
const canvasColor = document.getElementById('canvasColor');
const canvas = document.getElementById('myCanvas');
const undoButton = document.getElementById('undoButton');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const retrieveButton = document.getElementById('retrieveButton');
const fontSizePicker = document.getElementById('fontSizePicker'); // add new element

const ctx = canvas.getContext('2d');

colorPicker.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.strokeStyle = event.target.value;
});

canvasColor.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0, 0, 800, 500);
});

function getCoordinates(event) {
    if (event.touches) {
        return {
            x: event.touches[0].clientX - canvas.offsetLeft,
            y: event.touches[0].clientY - canvas.offsetTop
        };
    }
    return {
        x: event.clientX - canvas.offsetLeft,
        y: event.clientY - canvas.offsetTop
    };
}

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    const coords = getCoordinates(event);
    lastX = coords.x;
    lastY = coords.y;
});

canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;
    const coords = getCoordinates(event);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    lastX = coords.x;
    lastY = coords.y;
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('touchstart', (event) => {
    event.preventDefault();
    isDrawing = true;
    const coords = getCoordinates(event);
    lastX = coords.x;
    lastY = coords.y;
});

canvas.addEventListener('touchmove', (event) => {
    if (!isDrawing) return;
    event.preventDefault();
    const coords = getCoordinates(event);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    lastX = coords.x;
    lastY = coords.y;
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

fontSizePicker.addEventListener('change', (event) => {
    ctx.lineWidth = event.target.value;
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    let link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

retrieveButton.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContents');
    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }
});
