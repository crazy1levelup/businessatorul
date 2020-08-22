const sharp = require('sharp');

const resizeImg = (file) => {
    sharp(file.path).resize(400, 400).toFile('uploads/' + 'thumbnails-' + file.filename.split('.')[0] + '.jpeg', (err, resizeImage) => {
        if (err) {
            console.log(err)
        } else {
            console.log(resizeImage)
        }
    })
}

module.exports = resizeImg