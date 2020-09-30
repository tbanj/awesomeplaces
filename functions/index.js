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

const gcs = new Storage(gcconfig)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.storeImage = functions.https.onRequest((request, response) => {
  /* functions.logger.info('Hello logs!', {structuredData: true});
  response.send('Hello from Firebase!'); */
  const uuid = v4();

  cors(request, response, () => {
    const body = JSON.parse(request.body);
    fs.writeFileSync('tmp/uploaded-image.jpg', body.image, 'base64', (err) => {
      console.log(err);
      return response.status(500).json({ error: err });
    });
    const bucket = gcs.bucket('gs://majaloc.appspot.com');

    bucket.upload('tmp/uploaded-image.jpg', {
      uploadType: 'media',
      destination: '/places/' + uuid + '.jpg',
      metadata: {
        metadata: {
          contentType: 'image/jpeg',
          firebaseStorageDownloadTokens: uuid,
        }
      }
    }, (err, file) => {
      if (!err) {
        response.status(201).json({
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' +
            bucket.name + '/o/' + encodeURIComponent(file.name) + '?alt=media$token' +
            uuid
        })
      } else {
        console.log(err);
        response.status(500).json({ error: err });
      }
    });
  });


});
