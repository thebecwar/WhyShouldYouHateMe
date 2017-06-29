var daysOfWeek = [ "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY" ];
var monthsOfYear = [ "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER" ];

function ordinal(num)
{
    var ordinalStrings = ['th','st','nd','rd','th','th','th','th','th','th'];
    if (num % 100 >= 11 && num % 100 <= 13)
    {
        return num + "th";
    }
    else
    {
        return num + ordinalStrings[num % 10];
    }
};

function fetch() {
    var query = parseInt(location.search.substring(1));
    if (isNaN(query) || query < 0 || query >= dataset.length)
    {
        query = Math.floor(Math.random() * dataset.length);
    }
    var newsItem = dataset[query];
    newsItem.index = query;
    return newsItem;
};

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

function findFontSize(text, style, context, bounds, max = 40)
{
    for (var i = max; i > 10; i -= 2)
    {
        context.font = style + " " + i + "pt Times";
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

window.onload = function(){
    var canvas = document.getElementById("scratchCanvas");
    var context = canvas.getContext("2d");
    var imageObj = new Image();
    var image = document.getElementById('placeholder');
    imageObj.onload = function(){
        context.drawImage(imageObj, 0, 0, 1528, 446);
        
        // Render Date
        var d = new Date();
        var weekday = daysOfWeek[d.getDay()];
        var month = monthsOfYear[d.getMonth()];
        var day = ordinal(d.getDate());
        var year = d.getFullYear();
        
        context.font = "italic 14pt Times";
        context.fillText(weekday + ", " + month + " " + day + " " + year, 690, 175);
        
        // obtain the headline data
        var text = fetch();

        // render the headline
        if (text.headline.length == 1)
        {
            var headlineRect = { x: 1020, y: 219, width: 491, height: 96 };
            var fontSize = findFontSize(text.headline[0], "bold italic", context, headlineRect);
            context.font = "bold italic " + fontSize + "pt Times";
            drawTextInBox(text.headline[0], context, headlineRect);
        }
        else if (text.headline.length == 2)
        {
            var firstLineRect = { x: 1020, y: 219, width: 491, height: 48 };
            var secondLineRect = { x: 1020, y: 267, width: 491, height: 48 };
            var firstLineFont = findFontSize(text.headline[0], "bold italic", context, firstLineRect);
            var secondLineFont = findFontSize(text.headline[1], "bold italic", context, secondLineRect);
                        
            var fontSize = Math.min(firstLineFont, secondLineFont);
            context.font = "bold italic " + fontSize + "pt Times";

            drawTextInBox(text.headline[0], context, firstLineRect);
            drawTextInBox(text.headline[1], context, secondLineRect);
        }
        
        // render the sub-headline
        if (text.sub.length == 1)
        {
            var subRect = { x: 1020, y: 325, width: 491, height: 84 };
            var fontSize = findFontSize(text.headline[0], "bold italic", context, subRect, 20);
            context.font = "bold italic " + fontSize + "pt Times";
            drawTextInBox(text.sub[0], context, subRect);
        }
        else if (text.sub.length == 2)
        {
            var firstSubRect = { x: 1020, y: 329, width: 491, height: 42 };
            var secondSubRect = { x: 1020, y: 369, width: 491, height: 42 };
            var firstSubFont = findFontSize(text.sub[0], "bold italic", context, firstSubRect, 20);
            var secondSubFont = findFontSize(text.sub[1], "bold italic", context, secondSubRect, 20);
            
            var fontSize = Math.min(firstSubFont, secondSubFont);
            context.font = "bold italic " + fontSize + "pt Times";

            drawTextInBox(text.sub[0], context, firstSubRect);
            drawTextInBox(text.sub[1], context, secondSubRect);
        }
        
        var permalink = document.getElementById('permalink');
        permalink.href = "news.html?" + text.index;
        
        image.src = canvas.toDataURL();
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.remove();
    }
    imageObj.src = "ny_times_template.jpg";
}