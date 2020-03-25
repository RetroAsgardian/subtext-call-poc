var peer = new Peer();

peer.on('open', function(id) {
	document.getElementById("myId").innerHTML = "My ID: " + id;
});

peer.on('call', function(call) {
	document.getElementById("myId").innerHTML = "My ID: " + peer.id + "[CALL IN: " + call.peer + "]";
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
		document.getElementById("myId").innerHTML = "My ID: " + peer.id + "[CALL OUT: " + target + "]";
		call.on('stream', function(theirStream) {
			document.getElementById('callAudio').srcObject = theirStream;
		});
	});
}
