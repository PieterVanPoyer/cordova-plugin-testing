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

    var cdvfileApplicationDirectoryFsRootName;
    if (cordova.platformId === 'android') {
        cdvfileApplicationDirectoryFsRootName = 'assets';
    } else if (cordova.platformId === 'ios') {
        cdvfileApplicationDirectoryFsRootName = 'bundle';
    } else {
        console.warn('No Platform on cordova', cordova.platformId)
    }

    resolveLocalFileSystemURL('cdvfile://localhost/' + cdvfileApplicationDirectoryFsRootName + '/', (applicationDirectoryRoot) => {
        console.log(applicationDirectoryRoot.isFile, "Is file? false?");
        console.log(applicationDirectoryRoot.isDirectory, "I Directory? true");
        console.log(applicationDirectoryRoot.filesystem.name, "Is filesystem path equal to", cdvfileApplicationDirectoryFsRootName);

        // Requires HelloCordova www assets, <allow-navigation href="cdvfile:*" /> in config.xml or
        // cdvfile: in CSP and <access origin="cdvfile://*" /> in config.xml
        resolveLocalFileSystemURL('cdvfile://localhost/' + cdvfileApplicationDirectoryFsRootName + '/www/img/logo.png', function (entry) {
            console.log(entry.isFile, "isFile? true?");
            console.log(entry.isDirectory, "IsDirectory? false?");
            console.log(entry.name, "name is? logo.png");
            console.log(entry.fullPath, "full path is? /www/img/logo.png?");
            console.log(entry.filesystem.name, "Is filesystem path equal to", cdvfileApplicationDirectoryFsRootName);

            var img = new Image(); // eslint-disable-line no-undef
            img.onerror = function (err) {
                console.log("There is an error!", err)
            };
            img.onload = function () {
                console.log("It's loaded")
            };
            img.src = entry.toInternalURL();

            document.querySelector('.app').appendChild(img);
        });
    });
}
