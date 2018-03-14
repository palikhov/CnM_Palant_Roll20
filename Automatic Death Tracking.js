on("change:graphic", function(obj) {
    if(obj.get("bar3_max") === "") return;
   
    if(obj.get("bar3_value") < 0) {
      obj.set({
         status_dead: true,
         tint_color: "#ffffff",
         status_stopwatch: false
      });
    }
    else if(obj.get("bar3_value") === 0) {
        obj.set({
            status_stopwatch: true,
            status_dead: false,
            tint_color: "#C40000"
        })
    }
    else {
      obj.set({
        status_dead: false,
        tint_color: "transparent",
        status_stopwatch: false
      });
    }
});