export function toShortDateString(d: Date, inclTime: Boolean) { // -> gebruik toLocaleDateString()

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let toReturn: string = `${d.getDate()}-${monthNames[d.getMonth()]}-${d.getFullYear()}`;

    if (inclTime) {
        toReturn += ` ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`;
    }

    return toReturn;
}

export function toDateTimeString(dt: Date) {
    let toReturn: string = '';

    //10/07/2021 10:34
    toReturn += dt.toLocaleDateString(undefined) + ' '
    //toReturn += dt.toLocaleTimeString(undefined) //te uitvoerig
    toReturn += `${dt.getHours()}:`;
    toReturn += `${('0' + dt.getMinutes()).slice(-2)}`;

    //return `${('0' + d.getDate()).slice(-2)}
    //-${ ('0' + (d.getMonth() + 1)).slice(-2) } 
    //-${ d.getFullYear() } 
    //${ d.getHours() }: 
    //${ ('0' + d.getMinutes()).slice(-2) }`;

    return toReturn;
}

export function forDateTimeBoxString(dt: Date) {
    let toReturn: string = '';

    //"yyyy-MM-ddThh:mm:ss"
    toReturn += `${dt.getFullYear()}-`;
    toReturn += `${('0' + (dt.getMonth() + 1)).slice(-2)}-`;
    toReturn += `${('0' + dt.getDate()).slice(-2)}T`;
    toReturn += `${('0' + dt.getHours()).slice(-2)}:`;
    toReturn += `${('0' + dt.getMinutes()).slice(-2)}`;
    //toReturn += `:${dt.getSeconds()}`

    return toReturn;
}

export function toDateTimeLocalString(d: Date): string {
    //'2021-02-11T09:59:00.000Z' to
    //'2021-02-11T09:59'

    let tmp: string = d.toISOString();
    //tmp = tmp.substring(0, 16);
    return tmp;
}

export function parseDateTime(input: string): Date {

    let sDate: string;
    let sTime: string;
    let aryDate: string[];
    let aryTime: string[];
    let toReturn: Date;
    let y: number = 0;
    let mo: number = 0;
    let d: number = 0;
    let h: number = 0;
    let mi: number = 0;

    //17-04-2020 8:48 = "datetime" formatting
    //2017-06-01T08:30 = "datetime-local"
    if (input.length == 0) {
        return null;
    }

    if (input.includes(" ")) {
        // "datetime" formatting
        sDate = input.split(' ')[0]; //split de dag van de tijd
        sTime = input.split(' ')[1];
        if (sDate.trim().length > 0) {
            aryDate = sDate.split('-'); //split de dag
            y = parseInt(aryDate[2]);
            mo = parseInt(aryDate[1]) - 1;
            d = parseInt(aryDate[0]);
        }
        if (sTime.trim().length > 0) {
            aryTime = sTime.split(':');
            h = parseInt(aryTime[0]);
            mi = parseInt(aryTime[1]);
        }

        toReturn = new Date(y, mo, d, h, mi);
    } else {
        // "datetime-local" formatting
        toReturn = new Date(input);
    }

    return toReturn;
}
export function isValidDate(d: Date): boolean {
    if (d === null) {
        return false;
    }

    if (isNaN(d.getTime())) {
        return false;
    } else {
        return true;
    }
}

export function sortArray(array: any[], prop1: string, prop2: string = null): void {
    if (prop2) {
        array.sort((a, b) => {
            return (a[prop1][prop2] > b[prop1][prop2]) ? 1 : -1
        })
    } else {
        array.sort((a, b) => {
            if (a[prop1] == null || a[prop1] == undefined) {
                return 1;
            }
            else if (b[prop1] == null || b[prop1] == undefined) {
                return -1;
            }
            else {
                return (a[prop1].toString().toLowerCase() > b[prop1].toString().toLowerCase()) ? 1 : -1
                //return a[prop1].localeCompare(b[prop1]); //bugfix
                //return a[prop1].toLowerCase().localeCompare(b[prop1].toLowerCase()); //bugfix
                //return (a[prop1] > b[prop1]) ? 1 : -1 //bug > houd rekening met hoofdletters, dit is niet de bedoeling 
            }
        })
    }
}

export function sortArray2(array: any[], sk1: string, sk2: string) { // sk = sortkey
    //dit is een multisortkey sorteer functie

    array.sort((a, b) => {

        let p1 = null;
        let p2 = null;

        if (isNaN(a[sk1])) {
            //string, date enz. //nu een undefined check
            p1 = a[sk1]?.localeCompare(b[sk1]);
        } else {
            //numbers
            p1 = a[sk1] - b[sk1];
        }

        if (sk2) {
            if (isNaN(a[sk2])) {
                //string, date enz. //nu een undefined check
                p2 = a[sk2]?.localeCompare(b[sk2]);
            } else {
                //numbers
                p2 = a[sk2] - b[sk2];
            }
        }
        return p1 || p2;

        //return a[sk1].localeCompare(b[sk1]) || a[sk2] - b[sk2];
    });
}

export function jsonParse(object: any) {
    //convert json strings to objects
    //check all arrayitems and parse the jsonstring (to object)

    if (object) {
        if (Array.isArray(object)) {
            //it is an array, ok
            for (let i = 0; i < object.length; i++) {
                object[i] = jsonParse(object[i]); //resursive
            }
        } else if (typeof (object) == 'object') {
            //it is an object
            let keys = Object.keys(object);
            for (let k = 0; k < keys.length; k++) {
                let prop: any = object[keys[k]];
                if (typeof (prop) == "string") {
                    try {
                        object[keys[k]] = JSON.parse(prop);
                    } catch (e) {
                        //swallow it
                    }
                } else if (typeof (prop) == 'object') {
                    object[keys[k]] = jsonParse(prop); //resursive
                }
            }
        } else if (typeof (object) == 'string') {
            try {
                object = JSON.parse(object);
                object = jsonParse(object); //resursive
            } catch (e) {
                //swallow it
            }
        }

        //} else if (typeof (object) == 'object') {
        //    //it is an object
        //    let keys = Object.keys(object);
        //    for (let k = 0; k < keys.length; k++) {
        //        let prop: any = object[keys[k]];
        //        if (Array.isArray(prop)) {  //if (typeof (prop) == "string") {
        //          prop = jsonParse(prop); //resursive  //prop = JSON.parse(prop);
        //        }
        //    }
        //} else {
        //    //main level
        //    if (typeof (object.data) == "string") {
        //        object.data = JSON.parse(object.data);
        //    }

        //    if (typeof (object.config) == "string") {
        //        object.config = JSON.parse(object.config);
        //    }

        //    if (typeof (object.label) == "string") {
        //        object.label = JSON.parse(object.label);
        //    }
        //}
    }

    return object
}

export function convertStringArrayToNumberArray(array: any[]): number[] {
    let output: number[] = [];
    if (array) {
        for (let i = 0; i < array.length; i++) {
            output.push(parseInt(array[i]))
        }
    }
    return output;
}
export function distinctArrays(array: any[]): any[] {
    return [...new Set(array)]; //es6
}

export function renderHtmlString(renderMethod: any): string {
    let html: string[] = [];
    let s: number = 0;

    renderMethod(html, s);

    return html.join('');
}

declare global {
    interface HTMLElement { empty(): void }
}

HTMLElement.prototype.empty = function () { //kan niet met lambda!!
    var that = this;
    while (that.hasChildNodes()) {
        that.removeChild(that.lastChild);
    }
};

export function addClass(object: any, name: string): void {
    // Test the type of the constructor
    switch (object.constructor) {
        case NodeList:
            object?.forEach((item) => {
                addClassToItem(<HTMLElement>item, name);
            });
            break;

        case String:
            // the string can be any css selector (like: #idselector or .classselector)
            let items = document.querySelectorAll(object);
            items?.forEach((item) => {
                addClassToItem(item, name);
            });
            break;

        // The default is an HTMLElement or an extended class of it, like HTMLButtonElement
        default:
            addClassToItem(object, name);
            break;

    }
}

function addClassToItem(item: HTMLElement, name: string): void {
    item.classList.add(name);
}

export function removeClass(object: any, name: string): void {
    // Test the type of the constructor
    switch (object.constructor) {
        case NodeList:
            object?.forEach((item) => {
                removeClassFromItem(<HTMLElement>item, name);
            });
            break;

        case String:
            // the string can be any css selector (like: #idselector or .classselector)
            let items = document.querySelectorAll(object);
            items?.forEach((item) => {
                removeClassFromItem(item, name);
            });
            break;

        // The default is an HTMLElement or an extended class of it, like HTMLButtonElement
        default:
            removeClassFromItem(object, name);
            break;

    }
}

function removeClassFromItem(item: HTMLElement, name: string): void {
    item.classList.remove(name);
}

// Check if 2 strings are the same by stripping spaces and using lowercase and compare the results
export function compareStrings(string1: string, string2: string): boolean {
    let valid = true;
    valid = trimSpacesAndSetToLowercase(string1) === trimSpacesAndSetToLowercase(string2);
    return valid;
}

export function trimSpacesAndSetToLowercase(string: string): string {
    string = string.replace(/\s+/g, '').toLowerCase();
    return string;
}


export function showWait() {
    const loaderoverlay = <HTMLDivElement>document.getElementById('loaderoverlay');
    const loader = <HTMLDivElement>document.getElementById('loader');
    loaderoverlay.style.display = "block";
    loader.style.display = "grid";
}
export function hideWait() {
    const loaderoverlay = <HTMLDivElement>document.getElementById('loaderoverlay');
    const loader = <HTMLDivElement>document.getElementById('loader');
    loaderoverlay.style.display = "none";
    loader.style.display = "none";
}

export function showSpinner(inline = false, parentSelector: string | undefined = undefined) {
    const spinnerHtml = '<div class="spinner-border text-success" ></div>';
    let spinner = document.getElementById('spinner');
    if (!spinner) {
        spinner = document.createElement('div');
        spinner.setAttribute('id', 'spinner');
        spinner.setAttribute('class', 'text-center');

        if (inline) {
            spinner.classList.add('inline');
        }
        spinner.innerHTML = spinnerHtml;

        if (parentSelector) {
            const parent = document.querySelector(parentSelector);
            parent.appendChild(spinner);
        }
        else {
            document.body.appendChild(spinner);
        }
    }

}
export function hideSpinner() {
    const spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.remove();
    }
}

export function renderPrice(price, maxDigits = 2) {
    const formatter = new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: maxDigits
    });

    return formatter.format(price);
}

export function randomid(length: number): string {
    let result: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export async function AjxPutJSON(url: string, JSONobject: any, JSONReturnObject: boolean = false): Promise<any> {
    //todo: CSRF token mee posten

    try {
        let response: Response = await fetch(url, {
            method: 'PUT',
            credentials: 'same-origin',
            body: JSON.stringify(JSONobject),
            headers: { 'Content-Type': 'application/json' }
        })

        if (JSONReturnObject) {
            if (response.status == 200) {
                return response.json();
            } else {
                console.log(response);
            }
            throw new Error;
        } else {
            if (response.status == 200) {
                return true;
            } else {
                return false;
            }
        }
    }
    catch (ex) {
        throw ex;
    };

    //throw new Error;
}
export async function AjxDeleteJSON(url: string, JSONobject: any) {
    //todo: CSRF token mee posten

    try {
        let response: Response = await fetch(url, {
            method: 'DELETE',
            credentials: 'same-origin',
            body: JSON.stringify(JSONobject),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.status == 200) {
            return true;
        } else {
            console.log(response);
            return false;
        }
    }
    catch (ex) {
        throw ex;
    };
}
export async function AjxPost(url: string, object: any): Promise<boolean> {
    //todo: CSRF token mee posten

    try {
        let response: Response;
        if (object) {
            response = await fetch(url, {
                method: 'POST',
                credentials: 'same-origin',
                body: object,
                headers: {
                    'Content-Type': object.type,
                    'Content-Disposition': `attachment;filename="${object.name}"`
                }
            })
        } else {
            response = await fetch(url, {
                method: 'POST',
                credentials: 'same-origin'
            })
        }


        if (response.status == 200) {
            return true;
        } else {
            console.log(response);
            return false;
        }
    }
    catch (ex) {
        throw ex;
    };
}

//export async function getJWToken(target: string = 'export', onError: { () } = null): Promise<any> {
//	//get JWT
//	//preflight fetch met in de header de bearer jwttoken
//	let jwtToken: string;
//	await fetch(`${RootUrl}/api/session/GetJWT/${target}`, {
//		cache: "no-store", mode: 'cors', credentials: 'same-origin', headers: { Authorization: `Bearer ${jwtToken}` }
//	}).then((data) => {
//		if (data.ok) {
//			return data.text(); //geen json maar text
//		} else {
//			this.responseError(data);
//		}
//	}).then((text) => {
//		jwtToken = text;
//	}).catch(err => {
//		if (onError) {
//			onError();
//		}
//		this.showFetchError(err);
//	});

//	return jwtToken;
//}
//export async function AjxToken(url: string, jwtToken: string, method: string = 'GET', body: any = null, onError: { () } = null, (returntype: ReturnType,) keepalive: boolean = false): Promise<any> {
//	return fetch(url, {
//		method: method,
//		cache: 'no-store',
//		mode: 'cors',
//		headers: { Authorization: `Bearer ${jwtToken}`, 'Content-Type': 'application/json' },
//		body: body ? JSON.stringify(body) : null,
//		keepalive: keepalive
//	})
//		.then(response => {
//			if (!response.ok) {
//				if (onError) {
//					onError();
//				}
//				this.responseError(response);
//				return null;
//			} else {
//				//switch (returntype) {
//				//	case ReturnType.JSON: {
//				//		if (response.body) {
//				//			let jsonstring = response.json();
//				//			return jsonParse(jsonstring);
//				//		}
//				//	}
//				//	case ReturnType.TEXT: {
//				//		return response.text(); //no json but text
//				//		break;
//				//	}
//				//	case ReturnType.BLOB: {
//				//		return response.blob();
//				//		break;
//				//	}
//				//	case ReturnType.NONE: {
//				//		break;
//				//	}
//				//}
//			}
//		}).catch(err => {
//			if (onError) {
//				onError();
//			}
//			this.showFetchError(err);
//		});
//}

//Bootstrap API
//HTML
//<link id="theme" rel = "stylesheet" href = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" >
//	<div class="container mt-5" >
//		<div class="alert alert-info" >
//			<h1>Bootstrap < /h1>
//			< p > This is a demo of the Bootswatch API.< /p>
//				< /div>
//				< select class="form-select" > </select>
//					< /div>



////JS
//fetch('https://bootswatch.com/api/5.json')
//	.then(response => response.json())
//	.then(data => load(data));


//function load(data) {
//	const themes = data.themes;
//	const select = document.querySelector('select');

//	themes.forEach((value, index) => {
//		const option = document.createElement('option');
//		option.value = index;
//		option.textContent = value.name;

//		select.append(option);
//	});

//	select.addEventListener('change', (e) => {
//		const theme = themes[e.target.value];
//		document.querySelector('#theme').setAttribute('href', theme.css);
//		document.querySelector('.alert h1').textContent = theme.name;
//	});

//	const changeEvent = new Event('change');
//	select.dispatchEvent(changeEvent);
//}


//Function for getting data //usage let mydata: any = await this.GetData('18');
export async function AjxGetJSON(url: string, parseJson: boolean = false, timeout: number = 5000, onerror: { (err) } = null) {

    try {
        //const controller = new AbortController(); https://dmitripavlutin.com/timeout-fetch-request/
        //const id = setTimeout(() => controller.abort(), timeout);

        let hasFailed: boolean = false;

        const id = setTimeout(async () => {
            if (onerror) {
                onerror("timeoutexpired") //trigger the error callback
            }
            await console.log('err');

            hasFailed = true;
            return;
        }, timeout);

        const response: Response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            cache: "no-store",
            //signal: controller.signal
        })
        clearTimeout(id);

        if (hasFailed) {
            return null
        } else {
            if (response.ok) {
                if (parseJson) {
                    let jsonstring = await response;
                    return jsonParse(jsonstring);
                } else {
                    return response.json();
                }
            } else {
                if (onerror) {
                    onerror(response) //trigger the error callback
                }
                await console.log('err', response); //show and log the error
            }
        }
    }
    catch (ex) {
        //general failure
        if (onerror) {
            onerror(ex)
        }
        throw ex;
    };
}
export async function AjxGet(url: string, timeout: number = 5000, onerror: { (err) } = null) {

    try {
        //const controller = new AbortController(); https://dmitripavlutin.com/timeout-fetch-request/
        //const id = setTimeout(() => controller.abort(), timeout);

        // If timeout is null, the timeout alert appears immediately. 
        // That's not wat we want so in that case set the timeout to the default 5000 ms.
        if (timeout == null) {
            timeout = 5000;
        }

        let hasFailed: boolean = false;

        const id = setTimeout(async () => {
            if (onerror) {
                onerror("timeoutexpired") //trigger the error callback
            }
            await console.log('err', url, location.href)

            hasFailed = true;
            return;
        }, timeout);

        const response: Response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            cache: "no-store",
            //signal: controller.signal
        })

        clearTimeout(id);

        if (hasFailed) {
            return null
        } else {
            if (response.ok) {
                let jsonstring = await response.json();
                return jsonParse(jsonstring);
            } else {
                if (onerror) { //is a function defined ?
                    onerror(response) //trigger the error callback
                }
                await console.log('err', response); //show and log the error
            }
        }
    }
    catch (ex) {
        //general failure
        if (onerror) { //is a function defined ?
            onerror(ex)
        }
        throw ex;
    };
}

export async function AjxGetBLOB(url: string) {
    try {
        const response: Response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            cache: "no-store",
        })

        if (response.ok) {
            return response.blob();
        } else {
            console.log(response);
        }
    }
    catch (ex) {
        throw ex;
    };
}

export function bindEvent(object: any, event: string, callback: any, bindingNotAllowed: boolean = false): void {
    if (object && !bindingNotAllowed) {
        // Test the type of the constructor
        switch (object.constructor) {
            case NodeList:
                object?.forEach((item) => {
                    bindEventToItem(item, event, callback);
                });
                break;

            case String:
                // the string can be any css selector (like: #idselector or .classselector)
                let items = document.querySelectorAll(object);
                items?.forEach((item) => {
                    bindEventToItem(item, event, callback);
                });
                break;

            // The default is an HTMLElement or an extended class of it, like HTMLButtonElement
            default:
                bindEventToItem(object, event, callback);
                break;

        }
    }
}

function bindEventToItem(item: HTMLElement | Node, event: string, callback: any): void {
    // Remove existing EventListeners first.
    if (typeof (item.removeEventListener) === 'function') {
        item.removeEventListener(event, callback);
    }
    item.addEventListener(event, callback);
}