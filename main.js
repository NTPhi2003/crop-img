const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const inpFile = $('.inpFile')
const previewContainer = $('#imagePreview')
const previewImage = document.getElementById('fileIMG')
const previewDefaultText = $('.image-preview__default-text')
const canvasCrop = document.getElementById('canvas');
const downloadContainer = $('.download-container');
const downloadBtn = $('.download');
canvasCrop.style.display = "none";
const myCanvas = $('.test');
const resize_canvas = document.createElement('canvas')

inpFile.addEventListener("change", function() {
    var file = this.files[0]
    
    if (file) {

        previewDefaultText.style.display = "none";
        previewImage.style.display = "block";

        // reader.readAsDataURL(file)
        window.URL = window.URL || window.webkitURL;
        var blobURL = window.URL.createObjectURL(file);
        context = myCanvas.getContext('2d');
        
        make_base();
        function make_base()
        {
          base_image = new Image();
          base_image.src = blobURL;
          base_image.onload = function(){
            myCanvas.width = this.naturalWidth;
            myCanvas.height = this.naturalHeight;
            hRatio = myCanvas.width / this.naturalWidth;
            vRatio = myCanvas.height /this.naturalHeight;
            context.drawImage(this, 0, 0);
          }
        }
    
        myCanvas.style.display = "block";
        canvasCrop.style.display = null;     
        downloadBtn.addEventListener('click',downloadfuc)
    } else {
        canvasCrop.style.display = "none";
        previewDefaultText.style.display = null;
        previewImage.style.display = "none";
    }
})


dragElement(canvasCrop);

// Drag
// dragElement(canvasCrop);
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    
function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    
    var rect = previewContainer.getBoundingClientRect();
    var rect2 = canvasCrop.getBoundingClientRect();
// NGĂN KO CHO CANVAS CHẠY RA NGOÀI
    if(rect.top > rect2.top) {
        elmnt.style.top = -2 + "px";
    }
    if(rect.bottom < rect2.bottom) {
        elmnt.style.top = null;
        elmnt.style.bottom = -2 + "px";
    }
  
    if(rect.left > rect2.left) {
        
        // elmnt.style.top = null;
        elmnt.style.left = -2 + "px";
    }
    if(rect.right < rect2.right) {
        
        elmnt.style.left = null;
        elmnt.style.right = -2 + "px";
    }
    console.log(rect2.top, rect2.left)
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// DOWNLOAD IMG
function crop() {
  resize_canvas.width = 300;
  resize_canvas.height = 300;
  var imgToaDo = myCanvas.getBoundingClientRect();
  var rect2 = canvasCrop.getBoundingClientRect();
  var img_x = imgToaDo.left - rect2.left;
  var img_y = imgToaDo.top - rect2.top;
  var ctx = resize_canvas.getContext('2d');
    ctx.drawImage(myCanvas,img_x,img_y, myCanvas.clientWidth, myCanvas.clientHeight);
}
var downloadfuc = function() {
  crop();
  //create a temporary link for the download item
  let tempLink = document.createElement('a');

  //generate a new filename
  let fileName = `image-cropped.jpg`;
  
  //configure the link to download the resized image
  tempLink.download = fileName;
  tempLink.href = resize_canvas.toDataURL("image/jpeg", 1.0);

  //trigger a click on the link to start the download
  tempLink.click();
};