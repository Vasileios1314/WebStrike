var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return __awaiter(this, void 0, void 0, function* () {
            helper.showSpinner();
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
            helper.hideSpinner();
        });
    }
    getActorById() {
        return __awaiter(this, void 0, void 0, function* () {
            let req = yield helper.AjxGet(`${RootUrl}/api/Api/GetActor/${this.id}`)
                .then((response) => response.id);
            console.log('res', req);
        });
    }
}
//test2
function getActors() {
    return __awaiter(this, void 0, void 0, function* () {
        const displayActors = yield helper.AjxGet(`${RootUrl}/api/Api/GetActors`);
        if (displayActors == null) {
            helper.showSpinner();
        }
        displayActors.map(actor => {
            new Actor(actor.id, actor.profilePictureURL, actor.fullName, actor.bio, actor.actors_Movies).getRow();
            const detailsBtn = document.getElementById('detailsBtn');
            detailsBtn.addEventListener('click', () => {
                new Actor(actor.id, actor.profilePictureURL, actor.fullName, actor.bio, actor.actors_Movies).getActorById();
            });
        });
        console.log('res', displayActors);
    });
}
getActors();
//# sourceMappingURL=actors.js.map