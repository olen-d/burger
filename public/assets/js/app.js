const buttonListener = {
    add(buttonId, method) {
        let button = document.getElementById(buttonId);
        button.addEventListener("click", method);
    }
}

// Plain vanilla ajax object
// This was probably a colossal waste of time and I likely should have just
// used jQuery like a normal person, but it seemed unecessary since this app
// doesn't need the library for anything else

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
                p.setAttribute("class", "burgerAvail")
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
    },

    put(url, burgerId) {
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status === 200) {
                let jData = JSON.parse(xhr.responseText);
                if (jData.changedRows !== 1) {
                    console.log("EPIC FAIL: Something went horribly wrong with the update.");
                }
            }
        }
        xhr.send(JSON.stringify({
            id: burgerId,
            devoured: 1
        }));
    }
}
btn = document.getElementById("burgerSubmit")
btn.addEventListener("click", (e) => {
    e.preventDefault();
    burgerName = document.getElementById("burgerName").value;
    ajax.post("api/burgers", burgerName, 0);
});

// Add the event listener to the devour button that updates the database
// and moves everything around on the front end - remember to make this
// restful and wait for a 200 from the DB before relocating things. But for
// now, this project needs to be done.

let devourBtn = document.getElementsByClassName("devourBtn");
Array.from(devourBtn).forEach((elem) => {
    elem.addEventListener("click", function (e) {
        e.preventDefault();
        let burgerId = this.getAttribute("data-burger-id");
        ajax.put(`api/burgers/devoured/${burgerId}`);
        // delete the devour button
        this.remove();
        // delete the burger from available
        let burgerP = "";
        let burgerAvailable = document.getElementsByClassName("burgerAvail");
        Array.from(burgerAvailable).forEach((elem) => {
            if(elem.getAttribute("data-burger-id") === burgerId) {
                burgerP = elem;
                elem.remove();
            }
        });
        // add the burger to devoured
        let devouredBurgers = document.getElementById("burgersDevoured");
        devouredBurgers.appendChild(burgerP);
        
    });
});