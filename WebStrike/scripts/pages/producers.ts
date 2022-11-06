import { producers } from '../../wwwroot/js/Interfaces/interfaces.js';
import * as helper from '../helper/helper.js';

declare var bootstrap: any;

const producersDiv = <HTMLDivElement>document.getElementById('producersDiv');
const tableBody = <HTMLBodyElement>document.getElementById('tableBody');

let RootUrl: string = window.location.origin;

async function getProducers() {
    helper.showSpinner()

    const displayProducers = await helper.AjxGet(`${RootUrl}/api/Api/Getproducers`);
    console.log('res', displayProducers)
    console.log('id', displayProducers.map(x => x.fullName))

    if (displayProducers == null) {
        helper.showSpinner()
    }

    displayProducers.map(producer => {
        const tr = document.createElement('tr');
        tr.classList.add('align-middle')
        tr.setAttribute('id', `${producer.id}`)

        const td = document.createElement('td');
        td.classList.add('align-middle')

        const tdName = document.createElement('td');
        tdName.classList.add('align-middle')
        tdName.innerHTML = `${producer.fullName}`

        const tdBio = document.createElement('td');
        tdBio.classList.add('align-middle')
        tdBio.innerHTML = `${producer.bio}`

        const tdBtn = document.createElement('td');
        tdBtn.classList.add('align-middle')
        tdBtn.innerHTML = `<a class="btn btn-outline-primary"><i class="bi bi-pencil-square"></i>Edit</a> |
                            <a class="btn btn-outline-info"Id"><i class="bi bi-eye"></i>Details</a> |
                            <a class="btn btn-danger text-white"><i class="bi bi-trash"></i>Delete</a> |`

        const img = document.createElement('img')
        img.classList.add('rounded-circle')
        img.style.maxWidth = '150px'
        img.setAttribute('src', `${producer.profilePictureURL}`)

        tr.appendChild(td);
        tr.appendChild(tdName);
        tr.appendChild(tdBio);
        tr.appendChild(tdBtn)
        td.appendChild(img)
        tableBody.appendChild(tr)
    })
    helper.hideSpinner()
}


getProducers();