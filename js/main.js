

(function () {

    function getContentElement() {
        return document.getElementById('qr-content');
    }

    var qrcode = new QRCode("qr-code");
    var scanner = new Instascan.Scanner({video: document.getElementById('preview'), backgroundScan: false});

    scanner.addListener('scan', function (content) {
        getContentElement().value = content;
        qrcode.makeCode(content);
    });

    Instascan.Camera.getCameras().then(function (cameras) {
        // favor rear camera
        if (cameras.length > 1) {
            scanner.start(cameras[1]);
        // fallback to front cam
        } else if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            console.error('No cameras found.');
        }
    }).catch(function (e) {
        console.error(e);
    });


    // Add keyUp handler for input field
    function inputKeyUp(e) {
            var content = getContentElement().value;
            qrcode.makeCode(content);
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
