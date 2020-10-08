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

// exports.storeImage = functions.https.onRequest((request, response) => {
//   /* functions.logger.info('Hello logs!', {structuredData: true});
//   response.send('Hello from Firebase!'); */
//   const uuid = v4();

//   cors(request, response, () => {
//     const body = JSON.parse(request.body);
//     fs.writeFileSync('tmp/uploaded-image.jpg', body.image, 'base64', (err) => {
//       console.log(err);
//       return response.status(500).json({ error: err });
//     });
//     const bucket = gcs.bucket('gs://majaloc.appspot.com');

//     bucket.upload('tmp/uploaded-image.jpg', {
//       uploadType: 'media',
//       destination: '/places/' + uuid + '.jpg',
//       metadata: {
//         metadata: {
//           contentType: 'image/jpeg',
//           firebaseStorageDownloadTokens: uuid,
//         }
//       }
//     }, (err, file) => {
//       if (!err) {
//         response.status(201).json({
//           imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' +
//             bucket.name + '/o/' + encodeURIComponent(file.name) + '?alt=media$token' +
//             uuid
//         })
//       } else {
//         console.log(err);
//         response.status(500).json({ error: err });
//       }
//     });
//   });


// });


exports.storeImage = functions.https.onRequest((request, response) => {
  /* functions.logger.info('Hello logs!', {structuredData: true});
  response.send('Hello from Firebase!'); */
  const uuid = v4();

  cors(request, response, () => {
    console.log('request.body', request.body);
    const body = JSON.parse(request).body;
    // const body = request.body;
    // fs.writeFileSync('tmp/uploaded-image.jpg', body.image, 'base64', (err) => {
    //   if (err) {
    //     console.log(err);
    //     return response.status(500).json({ error: err });
    //   }
    // });
    /* const bucket = gcs.bucket('majaloc.appspot.com');
    // const bucket = gcs.bucket('albums');xx
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
    }); */

    const bucket = gcs.bucket('majaloc.appspot.com');
    const options = {
      destination: 'new-image.png',
      resumable: true,
      validation: 'crc32c',
      metadata: {
        metadata: {
          contentType: 'image/jpeg',
          event: 'Fall trip to the zoo'
        }
      }
    };

    bucket.upload('tmp/uploaded-image.jpg', options, (err, file) => {
      console.log(err);
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

    //-
    // You can also have a file gzip'd on the fly.
    //-
    // bucket.upload('index.html', { gzip: true }, function(err, file) {
    //   // Your bucket now contains:
    //   // - "index.html" (automatically compressed with gzip)

    //   // Downloading the file with `file.download` will automatically decode
    //   // file.
    // });

  });


});
