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
                    <div class="button-group">
                        <button type="button" id="delete-volcano-btn">delete</button>
                        <button type="button" id="edit-volcano">edit</button>
                    </div>
                </figure>
            </section>
        `;
    }
}

function addVolcano() {
    let volcano = showVolcanoModal('add-mode');
    if (Object.keys(volcano).length > 0) {
        axios({
            method: 'POST',
            url: '/volcanoes',
            data: {volcano}
        })
        .then(response => {
            console.log('Volcano added successfully!');
            getVolcanoes();
        })
        .catch(error => {
            console.log('Problem adding a volcano: ', error);
        })
    }
}

function editVolcano() {
    let volcano = showVolcanoModal('update-mode');
    if (Object.keys(volcano).length > 0) {
        axios({
            method: 'PUT',
            url: '/volcanoes',
            data: {volcano}
        })
        .then(response => {
            console.log('Volcano updated successfully!');
            getVolcanoes();
        })
        .catch(error => {
            console.log('Problem updating a volcano: ', error);
        })
    }
}

function clearInputElements() {


}

function fetchInputElements() {
    let 
}

function showVolcanoModal(mode) {
    let modalElement = document.getElementById('volcano-modal');
    let modalHeaderElement = document.getElementById('modal-header');
    let modalAddSaveButton = document.getElementById('modal-add-save-button');
    if (mode === "add-mode") {
        modalHeaderElement.textContent = 'Add volcano:';
        modalAddSaveButton.textContent = 'add';
        clearInputElements();
    } else if (mode === "update-mode") {
        fetchInputElements();
    } else {
        console.log('invalid mode called on showVolcanoModal');
    }
    
}











getVolcanoes();