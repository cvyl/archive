const Caman = require('caman');
const Jimp = require('jimp');
const lwip = require('lwip');


// Select DOM elements
const fileInput = document.querySelector('#file-input');
const conversionType = document.querySelector('#conversion-type');
const compressionLevel = document.querySelector('#compression-level');
const grayscale = document.querySelector('#grayscale');
const watermark = document.querySelector('#watermark');
const watermarkFile = document.querySelector('#watermark-file');
const hue = document.querySelector('#hue');
const saturation = document.querySelector('#saturation');
const result = document.querySelector('#result');

// Listen for file input change
fileInput.addEventListener('change', async e => {
  const file = e.target.files[0];

  // Use Jimp to read the image file
  const image = await Jimp.read(file);

  // Apply image manipulation using Caman and lwip
  Caman(image.bitmap.data, image.bitmap.width, image.bitmap.height, function () {
    // Apply conversion type
    switch (conversionType.value) {
      case 'jpeg-to-png':
        this.save(image, 'png');
        break;
      case 'png-to-jpeg':
        this.save(image, 'jpeg');
        break;
      case 'bmp-to-jpg':
        this.save(image, 'jpg');
        break;
    }

    // Apply compression level
    this.quality(compressionLevel.value);

    // Apply grayscale
    if (grayscale.checked) {
      this.greyscale();
    }


      // Apply hue and saturation
      this.hue(hue.value);
      this.saturation(saturation.value);

      // Render image
      this.render();
    });

  reader.readAsDataURL(file);
  });