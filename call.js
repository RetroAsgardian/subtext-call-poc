var peer = new Peer();

peer.on('open', function(id) {
	document.getElementById("myId").innerHTML = "My ID: " + id;
});

peer.on('call', function(call) {
	document.getElementById("myId").innerHTML = "My ID: " + peer.id + "[CALL IN: " + call.peer + "]";
	navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(function(myStream) {
		call.answer(myStream);
		call.on('stream', function(theirStream) {
			document.querySelector('#callVideo').src = URL.createObjectURL(theirStream);
			document.querySelector('#callVideo').play();
		});
	});
});

function initiateCall() {
	var target = document.querySelector('#callTargetId').value;
	navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(function(myStream) {
		call = peer.call(target, myStream);
		document.getElementById("myId").innerHTML = "My ID: " + peer.id + "[CALL OUT: " + target + "]";
		call.on('stream', function(theirStream) {
			document.querySelector('#callVideo').src = URL.createObjectURL(theirStream);
			document.querySelector('#callVideo').play();
		});
	});
}
