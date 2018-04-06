var evilscan = require("evilscan");

const btn_start = document.getElementById("btn_start");
const btn_stop = document.getElementById("btn_stop");
const loading = document.getElementById("loading");

function show_loading(){
  loading.style.visibility = "visible";
}

function hide_loading(){
  loading.style.visibility = "hidden";
}

function disable_btn_start(){
  btn_start.disabled = true;
  btn_start.classList.remove('btn-primary');
}

function enable_btn_start(){
  btn_start.disabled = false;
  btn_start.classList.add('btn-primary');
}



hide_loading();

var scanner;

btn_start.onclick = () => {

  var options = {
    target: ip.value,
    port: `${port_inicio.value}-${port_fin.value}`,
    status: "TROU", // Timeout, Refused, Open, Unreachable
    banner: true
  };

  scanner = new evilscan(options);
  
  disable_btn_start();
  show_loading();

	scanner.on("result", function(data) {
		// fired when item is matching options
		if (data.status.indexOf("closed") != 0) {
      console.log(JSON.stringify(data));
      var node_tr = document.createElement("tr");
      node_tr.innerHTML = `<td>${data.ip}</td><td>${data.port}</td><td>${data.status}</td>`;

			document.getElementById("table_body").appendChild(node_tr);
		}
	});

	scanner.on("error", function(err) {
		throw new Error(data.toString());
	});

	scanner.on("done", function() {
    enable_btn_start();
    hide_loading();
	});

	scanner.run();
};

btn_stop.onclick = () => {

  scanner.abort()
};
