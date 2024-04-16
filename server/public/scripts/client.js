console.log('👋🌍');



function getVolcanoes() {
    axios({
        method: 'GET',
        url: '/volcanoes'
    })
    .then((response) => {
        let volcanoes = response.data;
        console.log('Successful GET of volcanoes:', volcanoes);
        renderVolcanoDashboard(volcanoes);
    })
    .catch((error) => {
        console.log('Whoa. GET of volcanoes didn\'t really work.', error);
    })
}

function renderVolcanoDashboard(volcanoes) {
    // clear out the volcano dashboard
    let dashboardElement = document.getElementById('dashboard');
    dashboardElement.innerHTML = '';

    for (let volcano of volcanoes) {
        dashboardElement.innerHTML += `
            <section>
                <h3>${volcano.name}  (${volcano.country})</h3>
                <figure>
                    <img src="${volcano.pic}"/>
                <figcaption>${volcano.name} last erupted in ${volcano.last_year_erupted}</figcaption>
                <button type="button" id="delete-volcano-btn">delete</button>
                <button type="button" id="edit-volcano">edit</button>
                </figure>
            </section>
        `;
    }
}







getVolcanoes();