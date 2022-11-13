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
let RootUrl = window.location.origin;
const card = document.getElementById('card');
function getMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        helper.showSpinner();
        const displayMovies = yield helper.AjxGet(`${RootUrl}/api/Api/GetMovies`);
        console.log('res', displayMovies);
        if (displayMovies == null) {
            helper.showSpinner();
        }
        ;
        displayMovies.map(movie => {
            //head
            const div1 = document.createElement('div');
            div1.classList.add('col-md-4');
            div1.classList.add('col-xs-6');
            div1.classList.add('border-primary');
            div1.classList.add('mb-3');
            const div2 = document.createElement('div');
            div2.classList.add('card');
            div2.classList.add('mb-3');
            div2.style.maxWidth = "540px";
            const div3Row = document.createElement('div');
            div3Row.classList.add('row');
            div3Row.classList.add('g-0');
            const div4Col = document.createElement('div');
            div4Col.classList.add('col-md-12');
            const div5Head = document.createElement('div');
            div5Head.classList.add('card-header');
            div5Head.classList.add('text-white');
            div5Head.classList.add('bg-info');
            const headParag = document.createElement('p');
            headParag.classList.add('card-text');
            const headTitle = document.createElement('h5');
            headTitle.classList.add('card-title');
            headTitle.setAttribute('id', 'cardTitle');
            headTitle.innerHTML += `${movie.name}`;
            const headEditBtn = document.createElement('a');
            headEditBtn.classList.add('btn');
            headEditBtn.classList.add('text-white');
            headEditBtn.style.cssFloat = "right";
            headEditBtn.setAttribute('id', 'btnEdit');
            headEditBtn.innerHTML += `<i class="bi bi-pencil-square"></i>`;
            //body
            const div1Body = document.createElement('div');
            div1Body.classList.add('col-md-6');
            div1Body.setAttribute('id', 'dvCardImg');
            const img = document.createElement('img');
            img.setAttribute('src', `${movie.imageURL}`);
            img.setAttribute('alt', `${movie.name}`);
            img.style.width = "100%";
            const div2BodyDetails = document.createElement('div');
            div2BodyDetails.classList.add('col-md-6');
            const div3BodyDetails = document.createElement('div');
            div3BodyDetails.classList.add('card-body');
            div3BodyDetails.setAttribute('id', 'dvCardDetails');
            div3BodyDetails.innerHTML += `
                            <p class="card-text">${movie.description}</p>
                            <p class="card-text"><b>Cinema: ${movie.cinema.name}</b></p>
                            <p class="card-text"><b>Category: ${movie.movieCategory}</b></p>
                            <p class="card-text" type="date"><b>Start Date: ${dayjs(movie.startDate).format('ddd DD MMM YYYY')}</b></p>
                            <p class="card-text"><b>End Date: ${dayjs(movie.endDate).format('ddd DD MMM YYYY')}</b></p>
                            <p class="card-text"><b>Status: <span class="badge bg-success text-white" id="status">AVAILABLE</span></b></p>`;
            //footer
            const div1Footer = document.createElement('div');
            div1Footer.classList.add('col-md-12');
            const div2Footer = document.createElement('div');
            div2Footer.classList.add('card-footer');
            div2Footer.innerHTML += `
                            <p class="card-text">
                            <a class="btn btn-success text-white" id="btnCart">
                                    <i class="bi bi-cart-plus"></i> Add to Cart  | $${movie.price}
                                </a>
                            <a class="btn btn-outline-primary" id="btnShowDetails">
                                    <i class="bi bi-eye-fill"></i> Show Details
                                </a>
                            </p>`;
            //append
            //append header
            headTitle.appendChild(headEditBtn);
            headParag.appendChild(headTitle);
            div5Head.appendChild(headParag);
            div4Col.appendChild(div5Head);
            div3Row.appendChild(div4Col);
            div2.appendChild(div3Row);
            div1.appendChild(div2);
            card.appendChild(div1);
            //append body
            div1Body.appendChild(img);
            div3Row.appendChild(div1Body);
            div2BodyDetails.appendChild(div3BodyDetails);
            div3Row.appendChild(div2BodyDetails);
            //append footer 
            div3Row.appendChild(div1Footer);
            div1Footer.appendChild(div2Footer);
            const status = document.getElementById('status');
            if (Date() >= movie.StartDate && Date() <= movie.EndDate) {
                status.innerText = `AVAILABLE`;
            }
            else if (Date() > movie.EndDate) {
                status.innerText = `EXPIRED`;
            }
            else {
                status.innerText = `UPCOMING`;
            }
        });
        helper.hideSpinner();
        // render movie status
    });
}
;
getMovies();
//# sourceMappingURL=movies.js.map