

(function () {

    function getContentElement() {
        return document.getElementById('qr-content');
    }

    var qrcode = new QRCode("qr-code");
    var scanner = new Instascan.Scanner({video: document.getElementById('preview')});

    scanner.addListener('scan', function (content) {
        getContentElement().value = content;
        qrcode.makeCode(content);
    });

    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            console.error('No cameras found.');
        }
    }).catch(function (e) {
        console.error(e);
    });


    // Add 'Enter Key' handler for input field
    function inputKeyUp(e) {
        e.which = e.which || e.keyCode;
        if(e.which == 13) {
            var content = getContentElement().value;
            qrcode.makeCode(content);
        }
    }
    getContentElement().onkeyup = inputKeyUp;

    // Support copy to clipboard
    var copyTextareaBtn = document.querySelector('#js-copy-to-clipboard');

    copyTextareaBtn.addEventListener('click', function(event) {
        var copyTextarea = getContentElement();
        copyTextarea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    });


}());
