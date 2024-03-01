function loadHTML(url, targetId) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.getElementById(targetId).innerHTML = xhr.responseText;
            } else {
                console.error('Failed to load ' + targetId + ' content.');
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

window.addEventListener('DOMContentLoaded', function() {
    // Load multiple HTML files
    loadHTML('/head.html', 'head');
    loadHTML('/footer.html', 'footer');
});