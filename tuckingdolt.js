// Main Text Color: #000000
// Name Text Color: #ffffff

var cropper;
var cropBounds;
var interviewImg = null;

function crop() {
    cropper.destroy();
    cropper = null;
    hideImageSelection();
    processInput();
}

function showImageSelection() {
    document.getElementById("imagepicker").style.display = "block";
    var img = document.getElementById('interviewee');
    interviewImg = img;
    img.onload = function() {
        var img = document.getElementById('interviewee');
        cropper = new Cropper(img, {
        aspectRatio: 1.186,
        crop: function(event) {
            cropBounds = event.detail;
            //console.log(event.detail.x);
            //console.log(event.detail.y);
            //console.log(event.detail.width);
            //console.log(event.detail.height);
            //console.log(event.detail.rotate);
            //console.log(event.detail.scaleX);
            //console.log(event.detail.scaleY);
        }});
    }
}

function hideImageSelection() {
    document.getElementById("imagepicker").style.display = "none";
}

function onFileSelected(event) {
  var selectedFile = event.target.files[0];
  var reader = new FileReader();

  var imgtag = document.getElementById("interviewee");
  imgtag.title = selectedFile.name;

  reader.onload = function(event) {
    imgtag.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);
  
  showImageSelection();
  
}

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

function drawTextInBox(text, context, bounds, arrow=false)
{
    var size = context.measureText(text);
    size.height = determineFontHeight("font: " + context.font);
    
    var x = ((bounds.width - size.width) / 2) + bounds.x;
    var y = ((bounds.height - size.height) / 2) + bounds.y;
    
    context.textBaseline = 'hanging';
    
    if (arrow)
    {
        context.beginPath();
        
        context.moveTo(x - 60, bounds.y + 5);
        context.lineTo(x - 20, bounds.y + (bounds.height / 2))
        context.lineTo(x - 60, bounds.y + bounds.height - 10);
        context.closePath();
        context.fill();        
    }
    
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
    var fahbiooo = new Image();
    fahbiooo.crossOrigin="anonymous";
    imageObj.crossOrigin="anonymous";
    var image = document.getElementById('placeholder');
    imageObj.onload = function(){
        if (interviewImg != null)
        {
            context.drawImage(fahbiooo, cropBounds.x, cropBounds.y, cropBounds.width, cropBounds.height, 1287, 41, 1196, 1008);
        }
        else
        {
            context.drawImage(fahbiooo, 1287, 41, 1196, 1008);
        }
        context.drawImage(imageObj, 0, 0, 2554, 1420);
        
        var caption = "geese: dangerous menace";
        var caption2 = "";
        var name = "FABIO";
        var occupation = "Some kind of model or something";
		
        node = document.getElementById('caption');
        if (node.value.length > 0)
            caption = node.value.toLowerCase();
        
		node = document.getElementById('caption2');
        if (node.value.length > 0)
            caption2 = node.value.toLowerCase();
		
        node = document.getElementById('name');
        if (node.value.length > 0)
            name = node.value.toUpperCase();
        
        node = document.getElementById('occupation');
        if (node.value.length > 0)
            occupation = node.value.toUpperCase();
        
        name = name + "   |   " + occupation;
        
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

        
        
        var nameBounds = { x: 397, y: 1071, width: 2009, height: 58};
		var size = findFontSize(name, "", context, nameBounds);
        context.font = "small-caps bold " + size + "pt Sans-Serif "
        context.fillStyle = '#f9f3a9'
        drawTextInBox(name, context, nameBounds, true);
        
        image.src = canvas.toDataURL();
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.remove();
    }
    if (interviewImg != null)
    {
        fahbiooo.src = interviewImg.src;
    }
    else
    {
        fahbiooo.src = "Fahbio.png";
    }
    imageObj.src = "TuckYourselfIn.png";
}