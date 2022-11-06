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
function getActors() {
    return __awaiter(this, void 0, void 0, function* () {
        helper.showSpinner();
        const displayActors = yield helper.AjxGet(`${RootUrl}/api/Api/GetActors`);
        console.log('res', displayActors);
        console.log('id', displayActors.map(x => x.fullName));
        if (displayActors == null) {
            helper.showSpinner();
        }
        displayActors.map(actor => {
            const tr = document.createElement('tr');
            tr.classList.add('align-middle');
            tr.setAttribute('id', `${actor.id}`);
            const td = document.createElement('td');
            td.classList.add('align-middle');
            const tdName = document.createElement('td');
            tdName.classList.add('align-middle');
            tdName.innerHTML = `${actor.fullName}`;
            const tdBio = document.createElement('td');
            tdBio.classList.add('align-middle');
            tdBio.innerHTML = `${actor.bio}`;
            const tdBtn = document.createElement('td');
            tdBtn.classList.add('align-middle');
            tdBtn.innerHTML = `<a class="btn btn-outline-primary"><i class="bi bi-pencil-square"></i>Edit</a> |
                            <a class="btn btn-outline-info"Id"><i class="bi bi-eye"></i>Details</a> |
                            <a class="btn btn-danger text-white"><i class="bi bi-trash"></i>Delete</a> |`;
            const img = document.createElement('img');
            img.classList.add('rounded-circle');
            img.style.maxWidth = '150px';
            img.setAttribute('src', `${actor.profilePictureURL}`);
            tr.appendChild(td);
            tr.appendChild(tdName);
            tr.appendChild(tdBio);
            tr.appendChild(tdBtn);
            td.appendChild(img);
            tableBody.appendChild(tr);
        });
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
        helper.hideSpinner();
    });
}
getActors();
//# sourceMappingURL=actors.js.map