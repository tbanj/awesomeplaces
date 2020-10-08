/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// require('dotenv').config();
// const fs = require('fs');
// const { Storage } = require('@google-cloud/storage');

// // Creates a client
// const storage = new Storage({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     keyFilename: "majaloc-firebase-adminsdk-fipuy-6ef4fefbb6.json",
//     // keyFilename: filePathKey,
// });

// const bucketName = 'majaloc.appspot.com';


// const waitForFilePath = (req, res) => {
//     return new Promise((resolve, reject) => {
//         getFilePath(req, res, (err) => {
//             if (err) reject(err);
//             resolve({ path: req.filePath, filename: req.filename })

//         })
//     })
// }

// async function multiPartUpload(req, res) {
//     const datan = { ...req.body }
//     var uploadID = null;
//     try {
//         await waitForFilePath(req, res);
//         await storage.bucket(bucketName).upload(req.filePath, {
//             // Support for HTTP requests made with `Accept-Encoding: gzip`
//             gzip: true,
//             metadata: {
//                 metadata: {
//                     // contentType: 'image/jpeg',
//                     event: 'Fall trip to the zoo',
//                     cacheControl: 'public, max-age=31536000',
//                 }
//             },
//         });
//         console.log(`${req.filePath} uploaded to firebase.`);

//         // generateSignedUrl(req.filePath).catch(console.error);
//         await removePath(req.filePath);
//         return res.status(201).send({ data: `https://storage.googleapis.com/${bucketName}/${req.filename}` });
//     } catch (error) {
//         console.log('error encounter');
//         if (req.filePath) {
//             await removePath(req.filePath);
//         }
//         res.status(400).send({ error: { message: error.message } });
//     }
// }


// //  get signedUrl
// async function generateSignedUrl(filename) {
//     // These options will allow temporary read access to the file
//     const options = {
//         version: 'v2', // defaults to 'v2' if missing.
//         action: 'read',
//         expires: Date.now() + 1000 * 60 * 60, // one hour
//     };

//     // Get a v2 signed URL for the file
//     const [url] = await storage
//         .bucket(bucketName)
//         .file(filename)
//         .getSignedUrl(options);
//     console.log(`The signed url for ${filename} is ${url}.`);
// }


// // async function to remove a path from project
// function removePath(path) {
//     fs.unlink(path, (err) => {
//         if (err) { console.error(err); return; }
//         //file removed
//     })
// }
// exports.storeImage = functions.https.onRequest((request, response) => {
//     response.send('Hello from Firebase!');
// })
// // module.exports = { multiPartUpload }