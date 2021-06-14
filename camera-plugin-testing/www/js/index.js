/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

document.addEventListener('resume', onResume, false);

function onResume(event) {
    console.log('in the on resume', event);

    // Now we can check if there is a plugin result in the event object.
    // This requires cordova-android 5.1.0+
    if(event.pendingResult) {
        // Figure out whether or not the plugin call was successful and call
        // the relevant callback. For the camera plugin, "OK" means a
        // successful result and all other statuses mean error
        if(event.pendingResult.pluginStatus === "OK") {
            console.log('in the on resume pendingResult and succes plugin status. Displaying the image.');
            // The camera plugin places the same result in the resume object
            // as it passes to the success callback passed to getPicture(),
            // thus we can pass it to the same callback. Other plugins may
            // return something else. Consult the documentation for
            // whatever plugin you are using to learn how to interpret the
            // result field
            displayImage(event.pendingResult.result);
        } else {
            console.debug('Unable to obtain picture: ' + event.pendingResult.result, 'app');
        }
    }
}

document.getElementById('openCameraWithSaveToGallery').addEventListener('click', function() {
    console.info('opening camera with save To gallery');
    openCamera(true);
});

document.getElementById('openCameraWithoutSaveToGallery').addEventListener('click', function() {
    console.info('opening camera without save To gallery');
    openCamera(false);
});

document.getElementById('openGalleryWithSaveToGallery').addEventListener('click', function() {
    console.info('opening gallery with save To gallery');
    openGallery(true);
});

document.getElementById('openGalleryWithoutSaveToGallery').addEventListener('click', function() {
    console.info('opening gallery without save To gallery');
    openGallery(false);
});

function setOptions(saveToPhotoAlbum) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        // allowEdit: true,
        correctOrientation: true,  //Corrects Android orientation quirks,
        saveToPhotoAlbum: saveToPhotoAlbum
    }
    return options;
}

function openCamera(saveToPhotoAlbum) {

    clearImage();
    var options = setOptions(saveToPhotoAlbum);
    // var func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        console.debug('Got a picture', 'app');

        displayImage(imageUri);
        // You may choose to copy the picture, save it somewhere, or upload.
        // func(imageUri);

    }, function cameraError(error) {
        console.debug('Unable to obtain picture: ' + error, 'app');

    }, options);
}

function displayImage(imgUri) {

    var elem = document.getElementById('imageFile');
    elem.src = imgUri;
}

function clearImage() {

    var elem = document.getElementById('imageFile');
    elem.src = '';
}

function openGallery(saveToPhotoAlbum) {

    clearImage();
    var options = setOptions(saveToPhotoAlbum);
    options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
    // var func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        console.debug('Got from gallery', 'app');

        displayImage(imageUri);
        // You may choose to copy the picture, save it somewhere, or upload.
        // func(imageUri);

    }, function cameraError(error) {
        console.debug('Unable to obtain picture from gallery: ' + error, 'app');

    }, options);
}
