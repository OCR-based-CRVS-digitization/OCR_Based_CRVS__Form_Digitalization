const axios = require('axios');
const tesseract = require('tesseract.js');
const fs = require('fs');
const { log, error } = require('console');

const perform_ocr = async (imagePath, region) => {
    const worker = await tesseract.createWorker();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imagePath, {
        rectangle: { left: region[0], top: region[1], width: region[2], height: region[3] },
    });
    await worker.terminate();
    return text;
};


const ocr_letter_by_letter = async(imagePath, regions) => {
    let text = ""
    for ( let regionInfo of regions) {
        char = await perform_ocr(imagePath, regionInfo.region)
        char = char.replace(/\n/g, '')
        text += char
    }
    return text
}


// read json data from region.csv
var data = fs.readFileSync('../region.json', 'utf8');
var fields = JSON.parse(data)

const base_path = "../form-images/"

var pdf_id = '1';

// iterate through the fields 
for ( let field of fields ) {
    var imagePath = base_path + pdf_id + "/jpg/" + pdf_id + "." + field.page_number +".jpg";
    if ( field.type == 'OCR_WORD' && field.page_number == '1' ){
        let region = field.regions[0].region
        
        perform_ocr(imagePath, region).then((text) => {
            console.log(field.name , " : " , text);
        }).catch((error) => {
            console.log(error)
            console.log(field)
        });
    } else if (field.type == "OCR_CHAR" && field.page_number == '1') {
        ocr_letter_by_letter(imagePath, field.regions).then((text) =>{
            console.log(field.name, " : ", text);
        });
    }
}




