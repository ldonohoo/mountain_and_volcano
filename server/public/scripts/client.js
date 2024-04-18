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


function getSingleVolcano(volcanoId) {
    axios({
        method: 'GET',
        url: `/volcanoes/${volcanoId}`
    })
    .then((response) => {
        let volcanoes = response.data;
        console.log('Successful GET of volcanoes:', volcanoes);
        // only one item in volcanoes array, return the one volcano
        editVolcano(volcanoes[0]);
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
                        <button type="button" 
                                id="delete-volcano-btn"
                                onclick="deleteVolcano(${volcano.id})">delete</button>
                        <button type="button" 
                                id="edit-volcano"
                                onclick="showVolcanoModal(event, 'edit-mode', ${volcano.id})">edit</button>
                    </div>
                </figure>
            </section>
        `;
    }
}

function addVolcano(event) {
    let volcano = showVolcanoModal(event, 'add-mode');
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

function editVolcano(event, volcanoId) {
    let volcano = showVolcanoModal(event, 'update-mode', volcanoId);
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

function deleteVolcano(volcanoId) {
    axios({
        method: 'DELETE',
        url: `/volcanoes/${volcanoId}`
    })
    .then(response => {
        let volcanoes = response.data;
        console.log('Delete of volcano successful!', volcanoes);
        getVolcanoes(volcanoes);
    })
    .catch(error => {
        console.log('Error deleting a volcano!', error);
    })
}


function clearInputElements() {


}



function showVolcanoModal(event, mode, volcanoId) {
    event.preventDefault();
    console.log('in show modal')
    let modalElement = document.getElementById('volcano-modal');
    let modalHeaderElement = document.getElementById('modal-header');
    let modalAddSaveButton = document.getElementById('modal-add-save-button');
    let inputTextElement = document.getElementById('input-name');
    let inputEruptTrueElement = document.getElementById('input-erupt-true');
    let inputLastYearEruptedElement = document.getElementById('input-last-year-erupted');
    let inputCountry = document.getElementById('input-country');
    let inputPic = document.getElementById('input-pic');
    if (mode === "add-mode") {
        modalHeaderElement.textContent = 'Add volcano:';
        modalAddSaveButton.textContent = 'add';
        inputTextElement.value = '';
        inputEruptTrueElement.value = false;
        inputLastYearEruptedElement.value = '';
        inputCountry.value = '';
        inputPic.value = '';
    } else if (mode === "edit-mode") {
        modalAddSaveButton.textContent = 'save';
        let volcano = getSingleVolcano(volcanoId);
        modalHeaderElement.textContent = 'Add volcano:';
        modalAddSaveButton.textContent = 'add';
        inputTextElement.value = volcano.name;
        inputEruptTrueElement.value = volcano.eruptTrue;
        inputLastYearEruptedElement.value = volcano.lastYearErupted;
        inputCountry.value = volcano.country;
        inputPic.value = volcano.pic;
    } else {
        console.log('invalid mode called on showVolcanoModal');
    }
    modalElement.style.display = "block";
}


function editVolcano(event, volcanoId) {
    
}








getVolcanoes();
