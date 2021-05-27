
import ColorThief from '../node_modules/colorthief/dist/color-thief.mjs';

const colorThief = new ColorThief();

var // where files are dropped + file selector is opened
  dropRegion = document.getElementById("drop-region"),
  // where images are previewed
  imagePreviewRegion = document.getElementById("image-preview"),
  getPalette = document.getElementById("getPalette");

  var dominantColorGenerator = document.querySelector(".dominant-color-generator");
  var colorPaletteGenerator = document.querySelector(".color-palette-generator");
  var paletteColors = document.getElementById("palette-colors");

// open file selector when clicked on the drop region
var inputFile = document.createElement("input");
inputFile.type = "file";
inputFile.accept = "image/*";
inputFile.multiple = false;
dropRegion.addEventListener('click', function () {
  inputFile.click();
});

inputFile.addEventListener("change", function () {
  var files = inputFile.files;
  handleFiles(files);
});

function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
}

dropRegion.addEventListener('dragenter', preventDefault, false)
dropRegion.addEventListener('dragleave', preventDefault, false)
dropRegion.addEventListener('dragover', preventDefault, false)
dropRegion.addEventListener('drop', preventDefault, false)

function handleDrop(e) {
  var dt = e.dataTransfer,
    files = dt.files;
  if (files.length) {
    handleFiles(files);
  } else {

    // check for img
    var html = dt.getData('text/html'),
      match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html),
      url = match && match[1];
    if (url) {
      uploadImageFromURL(url);
      return;
    }
  }


  function uploadImageFromURL(url) {
    var img = new Image;
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");

    img.onload = function () {
      c.width = this.naturalWidth;     // update canvas size to match image
      c.height = this.naturalHeight;
      ctx.drawImage(this, 0, 0);       // draw in image
      c.toBlob(function (blob) {        // get content as PNG blob
        // call our main function
        handleFiles([blob]);
      }, "image/png");
    };
    img.onerror = function () {
      alert("Error in uploading");
    }
    img.crossOrigin = "";              // if from different origin
    img.src = url;
  }
}

dropRegion.addEventListener('drop', handleDrop, false);

function handleFiles(files) {
  for (var i = 0, len = files.length; i < len; i++) {
    if (validateImage(files[i]))
      previewAnduploadImage(files[i]);
  }
}

function validateImage(image) {
  // check the type
  var validTypes = ['image/jpeg','image/jpg','image/png','image/gif','image/svg+xml'];
  if (validTypes.indexOf(image.type) === -1) {
    alert("File type is not supported!");
    return false;
  }
  return true;
}

function previewAnduploadImage(image) {
  // container
  var imgView = document.createElement("div");
  imgView.className = "image-view";
  imagePreviewRegion.appendChild(imgView);
  imagePreviewRegion.insertBefore(imgView, imagePreviewRegion.childNodes[0]);

  // previewing image
  var img = document.createElement("img");
  img.classList.add('source-image')
  imgView.appendChild(img);
  getPalette.hidden = false;
  paletteColors.classList.add('hidden')
  var dropMessage = document.getElementsByClassName('drop-message')[0];
  dropMessage.style.display = "none";

  // read the image...
  var reader = new FileReader();
  reader.onload = function (e) {
    img.src = e.target.result;
  }
  reader.readAsDataURL(image);
}

getPalette.addEventListener('click', function (e) {
  const colorThief = new ColorThief();
  const image = document.querySelector('.source-image');

  if (image.complete) {
    console.log(colorThief.getPalette(image,5));
    const paletteValue = colorThief.getPalette(image,5);
    const hexValue = [];
    paletteValue.forEach(item => {
      // console.log(paletteValue[0], "item 1");
      const value = rgbToHex(item[0], item[1], item[2])
      hexValue.push(value);
      console.log(value);
    })
    // const value = rgbToHex(paletteValue[0][0], paletteValue[0][1], paletteValue[0][2]);
    for(let i = 0; i < hexValue.length; i++){
      if(hexValue[i] == hexValue[0]){
        var dominantColor = document.createElement("div");
        dominantColor.classList.add("dominant-color");
        dominantColor.style.backgroundColor = hexValue[i];
        dominantColorGenerator.appendChild(dominantColor);
        var colorGenerator = document.createElement("div");
        colorGenerator.classList.add("color-palette");
        colorGenerator.style.backgroundColor = hexValue[i];
        colorPaletteGenerator.appendChild(colorGenerator);
      }
      else{  
        var colorGenerator = document.createElement("div");
        colorGenerator.classList.add("color-palette");
        colorGenerator.style.backgroundColor = hexValue[i];
        colorPaletteGenerator.appendChild(colorGenerator);
      }
    }
    getPalette.hidden="true";
    paletteColors.classList.remove("hidden");
  } else {
    image.addEventListener('load', function() {
      colorThief.getPalette(image, 5)
    });
  }
});

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')
