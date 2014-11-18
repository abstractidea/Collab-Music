(function(app, $, undefined) {
    app.onMouseDown = function(e) {
        app.handlePointInputStart({
            x: e.pageX - $(this).offset().left,
            y: e.pageY - $(this).offset().top
            });
    };

    app.onMouseUp = function(e) {

    };

    app.onMouseMove = function(e) {

    };

    app.onKeyDown = function(e) {
        // console.info("onKeyDown e.which=" + e.which);

        var SPACE = 32;

        switch(e.which) {
            case SPACE:
                app.isPlaying = !app.isPlaying;
                
                break;
        }
    };

    $('#js-clear-grid').on('click', function (e) {
        console.info("js-clear-grid clicked");

        e.preventDefault();

	console.info("time to request clear");
        app.clearGrid(true);
    });
}(window.app = window.app || {}, jQuery));
