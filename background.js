'use strict';

chrome.runtime.onInstalled.addListener(function () {
    console.log("succesfully installed!");
});

/*let url = null;

chrome.runtime.onMessage.addListener(function (request) {
    // get msg from popup.js
    if (request.greeting === 'url') {
        //parse msg
        var format;
        url = request.subject;
        console.log(request.subject);
        format = request.format;
        console.log('format: ' +
            request.format + ' (1 means audio, 10 means video)');
        //call xhttp function
        loaddoc(url, format);
    }
});


var xhttp = new XMLHttpRequest();

var realURL = '';
var array,
    progress,
    status,
    download_url;

function loaddoc(url, format) {
    //GET ddownr API
    url = encodeURIComponent(url);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var array = JSON.parse(this.responseText);
            if (array.success == false) {
                console.log("ERROR! Try Again! json data not found");
            }
            var progress_url = array.progress_url;
            checkmedia(progress_url);
            console.log(array);
            console.log(progress_url);
        }
    };
    xhttp.open("GET", "https://ddownr.com/download.php?url=" + url + "&format-option=" + format + "&playlist=1&playliststart=1&playlistend=250&index=1&naming=1&server_eu=1&server_us=1", true);
    xhttp.onerror = function () {};
    xhttp.send();
}

function checkmedia(progress_url) {
    //GET download link
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            array = JSON.parse(this.responseText);
            progress = array.progress;
            status = array.status;
            download_url = array.download_url;
            realURL = decodeURIComponent(download_url);


            console.log(array);
            console.log(progress);
            var status_text = array.status_text;
            //update background.html
            updateStatus(progress, status_text);

            console.log(status_text);

            if (progress > 100) {
                progress = 100;
            }
            if (progress == null || progress == "null") {
                progress = 0;
            }
            //add error
            if (status == 0 || status == null || status != 1) {
                setTimeout(checkmedia.bind(null, progress_url), 2500);
            } else {

                if (download_url != null) {

                    //if no error, parse resulting URL, create filename, and add to G-script
                    console.log(realURL);
                    var name = new URL(realURL);
                    var realname = name.pathname;
                    var result = realname.substring(realname.lastIndexOf("/") + 1);
                    console.log(result);
                    window.open('https://script.google.com/macros/s/AKfycbyImn3GKTfhpAZqR0_2Z7BOEI-PgFfvQ82HL1_GkIzVYRTsTnY/exec?url=' +
                        realURL + '&foldername=Root+Folder&folderid=&filename=' + result + '&unzipfolder=&dfileid=&cextension=&cpasswd=&filename2=' + result);


                } else {

                }
            }
        }
    };
    xhttp.open("GET", progress_url, true);
    xhttp.send();
    xhttp.timeout = 2500;
    xhttp.ontimeout = function () {
        xhttp.abort();
        checkmedia(progress_url);
    };
}

function updateStatus(progress, status) {
    //update status on backgroung html page
    $("#current-status").append("<p>" + status + "</p>");
    $("#dynamic").css("width", progress + "%").text(progress + " %");
    $('#current-status').text(status);
}*/