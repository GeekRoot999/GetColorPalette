
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

dropRegion.addEventListener('dragenter', preventDefault, false);
dropRegion.addEventListener('dragleave', preventDefault, false);
dropRegion.addEventListener('dragover', preventDefault, false);
dropRegion.addEventListener('drop', preventDefault, false);

function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
}

// open file selector when clicked on the drop region
var inputFile = document.createElement("input");
inputFile.type = "file";
inputFile.accept = "image/*";
dropRegion.addEventListener('click', ()=>{
  inputFile.click();
});

inputFile.addEventListener("change", changeInputState);

function changeInputState() {
  var files = inputFile.files;
  handleFiles(files);
};

dropRegion.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  var dt = e.dataTransfer,
    files = dt.files;
  if (files.length) {
    handleFiles(files);
  } else {
    // alert('Allowed to upload one image at a time');
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

function handleFiles(files) {
  for (var i = 0, len = files.length; i < len; i++) {
    if (validateImage(files[i])){
      previewAnduploadImage(files[i]);
    }
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

const createImageDivContainer = () =>{
  // container
  var imgView = document.createElement("div");
  imgView.className = "image-view";
  imagePreviewRegion.appendChild(imgView);
  imagePreviewRegion.insertBefore(imgView, imagePreviewRegion.childNodes[0]);
  return imgView;
}

const previewImage = (imageDivContainer) =>{
  var img = document.createElement("img");
  img.classList.add('source-image')
  imageDivContainer.appendChild(img);
  getPalette.hidden = false;
  paletteColors.classList.add('hidden')
  document.getElementsByClassName('drop-message')[0].style.display = "none";
  return img;
}

function previewAnduploadImage(image) {
  //image container div is created
  var imageDivContainer = createImageDivContainer();

  // preview image
  var imgPreview =  previewImage(imageDivContainer);

  // read the image...
  var reader = new FileReader();
  reader.onload = function (e) {
    imgPreview.src = e.target.result;
  }
  reader.readAsDataURL(image);
  dropRegion.removeEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
  });
  inputFile.removeAttribute("type");
  inputFile.removeEventListener("change", changeInputState);  
}

const dominantColorHolder = (value) => {
  var dominantColor = document.createElement("div");
  dominantColor.classList.add("dominant-color");
  dominantColor.style.backgroundColor = value;
  createDominantText(value, dominantColor);
  dominantColorGenerator.appendChild(dominantColor);
  console.log(dominantColor);
  dominantColor.addEventListener("click", (e)=>{
    var x = value;
    copyToClipboard(x);
  });
}

const colorPaletteHolder = (value) => {
  var colorGenerator = document.createElement("div");
  colorGenerator.classList.add("color-palette");
  colorGenerator.style.backgroundColor = value;
  createPaletteText(value, colorGenerator);
  colorPaletteGenerator.appendChild(colorGenerator);
  colorGenerator.addEventListener("click", (e)=>{
    var x = value;
    copyToClipboard(x);
  });
}

const createDominantText = (value, dominantColor) => {
  var span = document.createElement("span");
  span.classList.add('text');
  span.style.color = value;
  span.textContent = value;
  dominantColor.appendChild(span);
}

const createPaletteText = (value, colorGenerator) => {
  var span = document.createElement("span");
  span.classList.add('text');
  span.style.color = value;
  span.textContent = value;
  colorGenerator.appendChild(span);
}

const insertPalette = (hexValue) => {
  for(let i = 0; i < hexValue.length; i++){
    if(hexValue[i] == hexValue[0]){
      dominantColorHolder(hexValue[i]);
      colorPaletteHolder(hexValue[i]);
    }
    else{  
      colorPaletteHolder(hexValue[i]);
    }
  }
}

getPalette.addEventListener('click', (e) => {
  const colorThief = new ColorThief();
  const image = document.querySelector('.source-image');

  if (image.complete) {
    // console.log(colorThief.getPalette(image,5));
    const paletteValue = colorThief.getPalette(image,5);
    const hexValue = [];
    paletteValue.forEach(item => {
      const value = rgbToHex(item[0], item[1], item[2])
      hexValue.push(value);
    })
    // const value = rgbToHex(paletteValue[0][0], paletteValue[0][1], paletteValue[0][2]);

    //To place the HexValue inside the specific Div
    insertPalette(hexValue);
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

const copyToClipboard = (x) => {
  const el = document.createElement('textarea');
  el.value = x;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
  toastMessage();
};

const toastMessage = () => {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ 
      x.className = x.className.replace("show", ""); 
    }, 3000);
}