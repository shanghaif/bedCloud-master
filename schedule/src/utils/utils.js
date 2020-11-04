
export function showMessage (msg, callback) {
    const messageDOM = document.createElement('div');
    messageDOM.innerText = msg;
    messageDOM.style.width = '800px';
    messageDOM.style.position = 'fixed';
    messageDOM.style.borderRadius = '30px';
    messageDOM.style.top = '40%';
    messageDOM.style.left = '50%';
    messageDOM.style.marginLeft = '-400px';
    messageDOM.style.padding = '30px';
    messageDOM.style.backgroundColor = 'black';
    messageDOM.style.color = 'white';
    messageDOM.style.opacity = 0;
    messageDOM.style.fontSize = '32px';
    messageDOM.style.textAlign = 'center';
    messageDOM.style.lineHeight = '60px';
    messageDOM.style.wordBreak = 'break-word';
    messageDOM.style.zIndex = 1008;
    messageDOM.style.transition = 'opacity 0.5s ease'
    document.body.appendChild(messageDOM);
    const timerIn = setTimeout(() => {
        clearTimeout(timerIn);
        messageDOM.style.opacity = 0.6;
        const timerOut = setTimeout(() => {
            clearTimeout(timerOut);
            messageDOM.style.opacity = 0;
            const timerRemove = setTimeout(() => {
                clearTimeout(timerRemove);
                document.body.removeChild(messageDOM);
                if (callback) {
                    callback();
                }
            }, 1000)
        }, 1000)
    }, 200)
}