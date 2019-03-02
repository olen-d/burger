const buttonListener = {
    add(buttonId, method) {
        let button = document.getElementById(buttonId);
        button.addEventListener("click", method);
    }
}

// Post
const ajax = {
    post(url, burgerName, burgerStatus) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status === 200) {
                let res = JSON.parse(xhr.responseText);
                ajax.get("api/burgers/mostRecent");
            } else {
                // Fail. TODO: Add error message.
            }
        };
        xhr.send(JSON.stringify({
            name: burgerName,
            status: burgerStatus
        }));
    },

    get(url) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                let jData = JSON.parse(xhr.responseText);

                let hawtBurgers = document.getElementById("hawtBurgers");
                let devourButtons = document.getElementById("devourButtons");
                let p = document.createElement("p");
                let b = document.createElement("button");

                p.setAttribute("data-burger-id",jData[0].id);
                p.setAttribute("class", "burger")
                p.innerHTML = jData[0].burger_name;

                
                b.setAttribute("data-burger-id",jData[0].id);
                b.setAttribute("class","devourBtn");
                b.innerHTML = "Devour It!";

                devourButtons.appendChild(b);
                hawtBurgers.appendChild(p);
            } else {
                // Fail. TODO: Add error message.
                console.log("EPIC FAIL");
            }
        }
        xhr.send();
    }
}
btn = document.getElementById("burgerSubmit")
btn.addEventListener("click", (e) => {
    e.preventDefault();
    burgerName = document.getElementById("burgerName").value;
    ajax.post("api/burgers", burgerName, 0);
});