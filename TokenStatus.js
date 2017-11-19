/**
 * Set various token markers based on bar cur/max ratios
 * 
 * The CONFIG array can have any number of configuration objects. These objects
 * are processed in order.
 * 
 * barId - The ID of the bar to look at the values for [1, 2, 3]
 * barRatio - The ratio of bar value to max value that triggers setting the status marker [0 - 1]
 * status - The name of the status marker to toggle [redmarker, bluemarker, greenmarker, brownmarker, purplemarker, dead]
 * whenLow - The state of the marker when the bar value is <= the ratio [true, false]
 */
var CONFIG = [
    {barId: 3, barRatio: .5, status: "half-heart", whenLow: true},
    {barId: 3, barRatio: 0, status: "dead", whenLow: true}];


on("change:token", function(obj) {
    CONFIG.forEach(function(opts) {
        var maxValue = parseInt(obj.get("bar" + opts.barId + "_max"));
        var curValue = parseInt(obj.get("bar" + opts.barId + "_value"));
        log(opts.barId + ": " + curValue + "/" + maxValue);
    
        if (!isNaN(maxValue) && !isNaN(curValue)) {
            var markerName = "status_" + opts.status;
            if (curValue <= (maxValue * opts.barRatio)) {
                obj.set(markerName, opts.whenLow);
            }
            else {
                obj.set(markerName, !opts.whenLow);
            }
        }
    });
});
