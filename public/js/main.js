const socket = io();
        
const cursor = document.getElementById('cursor');

let focus;



socket.on('move', function(msg){
    cursor.style.top = `${msg.y - 10}px`;
    cursor.style.left = `${msg.x - 10}px`;
});

socket.on('click', function(msg){
    let elem = document.elementFromPoint(msg.x, msg.y);
    if(elem.type == 'text' || elem.type == 'email' || elem.type == 'password'){
        focus = elem;
        socket.emit('input', elem.type);
    }
    
    if(elem.tagName === 'SELECT'){
        let options = elem.getElementsByTagName('option');
        for(let i = 0; i < options.length; i++){
                options[i].addEventListener('click', function(){
                    options[i].setAttribute('selected', true);
                    elem.size = 1;
                })
        }
        
        elem.size = options.length;
    }
    elem.click();
    
});

socket.on('input', function(msg){
    focus.value = msg;
});