function processInput()
{
    var node = document.getElementById('headline1');
    var head = [];
    head[0] = node.value;
    
    node = document.getElementById('headline2');
    if (node.value.length > 0)
    {
        head[1] = node.value;
    }
    
    node = document.getElementById('sub1');
    var s = [];
    s[0] = node.value;
    
    node = document.getElementById('sub2');
    if (node.value.length > 0)
    {
        s[1] = node.value;
    }
    
    dataset = [];
    dataset[0] = { headline: head, sub: s }
    
    // <canvas id='scratchCanvas' width='1528px' height='446px'></canvas>
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.id = 'scratchCanvas';
    canvas.width = 1528;
    canvas.height = 446;
    
    window.onload();
}