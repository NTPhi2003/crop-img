const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const inpFile = $('.inpFile')
const previewContainer = $('#imagePreview')
const previewImage = $('.image-preview__image')
const previewDefaultText = document.querySelector('.image-preview__default-text')

inpFile.addEventListener("change", function() {
    const file = this.files[0]
    
    if (file) {
        const reader = new FileReader()

        previewDefaultText.style.display = "none";
        previewImage.style.display = "block";
        
        reader.addEventListener("load", function() {
            console.log(this)
            previewImage.setAttribute("scr", this.result)
        })

        reader.readAsDataURL(file)

    } else {
        previewDefaultText.style.display = null;
        previewImage.style.display = null;
        previewImage.setAttribute("scr", "")
    }
})