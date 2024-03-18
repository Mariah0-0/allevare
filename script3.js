
//-------------------------------------------------------ENTRY PAGE SCRIPT------------------------------------




//----------------------HEADER HIDING THING ------------------


window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;

    if (currentScrollPos <= 50) {
        document.querySelector("header").classList.remove("hidden");
    } else {
        document.querySelector("header").classList.add("hidden");
    }
}

///////////////////////////////////////////////////////

var sleepObj;

function getSleepAJAX() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            processResult(xhttp);
        }
    };
    xhttp.open("GET", "AllevareJson.json", true);
    xhttp.send();
}

function processResult(xhttp) {
    var jsonText = xhttp.responseText;
    sleepObj = JSON.parse(jsonText).SleepList;
    displaySleepRangeDropDownMenu();
}

function displaySleepRangeDropDownMenu() {
    var i;
    var text = "Select Sleep Range: <br/><br/><select name=\"sleep\" required>";
    for (i = 0; i < sleepObj.length; i++) {
        text += "<option value=\"" + sleepObj[i].id + "\">" + sleepObj[i].range + "</option>";
    }
    text += "</select>";
    document.getElementById("sleepDropdown").innerHTML = text;
}

getSleepAJAX();






///////////////////////////////////////////////////////////////

const slider = document.getElementById('slider');
const valueDisplay = document.getElementById('valueDisplay');

slider.addEventListener('input', function() {
  const sliderValue = parseInt(slider.value);
  valueDisplay.textContent = "You drank " + sliderValue + " cups of water today."+" ❤";

});

////////////////////////////////////////////////////////

const waterImage = document.getElementById('waterImage');
const valueOfWater = document.getElementById('ValueofWater');
const screenTime = document.getElementById('screenTime');
const saveButton = document.getElementById('saveButton');

const waterImageArray = [
    { filename: 'Images/0.png', value: 0 },
    { filename: 'Images/1.png', value: 1 },
    { filename: 'Images/2.png', value: 2 },
    { filename: 'Images/3.png', value: 3 },
    { filename: 'Images/4.png', value: 4 },
    { filename: 'Images/5.png', value: 5 },
    { filename: 'Images/6.png', value: 6 },
    { filename: 'Images/7.png', value: 7 },
    { filename: 'Images/8.png', value: 8 },
    { filename: 'Images/9.png', value: 9 },
    { filename: 'Images/10.png', value: 10 },
    { filename: 'Images/11.png', value: 11 },
    { filename: 'Images/12.png', value: 12 },

];

let waterIndex = 0;

function updateWaterImage() {
    const currentWater = waterImageArray[waterIndex];
    waterImage.src = currentWater.filename;
    valueOfWater.textContent = currentWater.value + ' cups';
    document.getElementById("waterInput").value = currentWater.value;
}

function waterImageChange() {
    waterIndex = (waterIndex + 1) % waterImageArray.length;
    updateWaterImage();
}

waterImage.addEventListener('click', waterImageChange);

const ScreenButtons = document.querySelectorAll('.button-1', '.button-2', '.button-3', '.button-4', '.button-5', '.button-6', '.button-7', '.button-8', '.button-9', '.button-10');
ScreenButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const hours = button.textContent.trim();
        screenTime.value = hours;
        const SleepAle = "You've had " + hours + " of Screen time";
        alert(SleepAle);
    });
});

/////////////////////////////////////////////////////////////////////


function displaySleepAle(SleepAle) {
    document.getElementById("SleepAle").textContent = SleepAle;
}


var radioButtons = document.getElementsByName("image");
for (var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener("change", function () {
        if (!this.checked) {
            document.getElementById("SleepAle").textContent = "";
        }
    });
}

var proceed = true;

fetch('/entryPage')
    .then(response => response.json())
    .then(data => {
        document.getElementById('nav_username').innerHTML = data.u
        for (var i = 0; i < data.result.length; i++) {
            if (data.result[i].now == data.result[i].rDate) {
                proceed = false;
                document.getElementById("addEntryError").innerHTML = "You have already added a record today!";
            }
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });