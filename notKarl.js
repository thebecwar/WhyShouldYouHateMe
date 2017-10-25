function hidingToggled()
{
    if (document.getElementById('hiding').checked)
    {
        document.getElementById('name').disabled = true;
        document.getElementById('caption').disabled = true;
    }
    else
    {
        document.getElementById('name').disabled = false;
        document.getElementById('caption').disabled = false;
    }
}

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
    // Ensure state is correct.
    hidingToggled();
    
    var canvas = document.getElementById("scratchCanvas");
    var context = canvas.getContext("2d");
    var imageObj = new Image();
    var image = document.getElementById('placeholder');
    
    var patch = new Image();
    patch.src = "Eyepatch.png";
    var tat = new Image();
    tat.src = "Tat.png";
    
    var nameindex = Math.floor(Math.random() * (names.length));
    var n = names[nameindex];
    document.getElementById('seekritName').value = n;
    
    
    imageObj.onload = function(){
        context.drawImage(imageObj, 0, 0, 761, 434);
        
        var name = "Ken White";
        var caption = "It's not RICO, damnit";
        var hiding = document.getElementById('hiding').checked;
        
        if (hiding)
        {
            context.drawImage(patch, 0, 0, 761, 434);
            context.drawImage(tat, 0, 0, 761, 434);
            
            name = document.getElementById('seekritName').value;
            caption = "Not Ken White. Definitely Not."
        }
        else
        {
            var node = document.getElementById('name');
            if (node.value.length > 0)
                name = node.value;
            node = document.getElementById('caption');
            if (node.value.length > 0)
                caption = node.value;
        }
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

// BELOW HERE IS THE NAME LIST. IT IS HUGE.
