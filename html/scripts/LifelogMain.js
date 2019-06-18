const URLstring = "http://localhost:8080/LifeloggingActivityLogV3/api/";


function setUpPage() {

    var images = ['T0010081.jpg', 'T0010086.JPG', 'T0020021.JPG', 'T0020046.jpg', 'T0020101.jpg', 'T0020114.jpg', 'T0040145.jpg', 'T0040160.jpg', 'T0040166.jpg', 'T0040174.jpg', 'T0040189.jpg', 'T0040215.jpg', 'T0040226.jpg', 'T0070114.jpg', 'T0070127.jpg', 'T0070132.jpg', 'T0070153.jpg', 'T0070171.jpg', 'T0070201.jpg', 'T0070234.jpg', 'T0070339.jpg'];
    var dir = '../images/';
    var randomCount = Math.round(Math.random() * (images.length - 1)) + 1;
    document.getElementById("imageBanner").style.backgroundImage = "url(" + dir + images[randomCount] + ")";
    //    document.getElementById("imageBanner").innerHTML = "url(" + dir + images[randomCount] + ")";

}

function logIn() {
    document.getElementById("loginText").style.display = "none";
    let userName = document.getElementById("usernameText").value;
    let userPassword = document.getElementById("pwd").value;
    showUser(userName, userPassword);

}

function showUser(userName, userPassword) {
    makeRequest("GET", URLstring + "users/fetchUser/" + userName, "").then((resolve) => {
            document.getElementById('welcomeText').style.display = 'block';
            var newobj1 = JSON.parse(resolve);
            console.log(newobj1);
            document.getElementById("userWelecome").innerHTML = "Hi " + newobj1["userName"];
            localStorage.setItem("userEmail", newobj1["userEmail"]);
            recentActivities(newobj1["userEmail"]);

        }

    )
}

function recentActivities(userEmail) {
    makeRequest("GET", URLstring + "activities/getAllActivities/" + userEmail, "").then((resolve) => {
        var newobj1 = JSON.parse(resolve);
        console.log(newobj1);

        for (var i = 0; i < newobj1.length; i++) {
            let nodeDiv = document.createElement("DIV");
            nodeDiv.className = "container activitylisting"
            let row1 = document.createElement("DIV");
            row1.className = "row";
            let col1a = document.createElement("DIV");
            col1a.className = "col-xs-8";

            //Route Name
            let titleh2 = document.createElement("h2");
            let titleh2Input = document.createElement("input");
            if (newobj1[i]["officialRouteName"] != null) {
                titleh2.innerHTML = newobj1[i]["officialRouteName"];
                titleh2Input.value = newobj1[i]["officialRouteName"];
            }
            titleh2Input.type = "text";
            titleh2Input.className = "form-control";
            titleh2Input.placeholder = "Route Name";
            titleh2Input.style.display = "none";


            let col2a = document.createElement("DIV");
            col2a.className = "col-xs-4";
            col2a.style.paddingTop = '20px';

            //Dates
            let dateh4 = document.createElement("h4");
            let dateh4Input = document.createElement("input");
            dateh4Input.style.display = "none";
            dateh4Input.type = "date";
            dateh4Input.className = "form-control";
            dateh4Input.placeholder = "Start Date";
            let dateh4Input2 = document.createElement("input");
            dateh4Input2.style.display = "none";
            dateh4Input2.type = "date";
            dateh4Input2.className = "form-control";
            dateh4Input2.placeholder = "End Date";


            dateh4.innerHTML = "";
            if (newobj1[i]["startDate"] != null) {
                dateh4.innerHTML += 'Start: ' + newobj1[i]["startDate"] + '  ';
                dateh4Input.value = newobj1[i]["startDate"];
            }
            if (newobj1[i]["endDate"] != null) {
                dateh4.innerHTML += 'End ' + newobj1[i]["endDate"];
                dateh4Input2.value = newobj1[i]["endDate"];
            }
            if ((newobj1[i]["endDate"] == null) && (newobj1[i]["startDate"] == null)) {
                dateh4.innerHTML = " ";
            }
            dateh4.style.float = "right";


            col1a.appendChild(titleh2);
            col1a.appendChild(titleh2Input);
            row1.appendChild(col1a);
            col2a.appendChild(dateh4);
            col2a.appendChild(dateh4Input);
            col2a.appendChild(dateh4Input2);
            row1.appendChild(col2a);
            row1.style.backgroundColor = "gold";
            nodeDiv.appendChild(row1);


            let row3 = document.createElement("DIV");
            row3.className = "row";
            let col1c = document.createElement("DIV");
            col1c.className = "col-xs-8";
            //location
            let h6loc = document.createElement("h5");
            let h6locInput = document.createElement("input");
            h6locInput.style.display = "none";
            h6locInput.type = "text";
            h6locInput.className = "form-control";
            h6locInput.placeholder = "Location";
            if (newobj1[i]["location"] != null) {
                h6loc.innerHTML = newobj1[i]["location"];
                h6locInput.value = newobj1[i]["location"];
            } else {
                h6loc.innerHTML = " ";
            }
            let col2c = document.createElement("DIV");
            col2c.className = "col-xs-4";
            //distance
            let h6miles = document.createElement("h5");
            let h6milesInput = document.createElement("input");
            h6milesInput.style.display = "none";
            h6milesInput.type = "number";
            h6milesInput.className = "form-control";
            h6milesInput.placeholder = "distance";
            if (newobj1[i]["lengthMiles"] != null) {
                h6miles.innerHTML = newobj1[i]["lengthMiles"] + ' miles';
                h6milesInput.value = newobj1[i]["lengthMiles"];
            } else {
                h6miles.innerHTML = " ";
            }
            h6miles.style.float = "right";
            col1c.appendChild(h6loc);
            col1c.appendChild(h6locInput);
            row3.appendChild(col1c);
            col2c.appendChild(h6miles);
            col2c.appendChild(h6milesInput);
            row3.appendChild(col2c);
            nodeDiv.appendChild(row3);


            let row2 = document.createElement("DIV");
            row2.className = "row";
            let col1b = document.createElement("DIV");
            col1b.className = "col-xs-10";
            //description
            let pdesc = document.createElement("p");
            let pdescInput = document.createElement("input");
            pdescInput.style.display = "none";
            pdescInput.type = "text";
            pdescInput.className = "form-control";
            pdescInput.placeholder = "description";
            if (newobj1[i]["description"] != null) {
                pdesc.innerHTML = newobj1[i]["description"];
                pdescInput.value = newobj1[i]["description"];
            } else {
                pdesc.innerHTML = "no description entered";
            }
            pdesc.style.wordWrap = "break-word";
            pdesc.style.maxWidth = "40vw";
            pdesc.style.fontSize = "75%";

            let col2b = document.createElement("DIV");
            col2b.className = "col-xs-2";
            let btnDel = document.createElement('input');
            btnDel.className = "btn btn-danger btn-sm";
            btnDel.type = "button";
            btnDel.value = "Delete";
            btnDel.style.float = "right";
            btnDel.style.margin = "auto";

            let id = newobj1[i]["id"];
            btnDel.onclick = (function () {
                return function () {
                    deleteActivity();
                }
            })(newobj1[i]["id"]);


            col1b.appendChild(pdesc);
            col1b.appendChild(pdescInput);
            row2.appendChild(col1b);
            col2b.appendChild(btnDel);
            row2.appendChild(col2b);
            nodeDiv.appendChild(row2);

            let row4 = document.createElement("DIV");
            row4.className = "row";
            let col1d = document.createElement("DIV");
            col1d.className = "col-xs-10";
            //file directory
            let fdir = document.createElement("h6");
            let fdirInput = document.createElement("input");
            fdirInput.style.display = "none";
            fdirInput.type = "text";
            fdirInput.className = "form-control";
            fdirInput.placeholder = "lifelog file directory";
            if (newobj1[i]["lifelogDirectory"] != null) {
                fdir.innerHTML = "Lifelog: " + newobj1[i]["lifelogDirectory"];
                fdirInput.value = newobj1[i]["lifelogDirectory"];
            } else {
                fdir.innerHTML = "no lifelog entered";
            }
            let col2d = document.createElement("DIV");
            col2d.className = "col-xs-2";
            let btn = document.createElement('input');
            btn.className = "btn btn-success";
            btn.type = "button";
            btn.value = "Edit";
            btn.style.float = "right";
            let btnUpdate = document.createElement('input');
            btnUpdate.style.display = "none";
            btnUpdate.className = "btn btn-primary";
            btnUpdate.type = "button";
            btnUpdate.value = "Submit";
            btnUpdate.style.float = "right";
            btn.onclick = (function () {
                return function () {
                    titleh2.style.display = "none";
                    titleh2Input.style.display = "block";

                    dateh4.style.display = "none";
                    dateh4Input.style.display = "block";
                    dateh4Input2.style.display = "block";

                    h6locInput.style.display = "block";
                    h6loc.style.display = "none";

                    h6milesInput.style.display = "block";
                    h6miles.style.display = "none";

                    pdescInput.style.display = "block";
                    pdesc.style.display = "none";

                    fdirInput.style.display = "block";
                    fdir.style.display = "none";

                    btnUpdate.style.display = "block";
                    btn.style.display = "none";
                }
            })(newobj1[i]["id"]);


            btnUpdate.onclick = (function () {
                return function () {
                    titleh2.style.display = "block";
                    titleh2Input.style.display = "none";

                    dateh4.style.display = "block";
                    dateh4Input.style.display = "none";
                    dateh4Input2.style.display = "none";

                    h6locInput.style.display = "none";
                    h6loc.style.display = "block";

                    h6milesInput.style.display = "none";
                    h6miles.style.display = "block";

                    pdescInput.style.display = "none";
                    pdesc.style.display = "block";

                    fdirInput.style.display = "none";
                    fdir.style.display = "block";

                    btnUpdate.style.display = "none";
                    btn.style.display = "block";

                    updateActivity();
                }
            })(newobj1[i]["id"]);

            col1d.appendChild(fdir);
            col1d.appendChild(fdirInput);
            row4.appendChild(col1d);
            col2d.appendChild(btn);
            col2d.appendChild(btnUpdate);
            row4.appendChild(col2d);
            row4.style.paddingBottom = "10px";
            nodeDiv.appendChild(row4);

            document.getElementById("recentactivityList").appendChild(nodeDiv);
        }
    })
}

function updateActivity() {

}

function deleteActivity() {

}

function makeRequest(method, url, body) {
    return new Promise(
        (resolve, reject) => {
            const req = new XMLHttpRequest();
            if ("withCredentials" in req) {
                // Check if the XMLHttpRequest object has a "withCredentials" property.
                // "withCredentials" only exists on XMLHTTPRequest2 objects.
                req.open(method, url, true);
                req.setRequestHeader('Content-Type', 'application/json');
                req.send(body);
            } else if (typeof XDomainRequest != "undefined") {
                // Otherwise, check if XDomainRequest.
                // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                req = new XDomainRequest();
                req.open(method, url);
                req.setRequestHeader('Content-Type', 'application/json');
                req.send(body);
            } else {
                // Otherwise, CORS is not supported by the browser.
                throw new Error('CORS not supported');
                req = null;
            }

            req.onload = () => {
                if (req.status >= 200 && req.status <= 299) {
                    resolve(req.responseText);
                } else {
                    console.log(req.responseText)
                    const reason = new Error("Rejected");
                    reject(reason);
                }
            }

        });

}


function recentHikingActivities(userEmail) {
    makeRequest("GET", URLstring + "activities/getActivitiesByCategory/" + userEmail + "/Hiking", "").then((resolve) => {
        var newobj1 = JSON.parse(resolve);
        console.log(newobj1);

        for (var i = 0; i < newobj1.length; i++) {
            let nodeDiv = document.createElement("DIV");
            nodeDiv.className = "container activitylisting"
            let row1 = document.createElement("DIV");
            row1.className = "row";
            let col1a = document.createElement("DIV");
            col1a.className = "col-xs-8";

            //Route Name
            let titleh2 = document.createElement("h2");
            let titleh2Input = document.createElement("input");
            if (newobj1[i]["officialRouteName"] != null) {
                titleh2.innerHTML = newobj1[i]["officialRouteName"];
                titleh2Input.value = newobj1[i]["officialRouteName"];
            }
            titleh2Input.type = "text";
            titleh2Input.className = "form-control";
            titleh2Input.placeholder = "Route Name";
            titleh2Input.style.display = "none";


            let col2a = document.createElement("DIV");
            col2a.className = "col-xs-4";
            col2a.style.paddingTop = '20px';

            //Dates
            let dateh4 = document.createElement("h4");
            let dateh4Input = document.createElement("input");
            dateh4Input.style.display = "none";
            dateh4Input.type = "date";
            dateh4Input.className = "form-control";
            dateh4Input.placeholder = "Start Date";
            let dateh4Input2 = document.createElement("input");
            dateh4Input2.style.display = "none";
            dateh4Input2.type = "date";
            dateh4Input2.className = "form-control";
            dateh4Input2.placeholder = "End Date";


            dateh4.innerHTML = "";
            if (newobj1[i]["startDate"] != null) {
                dateh4.innerHTML += 'Start: ' + newobj1[i]["startDate"] + '  ';
                dateh4Input.value = newobj1[i]["startDate"];
            }
            if (newobj1[i]["endDate"] != null) {
                dateh4.innerHTML += 'End ' + newobj1[i]["endDate"];
                dateh4Input2.value = newobj1[i]["endDate"];
            }
            if ((newobj1[i]["endDate"] == null) && (newobj1[i]["startDate"] == null)) {
                dateh4.innerHTML = " ";
            }
            dateh4.style.float = "right";


            col1a.appendChild(titleh2);
            col1a.appendChild(titleh2Input);
            row1.appendChild(col1a);
            col2a.appendChild(dateh4);
            col2a.appendChild(dateh4Input);
            col2a.appendChild(dateh4Input2);
            row1.appendChild(col2a);
            row1.style.backgroundColor = "gold";
            nodeDiv.appendChild(row1);


            let row3 = document.createElement("DIV");
            row3.className = "row";
            let col1c = document.createElement("DIV");
            col1c.className = "col-xs-8";
            //location
            let h6loc = document.createElement("h5");
            let h6locInput = document.createElement("input");
            h6locInput.style.display = "none";
            h6locInput.type = "text";
            h6locInput.className = "form-control";
            h6locInput.placeholder = "Location";
            if (newobj1[i]["location"] != null) {
                h6loc.innerHTML = newobj1[i]["location"];
                h6locInput.value = newobj1[i]["location"];
            } else {
                h6loc.innerHTML = " ";
            }
            let col2c = document.createElement("DIV");
            col2c.className = "col-xs-4";
            //distance
            let h6miles = document.createElement("h5");
            let h6milesInput = document.createElement("input");
            h6milesInput.style.display = "none";
            h6milesInput.type = "number";
            h6milesInput.className = "form-control";
            h6milesInput.placeholder = "distance";
            if (newobj1[i]["lengthMiles"] != null) {
                h6miles.innerHTML = newobj1[i]["lengthMiles"] + ' miles';
                h6milesInput.value = newobj1[i]["lengthMiles"];
            } else {
                h6miles.innerHTML = " ";
            }
            h6miles.style.float = "right";
            col1c.appendChild(h6loc);
            col1c.appendChild(h6locInput);
            row3.appendChild(col1c);
            col2c.appendChild(h6miles);
            col2c.appendChild(h6milesInput);
            row3.appendChild(col2c);
            nodeDiv.appendChild(row3);


            let row2 = document.createElement("DIV");
            row2.className = "row";
            let col1b = document.createElement("DIV");
            col1b.className = "col-xs-10";
            //description
            let pdesc = document.createElement("p");
            let pdescInput = document.createElement("input");
            pdescInput.style.display = "none";
            pdescInput.type = "text";
            pdescInput.className = "form-control";
            pdescInput.placeholder = "description";
            if (newobj1[i]["description"] != null) {
                pdesc.innerHTML = newobj1[i]["description"];
                pdescInput.value = newobj1[i]["description"];
            } else {
                pdesc.innerHTML = "no description entered";
            }
            pdesc.style.wordWrap = "break-word";
            pdesc.style.maxWidth = "40vw";
            pdesc.style.fontSize = "75%";

            let col2b = document.createElement("DIV");
            col2b.className = "col-xs-2";
            let btnDel = document.createElement('input');
            btnDel.className = "btn btn-danger btn-sm";
            btnDel.type = "button";
            btnDel.value = "Delete";
            btnDel.style.float = "right";
            btnDel.style.margin = "auto";

            let id = newobj1[i]["id"];
            btnDel.onclick = (function () {
                return function () {
                    deleteActivity();
                }
            })(newobj1[i]["id"]);


            col1b.appendChild(pdesc);
            col1b.appendChild(pdescInput);
            row2.appendChild(col1b);
            col2b.appendChild(btnDel);
            row2.appendChild(col2b);
            nodeDiv.appendChild(row2);

            let row4 = document.createElement("DIV");
            row4.className = "row";
            let col1d = document.createElement("DIV");
            col1d.className = "col-xs-10";
            //file directory
            let fdir = document.createElement("h6");
            let fdirInput = document.createElement("input");
            fdirInput.style.display = "none";
            fdirInput.type = "text";
            fdirInput.className = "form-control";
            fdirInput.placeholder = "lifelog file directory";
            if (newobj1[i]["lifelogDirectory"] != null) {
                fdir.innerHTML = "Lifelog: " + newobj1[i]["lifelogDirectory"];
                fdirInput.value = newobj1[i]["lifelogDirectory"];
            } else {
                fdir.innerHTML = "no lifelog entered";
            }
            let col2d = document.createElement("DIV");
            col2d.className = "col-xs-2";
            let btn = document.createElement('input');
            btn.className = "btn btn-success";
            btn.type = "button";
            btn.value = "Edit";
            btn.style.float = "right";
            let btnUpdate = document.createElement('input');
            btnUpdate.style.display = "none";
            btnUpdate.className = "btn btn-primary";
            btnUpdate.type = "button";
            btnUpdate.value = "Submit";
            btnUpdate.style.float = "right";
            btn.onclick = (function () {
                return function () {
                    titleh2.style.display = "none";
                    titleh2Input.style.display = "block";

                    dateh4.style.display = "none";
                    dateh4Input.style.display = "block";
                    dateh4Input2.style.display = "block";

                    h6locInput.style.display = "block";
                    h6loc.style.display = "none";

                    h6milesInput.style.display = "block";
                    h6miles.style.display = "none";

                    pdescInput.style.display = "block";
                    pdesc.style.display = "none";

                    fdirInput.style.display = "block";
                    fdir.style.display = "none";

                    btnUpdate.style.display = "block";
                    btn.style.display = "none";
                }
            })(newobj1[i]["id"]);


            btnUpdate.onclick = (function () {
                return function () {
                    titleh2.style.display = "block";
                    titleh2Input.style.display = "none";

                    dateh4.style.display = "block";
                    dateh4Input.style.display = "none";
                    dateh4Input2.style.display = "none";

                    h6locInput.style.display = "none";
                    h6loc.style.display = "block";

                    h6milesInput.style.display = "none";
                    h6miles.style.display = "block";

                    pdescInput.style.display = "none";
                    pdesc.style.display = "block";

                    fdirInput.style.display = "none";
                    fdir.style.display = "block";

                    btnUpdate.style.display = "none";
                    btn.style.display = "block";

                    updateActivity();
                }
            })(newobj1[i]["id"]);

            col1d.appendChild(fdir);
            col1d.appendChild(fdirInput);
            row4.appendChild(col1d);
            col2d.appendChild(btn);
            col2d.appendChild(btnUpdate);
            row4.appendChild(col2d);
            row4.style.paddingBottom = "10px";
            nodeDiv.appendChild(row4);

            document.getElementById("recentactivityList").appendChild(nodeDiv);
        }
    })
}
