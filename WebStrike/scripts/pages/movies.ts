import { movies } from '../../wwwroot/js/Interfaces/interfaces.js';
import * as helper from '../helper/helper.js';

declare var bootstrap: any;

const moviesDiv = <HTMLDivElement>document.getElementById('moviesDiv');
const tableBody = <HTMLBodyElement>document.getElementById('tableBody');
const card = <HTMLDivElement>document.getElementById('card');


let RootUrl: string = window.location.origin;

async function getMovies() {
    //helper.showSpinner()
    const displayMovies = await helper.AjxGet(`${RootUrl}/api/Api/GetMovies`);
    console.log('res', displayMovies)
    console.log('id', displayMovies.map(x => x.name))

    if (displayMovies == null) {
        helper.showSpinner();
    };

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
        headTitle.innerHTML = `${movie.name}`;

        const headEditBtn = document.createElement('a');
        headEditBtn.classList.add('btn');
        headEditBtn.classList.add('text-white');
        headEditBtn.style.cssFloat = "right";

        headEditBtn.setAttribute('id', 'btnEdit');
        headEditBtn.innerHTML = `<i class="bi bi-pencil-square"></i>`;

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
        div3BodyDetails.innerHTML = `
                            <p class="card-text">${movie.description}</p>
                            <p class="card-text"><b>Cinema: ${movie.cinemaId}</b></p>
                            <p class="card-text"><b>Category: ${movie.movieCategory}</b></p>
                            <p class="card-text" type="date"><b>Start Date: ${movie.startDate}</b></p>
                            <p class="card-text"><b>End Date: ${movie.endDate}</b></p>
                            <p class="card-text"><b>Status:</b></p>`;
        //footer
        const div1Footer = document.createElement('div');
        div1Footer.classList.add('col-md-12');

        const div2Footer = document.createElement('div');
        div2Footer.classList.add('card-footer');
        div2Footer.innerHTML = `
                            <p class="card-text">
                            <a class="btn btn-success text-white" id="btnCart">
                                    <i class="bi bi-cart-plus"></i>
                                </a>
                            <a class="btn btn-outline-primary float-right" id="btnShowDetails">
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
    });
    helper.hideSpinner();
};


getMovies();
        //const tr = document.createElement('tr');
        //tr.classList.add('align-middle')
        //tr.setAttribute('id', `${movie.id}`)

        //const td = document.createElement('td');
        //td.classList.add('align-middle')

        //const tdName = document.createElement('td');
        //tdName.classList.add('align-middle')
        //tdName.innerHTML = `${movie.name}`

        //const tdBio = document.createElement('td');
        //tdBio.classList.add('align-middle')
        //tdBio.innerHTML = `${movie.description}`

        //const tdBtn = document.createElement('td');
        //tdBtn.classList.add('align-middle')
        //tdBtn.innerHTML = `<a class="btn btn-outline-primary"><i class="bi bi-pencil-square"></i>Edit</a> |
        //                    <a class="btn btn-outline-info"Id"><i class="bi bi-eye"></i>Details</a> |
        //                    <a class="btn btn-danger text-white"><i class="bi bi-trash"></i>Delete</a> |`

        //const img = document.createElement('img')
        //img.classList.add('rounded-circle')
        //img.style.maxWidth = '150px'
        //img.setAttribute('src', `${movie.imageURL}`)

        //tr.appendChild(td);
        //tr.appendChild(tdName);
        //tr.appendChild(tdBio);
        //tr.appendChild(tdBtn)
        //td.appendChild(img)
        //tableBody.appendChild(tr)