var peer = new Peer();

peer.on('open', function(id) {
	document.getElementById("myId").innerHTML = "My ID: " + id;
});

peer.on('call', function(call) {
	navigator.mediaDevices.getUserMedia({audio: true}).then(function(myStream) {
		call.answer(myStream);
		call.on('stream', function(theirStream) {
			document.getElementById('callAudio').srcObject = theirStream;
		});
	});
});

function initiateCall() {
	var target = document.getElementById("callTargetId").attributes["value"];
	navigator.mediaDevices.getUserMedia({audio: true}).then(function(myStream) {
		call = peer.call(target, myStream);
		call.on('stream', function(theirStream) {
			document.getElementById('callAudio').srcObject = theirStream;
		});
	});
}
