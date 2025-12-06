'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })


//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "todo") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        
        for(let i = 0; i < pages.length; i++) {
            if(this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                pages[i].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove('active');
                navigationLinks[i]. classList.remove('active');
            }
        }
    });
}

// Project Modal Functionality

const modal = document.querySelector('[data-modal]');
const modalOverlay = document.querySelector('[data-modal-overlay]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalCategory = document.querySelector('[data-modal-category]');
const modalDescription = document.querySelector('[data-modal-description]');
const galleryContainer = document.querySelector('[data-gallery-container]');
const prevBtn = document.querySelector('[data-gallery-prev]');
const nextBtn = document.querySelector('[data-gallery-next]');

let currentImageIndex = 0;
let projectImages = [];

// Abrir modal al hacer click en un proyecto
const projectModalLinks = document.querySelectorAll('[data-project-modal]');

projectModalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Obtener datos del proyecto
        const title = this.dataset.projectTitle;
        const category = this.dataset.projectCategory;
        const description = this.dataset.projectDescription;
        const images = JSON.parse(this.dataset.projectImages);
        
        // Actualizar contenido del modal
        modalTitle.textContent = title;
        modalCategory.textContent = category;
        modalDescription.textContent = description;
        projectImages = images;
        currentImageIndex = 0;
        
        // Cargar imágenes en la galería
        loadGalleryImages();
        updateGalleryButtons();
        
        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Cerrar modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Cerrar con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Cargar imágenes en la galería
function loadGalleryImages() {
    galleryContainer.innerHTML = '';
    projectImages.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Imagen del proyecto ${index + 1}`;
        img.loading = 'lazy';
        galleryContainer.appendChild(img);
    });
    updateGalleryPosition();
}

// Navegar a la imagen anterior
prevBtn.addEventListener('click', function() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateGalleryPosition();
        updateGalleryButtons();
    }
});

// Navegar a la siguiente imagen
nextBtn.addEventListener('click', function() {
    if (currentImageIndex < projectImages.length - 1) {
        currentImageIndex++;
        updateGalleryPosition();
        updateGalleryButtons();
    }
});

// Actualizar posición de la galería
function updateGalleryPosition() {
    const offset = -currentImageIndex * 100;
    galleryContainer.style.transform = `translateX(${offset}%)`;
}

// Actualizar visibilidad de botones de navegación
function updateGalleryButtons() {
    if (projectImages.length <= 1) {
        prevBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
    } else {
        prevBtn.classList.toggle('hidden', currentImageIndex === 0);
        nextBtn.classList.toggle('hidden', currentImageIndex === projectImages.length - 1);
    }
}

//formulario de contacto

const btn = document.getElementById('boton');

document.getElementById('form')
.addEventListener('submit', function(event) {
event.preventDefault();

btn.value = 'Enviando...';

const serviceID = 'default_service';
const templateID = 'template_rcdb2ut';

emailjs.sendForm(serviceID, templateID, this)
.then(() => {
btn.value = 'Enviar mensaje →';
alert('Enviado!');
}, (err) => {
btn.value = 'Enviar mensaje →';
alert(JSON.stringify(err));
});
});