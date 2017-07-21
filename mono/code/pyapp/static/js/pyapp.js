var pseudo = {
    size: 16,
    index: 0,
    reactions: [],
    devops_url: function() {
        var url = '/devops/' + this.reactions[this.index];
        this.index += 1;
        if (this.index >= this.size) {
            this.index = 0;
            this.reactions = this.generate();
        }
        return url;
    },
    generate: function () {
        var array = Array.from(Array(this.size).keys());
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    },
    init: function() { this.reactions = this.generate(); }
}

function http_get(url, success) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            success(request.responseText);
        } else {
            console.log(request);
        }
    };
    request.onerror = function() {
        console.log(request);
    };
    request.send();
}

function update_time(time) {
    time = JSON.parse(time);
    document.getElementById('clock').textContent = time.timestamp;
}

function update_reactions(reaction) {
    reaction = JSON.parse(reaction);
    var html = '<center><h3>' + reaction.title + '</h3></br><img src="/' + reaction.gif + '"/></center>';
    document.getElementById('devops').innerHTML = html;
}

(function() {
    pseudo.init();
    setInterval(function() {
        http_get('/time', update_time);
    }, 100);
    http_get(pseudo.devops_url(), update_reactions);
    document.querySelectorAll('#button span')[0].onclick = function() {
        http_get(pseudo.devops_url(), update_reactions);
    }
})();
