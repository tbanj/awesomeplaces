/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// const formidable = require('formidable');
// const fs = require('fs');
// const path = require('path');
// const { verifyMini } = require('./formidable')

// const getFilePath = (req, res, next) => {

//     try {
//         const form = new formidable.IncomingForm();
//         form.uploadDir = path.join(__dirname, '../public/uploads');
//         let filePath = 'no file path';
//         let fileName;
//         form.on('file', (field, file) => {

//             if (file.size === 0) {
//                 res.status(401).send({ error: { message: "No file detected" } });
//                 throw new Error();
//             }
//             fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
//                 if (err) res.status(400).json({ err });
//             })
//             filePath = form.uploadDir + '/' + file.name;
//             fileName = file.name;
//         });
//         form.on('field', (name, value) => {
//             req.body[name] = value;

//         })
//         form.on('error', (err) => res.send({ "error": err }))
//         form.on('end', () => {
//             req.filePath = filePath;
//             req.fileName = `${verifyMini()}-${fileName}`;
//             req.filename = fileName;
//             next();

//         });

//         form.parse(req);
//     } catch (error) {
//         removePath(filePath);
//         return res.status(401).send({ error: { message: "Error encounter when uploading data" } });

//     }
// }


// function removePath(path) {
//     try {
//         fs.unlinkSync(path)
//         //file removed
//     } catch (err) {
//         console.error(err)
//     }
// }





// module.exports = getFilePath;