const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const inpFile = $('.inpFile')
const previewContainer = $('#imagePreview')
const previewImage = document.getElementById('fileIMG')
const previewDefaultText = $('.image-preview__default-text')

inpFile.addEventListener("change", function() {
    var file = this.files[0]
    
    if (file) {
        // const reader = new FileReader()

        
        previewDefaultText.style.display = "none";
        previewImage.style.display = "block";
        // reader.addEventListener("load", function() {
        //     console.log(this)
        //     // previewImage.setAttribute("scr", this.result);
        //     previewImage.scr = 'this.result'
            
        // })

        // reader.readAsDataURL(file)
        window.URL = window.URL || window.webkitURL;
        var blobURL = window.URL.createObjectURL(file);
        document.getElementById('fileIMG').innerHTML = '<img src="' + blobURL + '" alt="Image preview" class="image-preview__image" />';

    } else {
        previewDefaultText.style.display = null;
        previewImage.style.display = "none";
        previewImage.setAttribute("scr", "")
    }
})