// Main Text Color: #000000
// Name Text Color: #ffffff

function determineFontHeight(fontStyle) {
  var body = document.getElementsByTagName("body")[0];
  var dummy = document.createElement("div");
  var dummyText = document.createTextNode("M");
  dummy.appendChild(dummyText);
  dummy.setAttribute("style", fontStyle);
  body.appendChild(dummy);
  var result = dummy.offsetHeight;
  body.removeChild(dummy);
  return result;
};

function findFontSize(text, style, context, bounds, max = 80)
{
    for (var i = max; i > 10; i -= 2)
    {
		context.font = "small-caps bold " + i + "pt Sans-Serif";
	
        var size = context.measureText(text);
        size.height = determineFontHeight("font: " + context.font);
        
        if (size.width <= bounds.width && size.height <= bounds.height)
            return i;
    }
    return 20;
}

function drawTextInBox(text, context, bounds)
{
    var size = context.measureText(text);
    size.height = determineFontHeight("font: " + context.font);
    
    var x = ((bounds.width - size.width) / 2) + bounds.x;
    var y = ((bounds.height - size.height) / 2) + bounds.y;
    
    context.textBaseline = 'hanging';
    
    // Help position the text by showing the bounding box
    //context.beginPath();
    //context.lineWidth = '6';
    //context.strokeStyle = 'red';
    //context.rect(x, y, size.width, size.height);
    //context.stroke();
    
    context.fillText(text, x, y);
}

function processInput()
{
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.id = 'scratchCanvas';
    canvas.width = 2554;
    canvas.height = 1420;
    
    window.onload();
}

window.onload = function(){
    var canvas = document.getElementById("scratchCanvas");
    var context = canvas.getContext("2d");
    var imageObj = new Image();
    imageObj.crossOrigin="anonymous";
    var image = document.getElementById('placeholder');
    imageObj.onload = function(){
        context.drawImage(imageObj, 0, 0, 2554, 1420);
        
        var caption = "geese: dangerous menace";
        var caption2 = "";
		
        node = document.getElementById('caption');
        if (node.value.length > 0)
            caption = node.value.toLowerCase();
        
		node = document.getElementById('caption2');
        if (node.value.length > 0)
            caption2 = node.value.toLowerCase();
		
		if (caption2.length > 0)
		{
			var bounds = { x: 425, y: 1140, width: 1950, height: 75 };
			var bounds2 = { x: 425, y: 1215, width: 1950, height: 75 };
			var size = findFontSize(caption, "", context, bounds);
			var size2 = findFontSize(caption2, "", context, bounds);
			size = Math.min(size, size2)
			context.font = "small-caps bold " + size + "pt Sans-Serif";
			drawTextInBox(caption, context, bounds)
			drawTextInBox(caption2, context, bounds2)
		}
		else
		{
			var bounds = { x: 425, y: 1140, width: 1950, height: 150 };
			var size = findFontSize(caption, "", context, bounds);
			context.font = "small-caps bold " + size + "pt Sans-Serif";
			drawTextInBox(caption, context, bounds);
		}
		
        image.src = canvas.toDataURL();
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.remove();
    }
    imageObj.src = "tuckerfabio.jpg";
}