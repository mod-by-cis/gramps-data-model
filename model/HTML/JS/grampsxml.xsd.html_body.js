function toggleNav() {
    var sidebar = document.getElementById("sidebar");
    var content = document.getElementById("content");
    sidebar.classList.toggle("hidden");
    if (sidebar.classList.contains("hidden")) {
        content.style.marginLeft = "0";
    } else {
        content.style.marginLeft = "-250px";
    }
}

var pc = getElementObject("printerControls");
if (pc != null) {
    pc.style.display = "block";
}

var gc = getElementObject("globalControls");
if (gc != null) {
    gc.style.display = "block";
}

setState('schema_scbox', false);

setState('element_address_xibox', true);