/* eslint-disable prettier/prettier */
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
// const cloud = require('@google-cloud/storage');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const { v4 } = require('uuid');


const gcs = new Storage({
    projectId: "majaloc",
    keyFilename: "majaloc-firebase-adminsdk-fipuy-6ef4fefbb6.json"
});

const bucketName = 'majaloc.appspot.com';

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


// // async function to remove a path from project
function removePath(path) {
    fs.unlink(path, (err) => {
        if (err) { console.error(err); return; }
        //file removed
    })
}

// exports.majaPlace = functions.https.onRequest((request, response) => {
//     const body = JSON.parse(request.body);
//     // const body = request.body;
//     // return response.send({ data: `Welcome to ${body.name}` });
//     return response.status(201).json({ data: `Welcome to ${body.name}` });
// });

// exports.majaPlace = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//         const body = JSON.parse(request.body);
//         // return response.send({ data: `Welcome to ${body.name}` });
//         return response.status(201).json({ data: `Welcome to a ${body.name}` });
//     })
// });

exports.storeImage = functions.https.onRequest((request, response) => {
    /* functions.logger.info('Hello logs!', {structuredData: true});
    response.send('Hello from Firebase!'); */
    const uuid = v4();

    cors(request, response, async () => {
        const body = JSON.parse(request.body);


        try {
            await fs.writeFileSync('tmp/uploaded-image.jpg', body.image, 'base64', (err) => {
                if (err) {
                    console.log(err);
                    response.status(500).json({ error: err });
                }
            });
            await gcs.bucket(bucketName).upload('tmp/uploaded-image.jpg', {
                // Support for HTTP requests made with `Accept-Encoding: gzip`
                gzip: true,
                uploadType: 'media',
                destination: '/places/' + uuid + '.jpg',
                metadata: {
                    metadata: {
                        contentType: 'image/jpeg',
                        event: 'Fall trip to the zoo',
                        cacheControl: 'public, max-age=31536000',
                    }
                },
            }
            );
            return response.status(201).json({
                data: `https://storage.googleapis.com/${bucketName}/tmp/uploaded-image.jpg,`
            });

        } catch (error) {
            console.log('error encounter');
            // if (req.filePath) {
            //     await removePath(req.filePath);
            // }
            return response.status(500).json({ error: { message: error } });
        }



    });


});
