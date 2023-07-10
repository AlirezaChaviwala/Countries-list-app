let container = document.createElement('div');
container.setAttribute('class', 'container bg-light p-3')
document.body.append(container);

let title = document.createElement('h1');
title.id = 'title';
title.innerText = 'Rest Countries with Promise and XMLHttp Request';
container.append(title);


let promise = new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.open('GET', 'https://restcountries.com/v3.1/all', true);
        req.send();
        req.onload = function() {
            if (req.status == 200) {
                resolve(req.response);
            } else {
                reject({
                    message: req.statusText,
                });
            }
            req.onerror = function() {
                reject({
                    message: req.statusText,
                });
            };
        };

    })
    .then((result) => {
        return JSON.parse(result);
    })
    .then((result) => {

        for (var i = 0; i < result.length; i += 4) {

            let cardgroup = document.createElement('div');
            cardgroup.setAttribute('class', 'card-group m-3')
            container.append(cardgroup);

            for (var j = i; j < i + 4; j++) {
                let card = document.createElement('div');
                card.setAttribute('class', 'card ml-2 mr-2');
                card.setAttribute('style', 'width: 18rem');

                let cardheader = document.createElement('div');
                cardheader.classList.add('card-header');
                cardheader.setAttribute('id', 'ch')
                cardheader.innerText = result[j].name.common;

                let fimage = document.createElement('img');
                fimage.classList.add('card-img-top');
                fimage.setAttribute('id', 'im')
                fimage.src = result[j].flags.png;

                let cardbody = document.createElement('div');
                cardbody.classList.add('card-body');

                let capname = document.createElement('div');
                capname.setAttribute('class', 'card-text');
                capname.textContent = 'Capital: '
                let cap = document.createElement('div');
                cap.setAttribute('class', 'badge badge-success text-wrap');
                cap.textContent = `${result[j].capital}`;
                capname.append(cap);

                let countrycode = document.createElement('div');
                countrycode.setAttribute('class', 'card-text')
                countrycode.textContent = 'Country Codes: ';
                let code = document.createElement('div');
                code.setAttribute('class', 'badge');
                code.innerText = `${result[j].cca2},${result[j].cca3}`;
                countrycode.append(code);


                let regtag = document.createElement('div');
                regtag.setAttribute('class', 'card-text');
                regtag.textContent = 'Region: ';
                let reg = document.createElement('div');
                reg.setAttribute('class', 'badge');
                reg.innerText = result[j].region;
                regtag.append(reg);


                let lltag = document.createElement('div');
                lltag.setAttribute('class', 'card-text');
                lltag.textContent = 'Lat,Long: ';
                let latlng = document.createElement('div');
                latlng.setAttribute('class', 'badge');
                latlng.innerText = `${result[j].latlng[0]},${result[j].latlng[1]}`;
                lltag.append(latlng);


                cardgroup.append(card);
                card.append(cardheader, fimage, cardbody);
                cardbody.append(capname, countrycode, regtag, lltag);

            }
        }


    })
    .catch((err) => {
        console.log(err);
    })
