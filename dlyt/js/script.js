var realURL,
    array,
    progress,
    status;

var gd_picker, gd_loaded, gd_pickerloaded, gd_lastprogress, gd_issupported, gd_isdownloading, gd_load_timer,
    gd_bloburl, gd_state2;
var g_logcount = 0;

var goptions = { //params to pass into DB method
    files: [],
    success: function () {
        proc_complete();
        _log("log4",
            'Success! All Files saved to your Dropbox. <a href="https://www.dropbox.com/home" target="_blank">Visit Dropbox Home</a>',
            'uploaded', true);

    },
    progress: function (progress) {
        if (!gprogresstimer) {
            gstarttime = (new Date()).getTime();
            gprogresstimer = setInterval(function () {
                var a = _getid('dynamic');
                if (a) {
                    var s = (new Date()).getTime() - gstarttime;
                    s = parseInt(s / 1000);
                    var min = Math.floor(s / 60);
                    var sec = parseInt(s % 60);
                    a.innerHTML = 'Saving to Dropbox... (' + fillnumber(min) + ':' + fillnumber(sec) + ')';
                }
            }, 1000);
        }
        var per = 0;
        if (progress == 0 && gstarttime > 0 && gtotalsize) {
            var totsec = parseInt(gtotalsize / (3.7 * 1024 * 1024));
            var elasec = (new Date()).getTime() - gstarttime;
            elasec = parseInt(elasec / 1000);
            per = parseInt(elasec * 100 / totsec);
            if (isNaN(per)) per = 0;
            if (per > 95) per = 0;
        } else {
            per = progress * 100;
        }
        var a = _getid("status");
        if (a) {
            var s = 'Saving to Dropbox...';
            if (per > 0) {
                s += per + '%';
                if (progress == 0 && gstarttime > 0) s +=
                    ' (estimates)';
            }
            a.innerHTML = s;
        }
    },
    cancel: function () {
        proc_complete();
        _log("log4", 'Canceled by user.', 'error');
    },
    error: function (errorMessage) {
        //window.open('https: //script.google.com/macros/s/AKfycbyImn3GKTfhpAZqR0_2Z7BOEI-PgFfvQ82HL1_GkIzVYRTsTnY/exec?url=' +
        //name.href + '&foldername=Root+Folder&folderid=&filename=' + result + '&unzipfolder=&dfileid=&cextension=&cpasswd=&filename2=' + result);
        proc_complete();
        var s = errorMessage || '';
        s = s.replace(/\\u([0-9a-f]{4})/g, function (whole, group1) {
            return String.fromCharCode(parseInt(group1, 16));
        });
        s = s.replace(/\\(.)/mg, "$1");
        _log("log4", 'Error: ' + s, 'error');
    }
}


$(document).ready(function () {
    $('#dbsave').hide();
    $('#status').hide();
});

$("#submit").click(function (e) { //submit function
    e.preventDefault();
    proc_complete();

    console.log("working...");
    var url = $("#url").val(); //get form data
    var format = $('#inlineFormCustomSelect :selected').val(); //get form data
    var ytreg = /(( ? : https ? : ) ? \/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    var filereg = /(http(s) ? : \/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    console.log(url);
    if (url == '') {
        alert("no input");
    } else if (ytreg.test(url)) {
        $('#status').addClass('d-block').text('Starting...');
        $('#submit').hide();
        console.log('converting ' + url + ' to ' + format + ' (1 means audio, 10 means video)');
        loaddoc(url, format); //if url is present and a valid Youtube link call loaddoc
        $('#url').val('');
    } else if (filereg.test(url)) {
        if ($('#customSwitches').is(':checked')) {
            //input.onchanged...
            //add universal rename function
            var dbname = url.substring(url.lastIndexOf("/") + 1);
            dbname = dbname.replace(/%20/g, " ");
            Dropbox.save(url, dbname, goptions);
            $('#dbsave').attr({
                'href': url,
                'data-filename': dbname
            });
            $('#dbsave').show();
        } else {
            sejdafetch(url);
            console.log('converting Sejda..')
        }
    } else {
        alert("wrong url format");
    }

});




function statusdiv(status_text, progress) { //progress function
    if (progress > 0) {
        $('#dynamic').css('width', progress + '%').text(progress + '%');
        $('#status').text('status: ' + status_text + '...');
    }
}

function sejdafetch(url) {
    window.open('https://www.sejda.com/html-to-pdf?save-link=' + url);
}

function loaddoc(url, format) { //ddown convert function 
    fetch("https://ddownr.com/download.php?url=" + url + "&format-option=" + format + "&playlist=1&playliststart=1&playlistend=250&index=1&naming=1&server_eu=1&server_us=1", {
        credentials: 'include'
    }).then(function (response) {
        return response.json();
    }).then(function (myJson) {
        console.log(JSON.stringify(myJson));
        var progress_url = myJson.progress_url;
        checkmedia(progress_url);
        console.log(progress_url);
    });





}

function checkmedia(progress_url) { //GET download link
    fetch(progress_url, {
        credentials: 'include'
    }).then(function (response) {
        return response.json();
    }).then(function (array) {
        //console.log(JSON.stringify(array));
        progress = array.progress;
        status = array.status;
        realURL = array.download_url;
        //add error and info ..................................................................................
        var status_text = array.status_text;

        console.log(status_text + ' ' + progress + '%');

        if (progress > 100) {
            progress = 100;

        }
        if (progress == null || progress == "null") {
            progress = 0;
        }
        statusdiv(status_text, progress);
        if (status == 0 || status == null || status != 1) {
            setTimeout(checkmedia.bind(null, progress_url), 2500);
        } else {

            if (realURL != null) {

                //if no error, parse resulting URL, create filename, and add to uploader
                console.log(realURL);
                var name = new URL(realURL);
                var realname = name.pathname;
                realname = decodeURIComponent(realname);
                var href = decodeURIComponent(name.href);
                var result = realname.substring(realname.lastIndexOf("/") + 1);
                result = result.replace(/%20/g, " ");

                console.log(result);
                //attach_saveall(realURL, result); //pass realURL into saveall function
                $('#downlink2').text('converted file: ' + href);
                Dropbox.createSaveButton(name.href, result, goptions);
                Dropbox.save(name.href, result, goptions);
                $('#submit').show();
            }
        }

    });
}


function proc_complete() { //task complete function
    clearInterval(gprogresstimer);
    gprogresstimer = null;
    gd_isdownloading = false;
    _getid("downlink2").innerHTML = '';
    $('#dynamic').removeClass('progress-bar-animated');
}


function _log(name, s, state, nohenc) { //logging function
    function proc_log(s) {
        var obj = _getid(name);
        var a = document.createElement("div");
        a.setAttribute('style', 'display:block');
        if (!state) state = '';
        if (!nohenc) s = henc(s);
        a.innerHTML = '<font class="' + state + '">' + s + '</font>';
        obj.appendChild(a);
        obj.scrollTop = obj.scrollHeight;
        g_logcount++;
    }
    if (name == 'log4' || name == 'log5') {
        proc_log(s);
        return;
    }
    var a = _getid(name);
    var s1 = a.value;
    if (s1) s1 += '\n';
    a.value = s1 + s;
    a.scrollTop = a.scrollHeight;
}

var gprogresstimer, gstarttime, gtotalsize;






//todo
//migrate everything to jquery
//update progress bar (use same one)
//migrate everything to external script / stylesheet
//add db button instead