document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');
    const rectSize = document.getElementById('rectSize');
    const circleSize = document.getElementById('circleSize');
    const starSize = document.getElementById('starSize');
    const clearBtn = document.getElementById('clearBtn');
    const saveBtn = document.getElementById('saveBtn');
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    const eraseBtn = document.getElementById('eraseBtn');
    const rectangleBtn = document.getElementById('rectangleBtn');
    const circleBtn = document.getElementById('circleBtn');
    const starBtn = document.getElementById('starBtn');
    const freehandBtn = document.getElementById('freehandBtn');

    let isDrawing = false;
    let startX = 0;
    let startY = 0;
    let shapeMode = 'freehand'; // Default shape mode is freehand
  
    let undoStack = [];
    let redoStack = [];
  
    canvas.width = window.innerWidth ;
    canvas.height = window.innerHeight-180;


    function drawRectangle(e) {
        context.strokeStyle = colorPicker.value;
        context.lineWidth = rectSize.value;
      
        const width = e.offsetX - startX;
        const height = e.offsetY - startY;
      
        context.beginPath();
        context.rect(
          Math.min(startX, startX + width),
          Math.min(startY, startY + height),
          Math.abs(width),
          Math.abs(height)
        );
        context.stroke();
      }
      
  
    function drawCircle(e) {
      context.strokeStyle = colorPicker.value;
      context.lineWidth = circleSize.value;
  
      const radius = Math.sqrt(Math.pow(e.offsetX - startX, 2) + Math.pow(e.offsetY - startY, 2));
  
      context.beginPath();
      context.arc(startX, startY, radius, 0, 2 * Math.PI);
      context.stroke();
    }
  
    function drawStar(e) {
      const innerRadius = 30;
      const outerRadius = 60;
      const numPoints = 5;
      const angle = Math.PI / numPoints;
  
      context.strokeStyle = colorPicker.value;
      context.lineWidth = starSize.value;
  
      context.beginPath();
      for (let i = 0; i < 2 * numPoints; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = startX + radius * Math.cos(i * angle);
        const y = startY + radius * Math.sin(i * angle);
        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }
      context.closePath();
      context.stroke();
    }
  
    function erase(e) {
      context.clearRect(e.offsetX - 5, e.offsetY - 5, 10, 10);
      undoStack.push(canvas.toDataURL());
    }
  
    function drawFreehand(e) {
      if (!isDrawing) return;
  
      context.strokeStyle = colorPicker.value;
      context.lineWidth = brushSize.value;
      context.lineCap = 'round';
  
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
    }
  
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      [startX, startY] = [e.offsetX, e.offsetY];
  
      switch (shapeMode) {
        case 'rectangle':
          drawRectangle(e);
          break;
        case 'circle':
          drawCircle(e);
          break;
        case 'star':
          drawStar(e);
          break;
        case 'erase':
          canvas.addEventListener('mousemove', erase);
          break;
        default:
          if (shapeMode === 'freehand') {
            context.beginPath();
            context.moveTo(e.offsetX, e.offsetY);
          }
          break;
      }
    });
  
    canvas.addEventListener('mousemove', (e) => {
      if (shapeMode === 'freehand') {
        drawFreehand(e);
      }
    });
  
    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
      undoStack.push(canvas.toDataURL());
      canvas.removeEventListener('mousemove', erase);
    });
  
    clearBtn.addEventListener('click', () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  
    saveBtn.addEventListener('click', () => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'drawing.png';
      link.click();
    });
  
    undoBtn.addEventListener('click', () => {
      if (undoStack.length > 1) {
        redoStack.push(undoStack.pop());
        const img = new Image();
        img.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0);
        };
        img.src = undoStack[undoStack.length - 1];
      }
    });
  
    redoBtn.addEventListener('click', () => {
      if (redoStack.length > 0) {
        undoStack.push(redoStack.pop());
        const img = new Image();
        img.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0);
        };
        img.src = undoStack[undoStack.length - 1];
      }
    });
  
    eraseBtn.addEventListener('click', () => {
      shapeMode = 'erase';
    });
  
    rectangleBtn.addEventListener('click', () => {
      shapeMode = 'rectangle';
    });
  
    circleBtn.addEventListener('click', () => {
      shapeMode = 'circle';
    });
  
    starBtn.addEventListener('click', () => {
      shapeMode = 'star';
    });
  
    freehandBtn.addEventListener('click', () => {
      shapeMode = 'freehand';
    });
  });


  