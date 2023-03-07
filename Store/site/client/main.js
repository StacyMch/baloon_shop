let container_request = '';

function sendRequest() {

    let request = document.getElementById('msg').value;

    if (request !== '') {
        let tmpl_card = document.getElementById('tmpl_card');
        
        container_request+= tmpl_card.innerHTML.replace('${message}', request)
                                       .replace('${name}', 'Гость');
            
        document.getElementById('box__body').innerHTML = container_request;    
    
        let name = document.getElementById('name');
    
        let username = name.innerText;
    
        let data = "username=" + encodeURIComponent(username) + "&request=" + encodeURIComponent(request);
        
        // создаём объкт который умеет отправлять запросы
        let requestObj = new XMLHttpRequest();
        
        // собираем ссылку для запроса
        let link = 'http://localhost:80/?request';
            
        //конфигурируем объект
        requestObj.open('POST', link, false);
        
        requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
        // отправляем запрос
        requestObj.send(data);
                
        document.getElementById('msg').value = '';
    }

}

function renderRequests() {

    let json = sendRequestGET("http://localhost:80/?requestGet");

    let data = JSON.parse(json); 

    console.log(data);

    container_request+= tmpl_card.innerHTML.replace('${message}', data['request'])
                                       .replace('${name}', data['username']);
            
    document.getElementById('box__body').innerHTML = container_request;
}




    