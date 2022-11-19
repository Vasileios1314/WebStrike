import * as helper from '../helper/helper.js';
const actorsDiv = document.getElementById('actorsDiv');
const tableBody = document.getElementById('tableBody');
let RootUrl = window.location.origin;
class Actor {
    constructor(id, profilePictureURL, fullName, bio, actors_Movies) {
        this.id = id;
        this.profilePictureURL = profilePictureURL;
        this.fullName = fullName;
        this.bio = bio;
        this.actors_Movies = actors_Movies;
    }
    getRow() {
        tableBody.innerHTML += `
                 <tr id=${this.id}>
                    <td class="align-middle">
                        <img class="rounded-circle" src="${this.profilePictureURL}" alt=${this.fullName}" style="max-width: 150px"/>
                    </td>
                    <td class="align-middle">
                        ${this.fullName}
                    </td>
                    <td class="align-middle">
                        ${this.bio}
                    </td>
                        <td class="align-middle">
                            <button class="btn btn-outline-primary" id="editBtn-${this.id}"><i class="bi bi-pencil-square" style="pointer-events:none;"></i>Edit</button> |
                            <button class="btn btn-outline-info" id="detailsBtn-${this.id}"><i class="bi bi-eye" style="pointer-events:none;"></i>Details</button> |
                            <button class="btn btn-danger text-white" id="dltBtn-${this.id}"><i class="bi bi-trash" style="pointer-events:none;"></i>Delete</button> |
                        </td>
                </tr>`;
    }
}
async function initActorsPage() {
    await getActors();
    await getActorById();
}
async function getActors() {
    const displayActors = await helper.AjxGet(`${RootUrl}/api/Api/GetActors`);
    helper.showSpinner();
    if (displayActors == null) {
        helper.showSpinner();
    }
    displayActors.map(actor => {
        new Actor(actor.id, actor.profilePictureURL, actor.fullName, actor.bio, actor.actors_Movies).getRow();
    });
    console.log('res', displayActors);
}
function getActorById() {
    //let detailsBtn = document.querySelector("button[id^='detailsBtn-']");
    document.addEventListener('click', async (evt) => {
        const getId = evt.srcElement;
        //console.log('getId', getId.id)
        const id = parseInt(getId.id.split('-').pop());
        const req = await helper.AjxGet(`${RootUrl}/api/Api/GetActor/${id}`)
            .then((response) => response.id);
        console.log('res', req);
    });
}
initActorsPage();
//# sourceMappingURL=actors.js.map