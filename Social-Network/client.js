function addpost() {
    let request = {
        author: "",
        text: ""
    }
    // Подтягиваем данные с input   
    request.author = document.querySelector("#login").value;
    request.text = document.querySelector("#text").value;
    request.img = document.querySelector("#img").value;

    // Отправляем пост на сервер
    fetch('http://localhost:3000/addpost', {
        method: "POST",
        headers: {
            // Уточняем что отправим JSON
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: request })
    })
        .then(res => console.log(res))
        .catch(err => console.log(err));
}