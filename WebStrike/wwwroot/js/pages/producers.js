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
const producersDiv = document.getElementById('producersDiv');
const tableBody = document.getElementById('tableBody');
let RootUrl = window.location.origin;
function getProducers() {
    return __awaiter(this, void 0, void 0, function* () {
        const displayProducers = yield helper.AjxGet(`${RootUrl}/api/Api/Getproducers`);
        console.log('res', displayProducers);
        console.log('id', displayProducers.map(x => x.fullName));
        if (displayProducers == null) {
            producersDiv.innerHTML = 'Loading...';
        }
        displayProducers.map(producer => {
            const tr = document.createElement('tr');
            tr.classList.add('align-middle');
            tr.setAttribute('id', `${producer.id}`);
            const td = document.createElement('td');
            td.classList.add('align-middle');
            const tdName = document.createElement('td');
            tdName.classList.add('align-middle');
            tdName.innerHTML = `${producer.fullName}`;
            const tdBio = document.createElement('td');
            tdBio.classList.add('align-middle');
            tdBio.innerHTML = `${producer.bio}`;
            const tdBtn = document.createElement('td');
            tdBtn.classList.add('align-middle');
            tdBtn.innerHTML = `<a class="btn btn-outline-primary"><i class="bi bi-pencil-square"></i>Edit</a> |
                            <a class="btn btn-outline-info"Id"><i class="bi bi-eye"></i>Details</a> |
                            <a class="btn btn-danger text-white"><i class="bi bi-trash"></i>Delete</a> |`;
            const img = document.createElement('img');
            img.classList.add('rounded-circle');
            img.style.maxWidth = '150px';
            img.setAttribute('src', `${producer.profilePictureURL}`);
            tr.appendChild(td);
            tr.appendChild(tdName);
            tr.appendChild(tdBio);
            tr.appendChild(tdBtn);
            td.appendChild(img);
            tableBody.appendChild(tr);
        });
    });
}
getProducers();
//# sourceMappingURL=producers.js.map