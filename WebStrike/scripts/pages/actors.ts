import { actors } from '../../wwwroot/js/Interfaces/interfaces.js';
import helper from '../../wwwroot/js/helper/helper.js';

declare var axios: any;
declare var bootstrap: any; //nodig voor modals

//let actors: actors;

const dvactorsDiv = <HTMLDivElement>document.getElementById('actorsDiv');
const RootUrl = "https://localhost:7244/"

//class ActorsPage {
//    id: number;
//    constructor(id: number, ProfilePictureURL: string, FullName: string, Bio: string, MovieId: number) {
//        this.id = id;
//    }
//}

async function getActors() {
    try {
        const req = await axios(`${RootUrl}/api/Actors/GetActors`)
        const res = req.data;
        console.log('res',res)
    }
    catch(error) {
        console.log("Error:", error);
    }
}

//async function getActors() {
//    const req = await fetch(`${RootUrl}/api/Actors/GetActors`, {
//        method: 'GET', cache: "no-store", mode: 'cors'
//    })
//    //const res = req;
//    console.log('res', req.json)
//}

getActors();