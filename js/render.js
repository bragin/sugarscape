var canvasId = 'sugarScape';
var c = document.getElementById(canvasId);
var ctx = c.getContext("2d");
var unit = 8;
var lineWidth = 1;
var halfLineWidth = lineWidth/2;
var halfUnit = unit/2;
var fullRadius = halfUnit-lineWidth;
var sugarColor = 'rgba(212,175,55,100%)';
var agentColor = 'rgba(0,0,255,70%)';

function setCanvas()
{
    c.width = unit*cntX;
    c.height = unit*cntY;

    ctx.lineWidth= lineWidth;
}

// unused?
function drawGrid()
{
    for (var i=0; i<=cntY; i++) {
        ctx.moveTo(0,i*unit);
        ctx.lineTo(c.width-halfLineWidth,i*unit);
        ctx.stroke();
    }

    for (var i=0; i<=cntX; i++) {
        ctx.moveTo(i*unit, 0);
        ctx.lineTo(i*unit, c.height-halfLineWidth);
        ctx.stroke();
    }
}

function drawCircle(centerX, centerY, radius, color)
{
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawRect(centerX, centerY, width, color)
{
    ctx.beginPath();
    //ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.roundRect(centerX - width, centerY - width, width*2, width*2, 0);
    ctx.fillStyle = color;
    ctx.fill();
}


/*
draw the sugar,
using radius to indicate abundance of the sugar
*/
function drawSugarRadius(src, max)
{
    for (var idx=0; idx<cntX*cntY; idx++) {
        var i = Math.floor(idx / cntX), j = idx % cntX;
        var cx = j*unit+halfUnit, cy = i*unit+halfUnit;
        var radius = fullRadius*Math.min(max, src[idx])/max;
        ctx.clearRect(j*unit, i*unit, unit, unit);
        drawCircle(cx, cy, radius, sugarColor);
    }
}

/*
draw the sugar,
using color to indicate abundance of the sugar
*/
function drawSugarColor(src, max)
{
    for (var idx=0; idx<cntX*cntY; idx++) {
        var i = Math.floor(idx / cntX), j = idx % cntX;
        var cx = j*unit+halfUnit, cy = i*unit+halfUnit;
        ctx.clearRect(j*unit, i*unit, unit, unit);

        //var blue = 255-Math.floor(Math.min(max, src[idx])/max*255);
        //var color = 'rgb(255,255,'+blue+')';

        var intensity = Math.floor(Math.min(max, src[idx])/max*100);
        var color = `rgba(212,175,55,${intensity}%)`;
        
        //drawCircle(cx, cy, fullRadius, color);
        drawRect(cx, cy, fullRadius, color);
    }
}

function drawSugar()
{
    //drawSugarColor(sugarProduction, maxProduction);
    drawSugarColor(sugar, maxSugar);
    //drawSugarRadius(sugar, maxSugar);
}

function drawAgents()
{
    //alert('drawAgents');
    for (var i=0; i<agents.length; i++) {
        var x = agents[i].x, y = agents[i].y;
        var cx = x*unit+halfUnit, cy = y*unit+halfUnit;
        ctx.clearRect(x*unit, y*unit, unit, unit);
        drawCircle(cx, cy, fullRadius, agentColor);
    }
}

function draw()
{
    drawSugar();
    drawAgents();
}