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
                        <button type="button" 
                                id="delete-volcano-btn"
                                onclick="deleteVolcano(${volcano.id})">delete</button>
                        <button type="button" 
                                id="edit-volcano"
                                onclick="editVolcanoButtonHandler(event, ${volcano.id})">edit</button>
                    </div>
                </figure>
            </section>0
        `;
    }
}

function addVolcano(volcano) {
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


function updateVolcano(volcanoId, volcano) {
    axios({
        method: 'PUT',
        url: `/volcanoes/${volcanoId}`,
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


function addVolcanoButtonHandler(event, volcanoId) {
    event.preventDefault();
    let volcano = 
        { 
        name: '', 
        erupting_now: 'false', 
        last_year_erupted: '', 
        country: '',
        pic: ''
        };
    // update volcano fields with defaults (blanks, false)
    updateInputElements(volcano);
    // update modal text
    let modalElement = document.getElementById('volcano-modal');
    let modalHeaderElement = document.getElementById('modal-header');
    let modalAddSaveButton = document.getElementById('modal-add-save-button');
    modalHeaderElement.textContent = 'Add volcano:';
    modalAddSaveButton.textContent = 'add';
    // show modal
    modalElement.dataset.volcanoId = volcanoId;
    modalElement.dataset.dataMode = 'add-mode';
    modalElement.style.display = "block";
}

function editVolcanoButtonHandler(event, volcanoId) {
    event.preventDefault();
    // get single volcano information
    axios({
        method: 'GET',
        url: `/volcanoes/${volcanoId}`
    })
    .then((response) => {
        // strip the single volcano out of the array
        let volcano = response.data[0];
        console.log('Successful GET of a volcano:', volcano);
        // only one item in volcanoes array, return the one volcano
        updateInputElements(volcano);
        // update modal text
        let modalElement = document.getElementById('volcano-modal');
        let modalHeaderElement = document.getElementById('modal-header');
        let modalAddSaveButton = document.getElementById('modal-add-save-button');
        modalHeaderElement.textContent = 'Edit volcano:';
        modalAddSaveButton.textContent = 'save';
        // show modal
        modalElement.dataset.volcanoId = volcanoId;
        modalElement.dataset.dataMode = 'edit-mode';
        modalElement.style.display = "block";
    })
    .catch((error) => {
        console.log('Whoa. GET of a single volcano didn\'t really work.', error);
    })
}

function updateInputElements(volcano) {
    console.log('updateinputelements volcano',volcano)
    let inputTextElement = document.getElementById('input-name');
    let inputEruptTrueElement = document.getElementById('input-erupting-true');
    let inputEruptFalseElement = document.getElementById('input-erupting-false');
    let inputLastYearEruptedElement = document.getElementById('input-last-year-erupted');
    let inputCountry = document.getElementById('input-country');
    let inputPic = document.getElementById('input-pic');
    inputTextElement.value = volcano.name;
    if (volcano.erupting_now) {
        inputEruptTrueElement.checked = true;
    } else {
        inputEruptFalseElement.checked = true;
    }
    inputLastYearEruptedElement.value = volcano.last_year_erupted;
    inputCountry.value = volcano.country;
    inputPic.value = volcano.pic;
} 

function getInputElements() {
    let inputTextElement = document.getElementById('input-name');
let inputEruptTrueElement = document.getElementById('input-erupting-true');
    if (inputEruptTrueElement.checked) {
        erupting_now = true; 
    } else {
        erupting_now = false;
    }
    let inputLastYearEruptedElement = document.getElementById('input-last-year-erupted');
    let inputCountry = document.getElementById('input-country');
    let inputPic = document.getElementById('input-pic');
    let volcano = { name: inputTextElement.value,
                    erupting_now: erupting_now,
                    last_year_erupted: inputLastYearEruptedElement.value,
                    country: inputCountry.value,
                    pic: inputPic.value};
    return volcano;
}


function cancelModalInput() {
    let modalElement = document.getElementById('volcano-modal');
    // close modal
    modalElement.style.display = 'none';
}

function saveModalInput() {
    let modalElement = document.getElementById('volcano-modal');
    // if add mode, add volcano
    let volcanoId = modalElement.dataset.volcanoId;
    let volcano = getInputElements(volcanoId);
    if (modalElement.dataset.dataMode === "edit-mode") {
       updateVolcano(volcanoId, volcano);
    // edit mode, update volcano
    } else {  
        console.log('volcano', volcano);
        addVolcano(volcano);
    }
    // close modal
    modalElement.style.display = 'none';
}

document.getElementById('modal-cancel-button').addEventListener('click', cancelModalInput);
document.getElementById('modal-add-save-button').addEventListener('click', saveModalInput);
document.getElementById('add-volcano-button').addEventListener('click', addVolcanoButtonHandler);
getVolcanoes();
