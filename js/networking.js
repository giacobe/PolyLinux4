"use strict";

// JS to send packets.
function wireNetworking() {
    if (!window.emulator1 || !window.emulator2) return;

    window.emulator1.add_listener("net0-send", function (data) {
        window.emulator2.bus.send("net0-receive", data);
    });

    window.emulator2.add_listener("net0-send", function (data) {
        window.emulator1.bus.send("net0-receive", data);
    });
}
