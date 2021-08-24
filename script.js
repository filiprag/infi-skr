const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

function imageLoaded(){
    
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
        

    }
}

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    photosArray.forEach((photo) =>{
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target','_blank' );

        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
         img.setAttribute("title", photo.alt_description);

         img.addEventListener('load', imageLoaded);

         item.appendChild(img);

         imageContainer.appendChild(item);

    });
}

const count = 15;
const apiKey = "230y8NL1dsGG1w2z7lxYdPFNcoEFKJhPyQe5KDRJ4X4";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}
`;
// Get photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();

    // console.log(photosArray);
    //   console.log(data);
  } catch (error) {
    // Cacth error here
  }
}

window.addEventListener('scroll', () => {
    // console.log('scrolled!!')
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
} )

// On load

 getPhotos();
