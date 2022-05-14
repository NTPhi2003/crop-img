const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const inpFile = $('.inpFile')
const previewContainer = $('#imagePreview')
const previewImage = document.getElementById('fileIMG')
const previewDefaultText = $('.image-preview__default-text')
const canvasCrop = document.getElementById('canvas');
 canvasCrop.style.display = "none";
inpFile.addEventListener("change", function() {
    var file = this.files[0]
    
    if (file) {

        previewDefaultText.style.display = "none";
        previewImage.style.display = "block";

        // reader.readAsDataURL(file)
        window.URL = window.URL || window.webkitURL;
        var blobURL = window.URL.createObjectURL(file);
        document.getElementById('fileIMG').innerHTML = '<img src="' + blobURL + '" alt="Image preview" class="image-preview__image previewed_img" />';
        canvasCrop.style.display = null;
        var previewedImg = document.querySelector('.previewed_img');


    // KHÚC NÀY EM CẦN SET ĐỂ LINE 79 canvas nó trong thg img thôi, hiện tại nó chỉ trong imgContainer
        console.log(previewContainer.offsetHeight);       // ---> 0 ???         
                                    
        // previewContainer.style.width = previewedImg.offsetWidth + 'px';
        // previewContainer.style.height = previewedImg.offsetHeight + 'px';

    } else {
        canvasCrop.style.display = "none";
        previewDefaultText.style.display = null;
        previewImage.style.display = "none";
        previewImage.setAttribute("scr", "")
    }
})


dragElement(canvasCrop);
canvasCrop.addEventListener('dragstart', dragStart);
function dragStart(){
  console.log('start')
}
// Drag
// dragElement(canvasCrop);
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    canvasCrop.onmousedown = dragMouseDown;
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
        elmnt.style.top = 0 + "px";
    }
    if(rect.bottom < rect2.bottom) {
        elmnt.style.top = null;
        elmnt.style.bottom = 0 + "px";
    }
  
    if(rect.left > rect2.left) {
        
        // elmnt.style.top = null;
        elmnt.style.left = 0 + "px";
    }
    if(rect.right < rect2.right) {
        
        elmnt.style.left = null;
        elmnt.style.right = 0 + "px";
    }
    // if(canvasCrop.style.top === previewedImg.style.top) console.log('test')
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

