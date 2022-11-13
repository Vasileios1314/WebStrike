import { actors } from '../../wwwroot/js/Interfaces/interfaces.js';
import * as helper from '../helper/helper.js';

declare var bootstrap: any;

const actorsDiv = <HTMLDivElement>document.getElementById('actorsDiv');
const tableBody = <HTMLBodyElement>document.getElementById('tableBody');


let RootUrl: string = window.location.origin;

class Actor {
    id: number;
    profilePictureURL: string;
    fullName: string;
    bio: string;
    actors_Movies: number;

    constructor(id: number, profilePictureURL: string, fullName: string, bio: string, actors_Movies: number) {
        this.id = id;
        this.profilePictureURL = profilePictureURL;
        this.fullName = fullName;
        this.bio = bio;
        this.actors_Movies = actors_Movies;
    }



    async getRow() {
        helper.showSpinner()

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
                            <a class="btn btn-outline-primary"><i class="bi bi-pencil-square"></i>Edit</a> |
                            <a class="btn btn-outline-info"Id" id="detailsBtn"><i class="bi bi-eye"></i>Details</a> |
                            <a class="btn btn-danger text-white"><i class="bi bi-trash"></i>Delete</a> |
                        </td>
                </tr>`;
        helper.hideSpinner()
    }
    async getActorById() {
            let req = await helper.AjxGet(`${RootUrl}/api/Api/GetActor/${this.id}`)
                .then((response) => response.id)

            console.log('res', req)
    }
}

//test
async function getActors() {
    const displayActors: Actor[] = await helper.AjxGet(`${RootUrl}/api/Api/GetActors`);


    if (displayActors == null) {
        helper.showSpinner()
    }

    displayActors.map( actor => {
        new Actor(actor.id, actor.profilePictureURL, actor.fullName, actor.bio, actor.actors_Movies).getRow()

        const detailsBtn = <HTMLButtonElement>document.getElementById('detailsBtn');
        detailsBtn.addEventListener('click', () => {
            new Actor(actor.id, actor.profilePictureURL, actor.fullName, actor.bio, actor.actors_Movies).getActorById()     
        })
    });
    console.log('res', displayActors)
}


getActors();