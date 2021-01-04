
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const docxConverter = require('docx-pdf');

module.exports = async function (context, myBlob) {
    context.log("JavaScript blob trigger function processed blob \n Blob:", context.bindingData.blobTrigger, "\n Blob Size:", myBlob.length, "Bytes");

    context.log("Creating temp directories");

    const fileExtension = context.bindingData.blobTrigger.split('.').pop();

    context.log("File Extension :", fileExtension);
    const tempDir = 'temp';
    const tempName = uuidv4();
    const tempFileName = tempName + "." + fileExtension;
    const tempFilePath = tempDir + '/' + tempFileName;

    const tempOutput = tempDir + '/' + tempName + '.pdf';

    if(!fs.existsSync(tempDir)){
        fs.mkdirSync(tempDir)
    }

    fs.writeFileSync(tempFilePath, myBlob);

    docxConverter(tempFilePath, tempOutput, (err, result) => {
        if(err) {
            context.log("convertion failed");
        } else {
            context.log("Conversion succeeded", result);
        }

        context.done();
    })

};