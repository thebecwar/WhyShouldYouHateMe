function processInput()
{
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.id = 'scratchCanvas';
    canvas.width = 761;
    canvas.height = 434;
    
    window.onload();
}

window.onload = function(){
    var canvas = document.getElementById("scratchCanvas");
    var context = canvas.getContext("2d");
    var imageObj = new Image();
    var image = document.getElementById('placeholder');
    imageObj.onload = function(){
        context.drawImage(imageObj, 0, 0, 761, 434);
        
        var name = "Ken White";
        var caption = "It's not RICO, damnit";
        
        var node = document.getElementById('name');
        if (node.value.length > 0)
            name = node.value;
        node = document.getElementById('caption');
        if (node.value.length > 0)
            caption = node.value;
        
        // Name
        context.font = "17pt Sans-Serif";
        context.fillText(name, 157, 370);

        context.font = "14pt Sans-Serif";
        context.fillText(caption, 157, 393);
        
        image.src = canvas.toDataURL();
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.remove();
    }
    imageObj.src = "KenWhite.jpg";
}