var images = [
  '0003.jpg',
  '0004.jpg',
  '0005.jpg',
  '0006.jpg',
  '0007.jpg',
  '0008.jpg',
  '0009.jpg',
  '0010.jpg',
  '0011.jpg',
  '0012.jpg',
  '0013.jpg',
  '0014.jpg',
  '0015.jpg',
  '0016.jpg',
  '0017.jpg',
  '0018.jpg',
  '0019.jpg',
  '0020.jpg',
  '0021.jpg',
  '0022.jpg',
  '0023.jpg',
  '0024.jpg',
  '0025.jpg',
  '0026.jpg',
  '0027.jpg',
  '0028.jpg',
  '0029.jpg',
  '0030.jpg',
  '0031.jpg',
  '0032.jpg',
];


window.onload = function() {
  var img = document.getElementById('card');
  var idx = Math.floor(Math.random() * images.length);
  var url = 'threadnought-img/' + images[idx];
  img.src = url;
};
