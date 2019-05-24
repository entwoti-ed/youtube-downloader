//on submit check youtube url validity
//if yes save ytube url to localcache and open ddownr.com
//pass url to CS.js?
(function () {
    chrome.tabs.create({
        url: "chrome-extension://ofikoipdgjaimmkiponbkelkfcnkkbkl/dlyt/index.html"
    })
})();

/*var $info = $('.info-div');
var innertext = 'info...'
$info.html(innertext);

$("#submit").click(function (e) {
    innertext = 'working...';
    console.log("working...");
    var $input = $("#url");
    var formatbf = $('#inlineFormCustomSelect :selected');
    console.log($input.val());
    if ($input.val() == '') {
        alert("no input");
        return
    } else
        var reg = /(( ? : https ? : ) ? \/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    if (reg.test($input.val())) {


        var url = $input.val();
        var format = formatbf.val();
        console.log(formatbf);




        chrome.runtime.sendMessage({
            greeting: 'url',
            subject: url,
            format: format
        });


        console.log(url);

    } else {
        alert("wrong url format");
        return
    }

});*/