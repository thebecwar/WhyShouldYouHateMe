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
    var y = ((bounds.height - size.height) / 2) + bounds.y + (size.height / 2);
    context.fillText(text, x, y);
}

function processInput()
{
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.id = 'scratchCanvas';
    canvas.width = 1440;
    canvas.height = 808;
    
    window.onload();
}

window.onload = function(){
    var canvas = document.getElementById("scratchCanvas");
    var context = canvas.getContext("2d");
    var imageObj = new Image();
    var image = document.getElementById('placeholder');
    imageObj.onload = function(){
        context.drawImage(imageObj, 0, 0, 1440, 808);
        
        var thought1 = "i am dumb";
        var thought2 = "what was that?";
		var thought3 = "who am i?";
		var thought4 = "uh...";
		
        node = document.getElementById('thought1');
        if (node.value.length > 0)
            thought1 = node.value.toLowerCase();
        
		node = document.getElementById('thought2');
        if (node.value.length > 0)
            thought2 = node.value.toLowerCase();
        
		node = document.getElementById('thought3');
        if (node.value.length > 0)
            thought3 = node.value.toLowerCase();
        
		node = document.getElementById('thought4');
        if (node.value.length > 0)
            thought4 = node.value.toLowerCase();
			
		var bounds = { x: 0, y: 0, width: 446, height: 59 };
		var size = Math.min(findFontSize(thought1, "", context, bounds), findFontSize(thought2, "", context, bounds), findFontSize(thought3, "", context, bounds), findFontSize(thought4, "", context, bounds))
       
		context.fillStyle = '#000077';
	   
		var bounds = { x: 896, y: 168, width: 446, height: 59 };
		//var size = findFontSize(thought1, "", context, bounds);
		//console.log(size)
		context.font = "small-caps bold " + size + "pt Sans-Serif";
		drawTextInBox(thought1, context, bounds);

		bounds = { x: 896, y: 268, width: 446, height: 59 };
		//var size = findFontSize(thought2, "", context, bounds);
		//console.log(size)
		context.font = "small-caps bold " + size + "pt Sans-Serif";
		drawTextInBox(thought2, context, bounds);
		
		bounds = { x: 896, y: 368, width: 446, height: 59 };
		//var size = findFontSize(thought3, "", context, bounds);
		//console.log(size)
		context.font = "small-caps bold " + size + "pt Sans-Serif";
		drawTextInBox(thought3, context, bounds);
	
		bounds = { x: 896, y: 468, width: 446, height: 59 };
		//var size = findFontSize(thought4, "", context, bounds);
		//console.log(size)
		context.font = "small-caps bold " + size + "pt Sans-Serif";
		drawTextInBox(thought4, context, bounds);
				
        image.src = canvas.toDataURL();
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.remove();
    }
    imageObj.src = "tuckthoughts.png";
}