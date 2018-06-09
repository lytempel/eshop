var request = new XMLHttpRequest();

request.open('GET', 'https://erply-challenge.herokuapp.com/list?AUTH=fae7b9f6-6363-45a1-a9c9-3def2dae206d', true);

request.onload = function () {
    var data = JSON.parse(this.response);

    data.forEach(product => {
        console.log(product.name);
    });

}

request.send();
