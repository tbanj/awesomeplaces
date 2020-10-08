/* eslint-disable prettier/prettier */
const functions = require('firebase-functions');
const cors = require('cors')({ orgin: true });
const cloud = require('@google-cloud/storage');
const fs = require('fs');
const { v4 } = require('uuid');

const { Storage } = cloud
const gcconfig = {
    projectId: 'majaloc',
    keyFilename: "majaloc-firebase-adminsdk-fipuy-6ef4fefbb6.json",
}

const gcs = new Storage();

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

exports.majaPlace = functions.https.onRequest((request, response) => {
    const body = request.body
    response.send(`Welcome to ${body.name}`);
})

exports.storeImage = functions.https.onRequest((request, response) => {
    /* functions.logger.info('Hello logs!', {structuredData: true});
    response.send('Hello from Firebase!'); */
    const uuid = v4();

    cors(request, response, async () => {
        console.log('request.body', request.body);
        const body = JSON.parse(request).body;
        // const body = request.body;
        fs.writeFileSync('tmp/uploaded-image.jpg', body.image, 'base64', (err) => {
            if (err) {
                console.log(err);
                response.status(500).json({ error: err });
            }
        });
        const bucket = gcs.bucket('majaloc.appspot.com');

        // await storage.bucket(bucketName).upload(req.filePath, {
        //     // Support for HTTP requests made with `Accept-Encoding: gzip`
        //     gzip: true,
        //     metadata: {
        //         metadata: {
        //             // contentType: 'image/jpeg',
        //             event: 'Fall trip to the zoo',
        //             cacheControl: 'public, max-age=31536000',
        //         }
        //     },
        // });
        // const bucket =  gcs.bucket('albums');
        await bucket.upload('tmp/uploaded-image.jpg', {
            uploadType: 'media',
            destination: '/places/' + uuid + '.jpg',
            metadata: {
                metadata: {
                    contentType: 'image/jpeg',
                    firebaseStorageDownloadTokens: uuid,
                }
            }
        }, async (err, file) => {

            if (!err) {
                // console.log('file', file);
                console.log('file', file);
                // await removePath('tmp/uploaded-image.jpg');
                response.status(201).json({ data: bucket.name + '/o/' + encodeURIComponent(file.name) })
                // response.status(201).json({
                //     imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' +
                //         bucket.name + '/o/' + encodeURIComponent(file.name) + '?alt=media$token' +
                //         uuid
                // })
            } else {
                console.log(err);
                response.status(500).json({ error: err });
            }
        });



    });


});
