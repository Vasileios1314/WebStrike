import { actors } from '../../wwwroot/js/Interfaces/interfaces.js';
import * as helper from '../helper/helper.js';

declare var bootstrap: any;

const actorsDiv = <HTMLDivElement>document.getElementById('actorsDiv');
const tableBody = <HTMLBodyElement>document.getElementById('tableBody');

let RootUrl: string = window.location.origin;

async function getActors() {
    helper.showSpinner()

    const displayActors = await helper.AjxGet(`${RootUrl}/api/Api/GetActors`);
    console.log('res', displayActors)
    console.log('id', displayActors.map(x => x.fullName))

    if (displayActors == null) {
        helper.showSpinner()
    }

    displayActors.map(actor => {
        const tr = document.createElement('tr');
        tr.classList.add('align-middle')
        tr.setAttribute('id', `${actor.id}`)

        const td = document.createElement('td');
        td.classList.add('align-middle')

        const tdName = document.createElement('td');
        tdName.classList.add('align-middle')
        tdName.innerHTML = `${actor.fullName}`

        const tdBio = document.createElement('td');
        tdBio.classList.add('align-middle')
        tdBio.innerHTML = `${actor.bio}`

        const tdBtn = document.createElement('td');
        tdBtn.classList.add('align-middle')
        tdBtn.innerHTML = `<a class="btn btn-outline-primary"><i class="bi bi-pencil-square"></i>Edit</a> |
                            <a class="btn btn-outline-info"Id"><i class="bi bi-eye"></i>Details</a> |
                            <a class="btn btn-danger text-white"><i class="bi bi-trash"></i>Delete</a> |`

        const img = document.createElement('img')
        img.classList.add('rounded-circle')
        img.style.maxWidth = '150px'
        img.setAttribute('src', `${actor.profilePictureURL}`)

        tr.appendChild(td);
        tr.appendChild(tdName);
        tr.appendChild(tdBio);
        tr.appendChild(tdBtn)
        td.appendChild(img)
        tableBody.appendChild(tr)
    })


    //displayActors.map(actor => {
    //    tableBody.innerHTML = `
    //            <tr id=${actor.id}>
    //                <td class="align-middle">
    //                    <img class="rounded-circle" src="${actor.profilePictureURL}" alt=${actor.fullName}" style="max-width: 150px"/>
    //                </td>
    //                <td class="align-middle">
    //                    ${actor.fullName}
    //                </td>
    //                <td class="align-middle">
    //                    ${actor.bio}
    //                </td>
    //                    <td class="align-middle">
    //                        <a class="btn btn-outline-primary"><i class="bi bi-pencil-square"></i>Edit</a> |
    //                        <a class="btn btn-outline-info"Id"><i class="bi bi-eye"></i>Details</a> |
    //                        <a class="btn btn-danger text-white"><i class="bi bi-trash"></i>Delete</a> |
    //                    </td>
    //            </tr>`;
    //});
    helper.hideSpinner()
}


getActors();