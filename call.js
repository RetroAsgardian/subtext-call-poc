var peer = new Peer();
var myStream = null;
navigator.mediaDevics.getUserMedia({audio: true, video: true}).then(function(s) {
	myStream = s;
	document.querySelector('#myVideo').src = URL.createObjectURL(myStream);
	document.querySelector('#myVideo').play();
});

peer.on('open', function(id) {
	document.getElementById("myId").innerHTML = "My ID: " + id;
});

peer.on('call', function(call) {
	document.getElementById("myId").innerHTML = "My ID: " + peer.id + " [IN: " + call.peer + "]";
	call.answer(myStream);
	call.on('stream', function(theirStream) {
		document.querySelector('#callVideo').src = URL.createObjectURL(theirStream);
		document.querySelector('#callVideo').play();
	});
});

function initiateCall() {
	var target = document.querySelector('#callTargetId').value;
	call = peer.call(target, myStream);
	document.getElementById("myId").innerHTML = "My ID: " + peer.id + " [OUT: " + target + "]";
	call.on('answer', function() {
		document.getElementById("myId").innerHTML = "My ID: " + peer.id + " [OUT: " + target + " ANS]";
	});
	call.on('stream', function(theirStream) {
		document.querySelector('#callVideo').src = URL.createObjectURL(theirStream);
		document.querySelector('#callVideo').play();
	});
}
