
//---------------------------------------------------DASHBOARD SCRIPT---------------------------------------------

var avgWater;
var avgStress;
var avgSleep;
var avgScreen;

//-----------------------------------CHARTS

// Fetch data from the server
fetch('/data')
    .then(response => response.json())
    .then(data => {

        data7 = data.slice(-7);

        const dates = data7.map(entry => entry.rDate);
        const sleepValues = data7.map(entry => entry.sleep);
        const screenValues = data7.map(entry => entry.screen);
        const moodValues = data7.map(entry => entry.mood);
        const stressValues = data7.map(entry => entry.stress);
        const waterValues = data7.map(entry => entry.water);
        const journalValues = data.map(entry => entry.journal);

        //-------------------------------SLEEP

        var options1 = {
            chart: {
                height: 200,
                width: 350,
                type: "area",
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            series: [
                {
                    name: "Series 1",
                    /*data: [5, 8, 7, 4, 3, 7, 6]*/
                    data: sleepValues
                }
            ],
            colors: ['#ff61f2'],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 0.7,
                    shade: 'dark',
                    opacityFrom: 0.8,
                    opacityTo: 0.8,
                    stops: [0, 90, 100],
                    gradientToColors: ['#6961ff']
                }
            },
            xaxis: {
                /*categories: [
                    "1 Jun",
                    "2 Jun",
                    "3 Jun",
                    "4 Jun",
                    "5 Jun",
                    "6 Jun",
                    "7 Jun"
                ],*/
                categories: dates,
                labels: {
                    style: {
                        colors: '#dcdcde',
                        fontFamily: 'Poppins'
                    }
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: true,
                    height: 3
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#dcdcde',
                        fontFamily: 'Poppins'
                    }
                }
            },
            stroke: {
                width: 0
            },
            grid: {
                show: false
            },
            subtitle: {
                text: undefined,
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: true,
                style: {
                    fontSize: '12px',
                    fontWeight: 'normal',
                    fontFamily: undefined,
                    color: '#fff'
                },
            },
            markers: {
                size: 5,
                colors: ["#ff85f5"],
                strokeWidth: 0
            }
        };

        var chart = new ApexCharts(document.querySelector("#sleep-graph"), options1);
        chart.render();

        //-------------------------------SCREEN

        var options2 = {
            series: [{
                data: screenValues
            }],
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false
                }
            },
            colors: ['#ff0000'],
            fill: {
                type: "gradient",
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 0.7,
                    shade: 'dark',
                    opacityFrom: 0.9,
                    opacityTo: 0.9,
                    stops: [0, 90, 100],
                    gradientToColors: ['#ffd000']
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: dates,
                labels: {
                    rotate: -45,
                    rotateAlways: true,
                    style: {
                        colors: '#dcdcde',
                        fontFamily: 'Poppins',
                        fontSize: 10
                    }
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#dcdcde',
                        fontFamily: 'Poppins',
                    }
                }
            },
            grid: {
                show: true,
                borderColor: '#a3a3a3',
                strokeDashArray: 0,
                position: 'back',
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 3,
                    columnWidth: '50%'
                }
            }
        };

        var chart = new ApexCharts(document.querySelector("#screen-graph"), options2);
        chart.render();

        //-------------------------------MOOD

        var options3 = {
            chart: {
                height: 225,
                type: "line",
                stacked: false,
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#42ffc3", "#b570ff"],
            series: [
                {
                    name: "Mood",
                    data: moodValues
                },
                {
                    name: "Stress level",
                    data: stressValues
                }
            ],
            stroke: {
                width: [2, 2]
            },
            plotOptions: {
                bar: {
                    columnWidth: "20%"
                }
            },
            xaxis: {
                categories: dates,
                labels: {
                    rotate: -45,
                    rotateAlways: true,
                    style: {
                        colors: '#dcdcde',
                        fontFamily: 'Poppins',
                        fontSize: 10
                    }
                }
            },
            yaxis: [
                {
                    min: 1,
                    max: 5,
                    forceNiceScale: true,
                    axisTicks: {
                        show: false
                    },
                    axisBorder: {
                        show: true,
                        color: "#42ffc3"
                    },
                    labels: {
                        style: {
                            colors: "#42ffc3",
                            fontFamily: 'Poppins'
                        }
                    },
                    title: {
                        text: "Mood",
                        style: {
                            color: "#42ffc3"
                        }
                    }
                },
                {
                    tickAmount: 5,
                    min: 1,
                    max: 10,
                    forceNiceScale: true,
                    opposite: true,
                    axisTicks: {
                        show: false
                    },
                    axisBorder: {
                        show: true,
                        color: "#b570ff"
                    },
                    labels: {
                        style: {
                            colors: "#b570ff",
                            fontFamily: 'Poppins'
                        }
                    },
                    title: {
                        text: "Stress level",
                        style: {
                            color: "#b570ff"
                        }
                    }
                }
            ],
            tooltip: {
                shared: false,
                intersect: true,
                x: {
                    show: false
                }
            },
            legend: {
                horizontalAlign: "left",
                offsetX: 40
            }
            , grid: {
                show: false
            }
        };

        var chart = new ApexCharts(document.querySelector("#mood-graph"), options3);
        chart.render();

        //-------------------------------WATER

        var sum = 0;
        for (var i = 0; i < 7; i++) {
            sum += waterValues[i];
        }
        avgWater = Math.floor(sum / 7);

        document.getElementById("no").innerHTML = avgWater;
        document.getElementById("water-img").innerHTML = "<img src=\"Images/" + avgWater + ".png\" alt=\"water-glass-" + avgWater + "\" />";

        //-------------------------------JOURNAL


        var elems = [document.getElementById("jh3"), document.getElementById("jm3"), document.getElementById("jh2"), document.getElementById("jm2"), document.getElementById("jh1"), document.getElementById("jm1")];

        for (var i = data.length-1; i >= 0; i--) {
            if (data[i].journal != "") {
                try {
                    elems[0].innerHTML = data[i].rDate;
                    elems[1].innerHTML = data[i].journal;
                    elems.shift();
                    elems.shift();
                }
                catch {
                    break;
                }
            }
        }

        //-------------------------------FEEDB

        sum = 0;
        for (var i = 4; i <= 6; i++) {
            sum += stressValues[i];
        }
        avgStress = sum / 3;

        sum = 0;
        for (var i = 4; i <= 6; i++) {
            sum += sleepValues[i];
        }
        avgSleep = sum / 3;

        sum = 0;
        for (var i = 4; i <= 6; i++) {
            sum += screenValues[i];
        }
        avgScreen = sum / 3;

        getTextAJAX();

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });



//-----------------------------QUOTES JSON----------------------------------

var quotes;
var feedbs;
var quote;
var feedb;

function getTextAJAX() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            processResult(xhttp);
        }
    }
    xhttp.open("GET", "AllevareJson.json", true);
    xhttp.send();
}

function processResult(xhttp) {
    var jsonText = xhttp.responseText;
    quotes = JSON.parse(jsonText).QuotesList;
    feedbs = JSON.parse(jsonText).FeedbackList;

    quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quote").innerHTML = quote;

    feedb = getFeedb(feedbs);
    document.getElementById("feedb").innerHTML = feedb;
}

function getFeedb(feedbs) {

    if (avgStress > 7) {
        feedb = feedbs.stress[Math.floor(Math.random() * feedbs.stress.length)];
    }
    else if (avgSleep < 5) {
        feedb = feedbs.sleep;
    }
    else if (avgWater < 5) {
        feedb = feedbs.water;
    }
    else if (avgScreen > 8) {
        feedb = feedbs.screen;
    }
    else {
        feedb = feedbs.stress[Math.floor(Math.random() * feedbs.stress.length)];
    }
    return feedb;
}




//----------------------HEADER HIDING THING  /  BOTTOM ADD BUTTON------------------ EDIT TO MAKE IT SUITABLE FOR NODE.JS ENV


window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;

    if (currentScrollPos<=100) {
        document.querySelector("header").classList.remove("hidden");
    } else {
        document.querySelector("header").classList.add("hidden");
    }


    if (currentScrollPos <= 400) {
        document.querySelector(".add-bottom-btn").classList.remove("Bshow");
    } else {
        document.querySelector(".add-bottom-btn").classList.add("Bshow");
    }
}

