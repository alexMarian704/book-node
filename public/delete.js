let toggle = false;
let comtoggle = false;
// global.document = new JSDOM(html).window.document;

const del = document.getElementById("delete");

del.addEventListener("click", (e) => {
    e.preventDefault()
    const end = `/book/${del.dataset.book}`
    toggle=true;

    fetch(end, {
        method: "DELETE"
    })
        .then((res) => { res.json() })
        .then((data) => {
            console.log(data)
            window.location.href = "/"
        })
        .catch((err) => {
            console.log(err);
        })

})

const deleteCom = document.getElementById("delete-com");

deleteCom.addEventListener("click", (e) => {
    e.preventDefault();
    comtoggle = true;

    const end = `/book/${deleteCom.dataset.url}`

    fetch(end, {
        method: "DELETE"
    })
        .then((res) => { res.json() })
        .then((data) => {
            console.log(data)
            window.location.href = `/book/${deleteCom.dataset.url}`
        })
        .catch((err) => {
            console.log(err);
        });
})

// exports.toggle = toggle;
// exports.comtoggle = comtoggle;
global.toggle;
global.comtoggle;