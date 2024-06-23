function slider(action, id, mousedown = function() {}, mouseup = function() {}) {
    var parent = document.getElementById(id);
    var fill = parent.getElementsByClassName("fill")[0];
    var fill_btn = parent.getElementsByClassName("fill-btn")[0];
    var can_drag = false,
        value = 0;

    function update() {
        var pos_x = window.event.clientX; //To find the mouse coordinates on the screen. 

        var left = document.getElementById("left-width-" + id).getBoundingClientRect().left;
        var right = document.getElementById("right-width-" + id).getBoundingClientRect().right;
        var width = right - left;
        value = (pos_x - left) / width; //remove extra part and how much does it move from left to right
        if (value < 0) value = 0
            // for controling if our value go uper than  1 or lesster that 0 
        else if (value > 1) value = 1

        fill.style.width = (value * 100) + "%"
        fill_btn.style.left = (value * 100) + "%"

        if (action == "time-line") {
            audio.currentTime = audio.duration * value;
        } else if (action == "volume") {
            audio.volume = value;
            document.getElementById("volume-value").innerText = parseInt(value * 100)
        }
    }
    parent.addEventListener("mousedown", function(e) {
        if (e.button == 0) {
            can_drag = true;
            mousedown();
        }
    });
    document.body.addEventListener("mousemove", function(e) {
        if (e.button == 0 && can_drag) {
            update();
        }
    });
    document.body.addEventListener("mouseup", function(e) {
        if (e.button == 0 && can_drag) {
            can_drag = false;
            mouseup();
        }
    })


    parent.addEventListener("click", function(e) {
        if (e.button == 0) {
            update();
        }
    });

}