(function(app, $, undefined){
    /**
     *
     */
    app.handlePointInputStart = function(point) {
        var dot = app.dotFromPoint(point);
        if (dot) {
            console.info("dot is here!");
 
            var newState = !app.tracks[0].grid[dot.row][dot.col];
            app.tracks[0].grid[dot.row][dot.col] = newState;

            app.lastDotChanges[app.thisUser.id] = dot;

            app.socket.emit('push-note', { row: dot.row, col: dot.col, state: newState });
            // app.draw();
        } else {
            // Point input is not interacting with grid
        }
    };

    /**
     *
     */
     app.updateDot = function (row, col, state, collaborator) {
        app.tracks[0].grid[row][col] = state;
        
	if (collaborator) {
            app.lastDotChanges[collaborator.id] = { row: row, col: col};
	} else {
            app.lastDotChanges[app.thisUser.id] = { row: row, col: col};
        }
     }

     /**
      * 
      */
    app.clearGrid = function (syncIsRequested) {
        console.info("clearGrid syncIsRequest = " + syncIsRequested);

        for (var i = 0; i < app.tracks[0].grid.length; ++i)
        {
            for (var j = 0; j < app.tracks[0].grid[i].length; ++j)
            {
                app.tracks[0].grid[i][j] = false;
            }
        }

	app.lastDotChanges = [];

	console.info("local grid cleared");
	if (syncIsRequested) {
            console.info("preparing to request remote clear");
            app.socket.emit('clear-grid', {});
	}
    }

    /**
     *
     */
    app.dotFromPoint = function(point) {
        // if (point.x < app.tracks[0].offsetX + app.DOT_PADDING)
        //     return null;
        
        for (var dotCol = 0; dotCol < app.COLS_PER_TRACK; dotCol++) {
            for (var dotRow = 0; dotRow < app.DOTS_PER_COL; dotRow++) {
                // Be bruteful, for now.  Optimize later.
                if (app.pointIsOverDot(point, dotRow, dotCol)) {
                    return {row: dotRow, col: dotCol};
                }
            }
        }

        return null;
    };

    app.pointIsOverDot = function(point, dotRow, dotCol) {
        var dotLeft = app.EDITOR_OFFSET_X + app.DOT_PADDING * (dotCol + 1) + app.DOT_SIZE * dotCol;
        var dotTop = app.EDITOR_OFFSET_Y + app.DOT_PADDING * (dotRow + 1) + app.DOT_SIZE * dotRow;

        return (
                point.x >= dotLeft &&
                point.x < dotLeft + app.DOT_SIZE &&
                point.y >= dotTop &&
                point.y < dotTop + app.DOT_SIZE
                );
    };
}(window.app = window.app || {}, jQuery));
