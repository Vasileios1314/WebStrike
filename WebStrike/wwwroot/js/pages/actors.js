var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//let actors: actors;
const dvactorsDiv = document.getElementById('actorsDiv');
const RootUrl = "https://localhost:7244/";
//class ActorsPage {
//    id: number;
//    constructor(id: number, ProfilePictureURL: string, FullName: string, Bio: string, MovieId: number) {
//        this.id = id;
//    }
//}
function getActors() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const req = yield axios(`${RootUrl}/api/Actors/GetActors`);
            const res = req.data;
            console.log('res', res);
        }
        catch (error) {
            console.log("Error:", error);
        }
    });
}
//async function getActors() {
//    const req = await fetch(`${RootUrl}/api/Actors/GetActors`, {
//        method: 'GET', cache: "no-store", mode: 'cors'
//    })
//    //const res = req;
//    console.log('res', req.json)
//}
getActors();
export {};
