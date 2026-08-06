const socket = io();
let peer = null;

const myIdDisplay = document.getElementById('myIdDisplay');
const customIdInput = document.getElementById('customIdInput');
const setIdBtn = document.getElementById('setIdBtn');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const callBtn = document.getElementById('callBtn');
const peerIdInput = document.getElementById('peerIdInput');
const videoContainer = document.getElementById('videoContainer');

setIdBtn.addEventListener('click', () => {
    const customId = customIdInput.value.trim().toLowerCase().replace(/\s+/g, '');
    if (!customId) return alert("Kripya Username ya Mobile Number dalein");

    peer = new Peer(customId);

    peer.on('open', (id) => {
        myIdDisplay.innerText = "ID: " + id;
        alert("Aapka ID set ho gaya: " + id);
    });

    peer.on('error', (err) => {
        alert("Ye Name/Number pehle se kisi ne liya hai. Koi doosra try karein!");
    });

    peer.on('call', (call) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            document.getElementById('localVideo').srcObject = stream;
            videoContainer.classList.remove('hidden');
            call.answer(stream);
            call.on('stream', (rStream) => { document.getElementById('remoteVideo').srcObject = rStream; });
        });
    });
});

sendBtn.addEventListener('click', () => {
    const text = messageInput.value.trim();
    if (text) { socket.emit('chat_message', text); messageInput.value = ''; }
});

socket.on('chat_message', (msg) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerText = msg;
    messagesDiv.appendChild(div);
});

callBtn.addEventListener('click', () => {
    if (!peer) return alert("Pehle apna Name/Mobile No dalkar Set ID karein!");
    const friendId = peerIdInput.value.trim().toLowerCase().replace(/\s+/g, '');
    if (!friendId) return alert("Friend ka Name ya Mobile No dalein");

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        document.getElementById('localVideo').srcObject = stream;
        videoContainer.classList.remove('hidden');
        call.answer(stream);
        call.on('stream', (rStream) => { document.getElementById('remoteVideo').srcObject = rStream; });
    });
});
