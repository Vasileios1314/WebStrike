import * as helper from '../helper/helper.js';
const cinemasDiv = document.getElementById('cinemasDiv');
const tableBody = document.getElementById('tableBody');
let RootUrl = window.location.origin;
async function getCinemas() {
    helper.showSpinner();
    const displayCinemas = await helper.AjxGet(`${RootUrl}/api/Api/GetCinemas`);
    console.log('res', displayCinemas);
    console.log('id', displayCinemas.map(x => x.name));
    if (displayCinemas == null) {
        helper.showSpinner();
    }
    displayCinemas.map(cinema => {
        const tr = document.createElement('tr');
        tr.classList.add('align-middle');
        tr.setAttribute('id', `${cinema.id}`);
        const td = document.createElement('td');
        td.classList.add('align-middle');
        const tdName = document.createElement('td');
        tdName.classList.add('align-middle');
        tdName.innerHTML = `${cinema.name}`;
        const tdBio = document.createElement('td');
        tdBio.classList.add('align-middle');
        tdBio.innerHTML = `${cinema.description}`;
        const tdBtn = document.createElement('td');
        tdBtn.classList.add('align-middle');
        tdBtn.innerHTML = `<a class="btn btn-outline-primary"><i class="bi bi-pencil-square"></i>Edit</a> |
                            <a class="btn btn-outline-info"Id"><i class="bi bi-eye"></i>Details</a> |
                            <a class="btn btn-danger text-white"><i class="bi bi-trash"></i>Delete</a> |`;
        const img = document.createElement('img');
        img.classList.add('rounded-circle');
        img.style.maxWidth = '150px';
        img.setAttribute('src', `${cinema.logo}`);
        tr.appendChild(td);
        tr.appendChild(tdName);
        tr.appendChild(tdBio);
        tr.appendChild(tdBtn);
        td.appendChild(img);
        tableBody.appendChild(tr);
    });
    helper.hideSpinner();
}
getCinemas();
//# sourceMappingURL=cinemas.js.map