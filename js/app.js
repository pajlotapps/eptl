// app.js
// PajlotApps
// 301800ZJUL2019

//var SunCalc = require('suncalc');

// Class declarations
class PTL {
  constructor(ptlInfo, ptlPersonnel, ptlAircrafts, ptlFlights) {
    this.ptlInfo = ptlInfo;
    this.personnel = ptlPersonnel;
    this.aircrafts = ptlAircrafts;
    this.flights = ptlFlights;
  }
}

// PTLInfo class: represents a initial PTL info
class PTLInfo {
  constructor(
    unit,
    variant,
    date,
    offset,
    ss,
    start,
    shiftLength,
    remarks,
    location,
    locationCords
  ) {
    this.unit = unit;
    this.variant = variant;
    this.date = date;
    this.offset = offset;
    this.ss = ss;
    this.start = start;
    this.shiftLength = shiftLength;
    this.remarks = remarks;
    this.location = location;
    this.locationCords = locationCords;
  }
}

// Person class: represents a crew member
class Person {
  constructor(id, aircraftType, surname, role, callsign, WM) {
    this.id = id;
    this.aircraftType = aircraftType;
    this.surname = surname;
    this.role = role;
    this.callsign = callsign;
    this.WM = WM;
  }
}

// Aircraft class: represents a aircraft
class Aircraft {
  constructor(type, reg, color, rmk) {
    this.type = type;
    this.reg = reg;
    this.color = color;
    this.rmk = rmk;
  }
}

class CrewMember {
  constructor(person, functionOnDeck, task) {
    this.person = person;
    this.functionOnDeck = functionOnDeck;
    this.task = task;
  }
}

// Flight class: represents a flight
// class FlightOldOld {
//     constructor(commander, commanderTask, coPilot, coPilotTask, flyingEngineer, flyingEngineerTask, gunner, gunnerTask, medic, medicTask, startTime, length, breakAfter, quantity, aircraftType, aircraftReg, aircraftColor, aircraftIndex) {
//         this.commander = commander;
//         this.commanderTask = commanderTask;
//         this.coPilot = coPilot;
//         this.coPilotTask = coPilotTask;
//         this.flyingEngineer = flyingEngineer;
//         this.flyingEngineerTask = flyingEngineerTask;
//         this.gunner = gunner;
//         this.gunnerTask = gunnerTask;
//         this.medic = medic;
//         this.medicTask = medicTask;
//         this.quantity = quantity;
//         this.startTime = startTime;
//         this.length = length;
//         this.breakAfter = breakAfter;
//         this.aircraftType = aircraftType;
//         this.aircraftReg = aircraftReg;
//         this.aircraftColor = aircraftColor;
//         this.aircraftIndex = aircraftIndex;
//     }
// }

// Crew class: represents a crew
class Crew {
  constructor(
    leftSeat,
    rightSeat,
    engineerSeat,
    seat1,
    seat2,
    seat3,
    seat4,
    seat5,
    seat6,
    seat7,
    seat8,
    seat9,
    seat10
  ) {
    this.leftSeat = leftSeat;
    this.rightSeat = rightSeat;
    this.engineerSeat = engineerSeat;
    this.seat1 = seat1;
    this.seat2 = seat2;
    this.seat3 = seat3;
    this.seat4 = seat4;
    this.seat5 = seat5;
    this.seat6 = seat6;
    this.seat7 = seat7;
    this.seat8 = seat8;
    this.seat9 = seat9;
    this.seat10 = seat10;
  }
}

// class FlightOld {
//     constructor(commander, coPilot, engineer, startTime, length, quantity, aircraftType, aircraftReg, aircraftColor, aircraftIndex) {
//         this.commander = commander;
//         this.coPilot = coPilot;
//         this.engineer = engineer;
//         this.quantity = quantity;
//         this.startTime = startTime;
//         this.length = length;
//         this.aircraftType = aircraftType;
//         this.aircraftReg = aircraftReg;
//         this.aircraftColor = aircraftColor;
//         this.aircraftIndex = aircraftIndex;
//     }
// }

class Flight {
  constructor(
    crew,
    taskIcon,
    startTime,
    length,
    quantity,
    aircraftType,
    aircraftReg,
    aircraftColor,
    aircraftIndex
  ) {
    this.crew = crew;
    this.taskIcon = taskIcon;
    this.quantity = quantity;
    this.startTime = startTime;
    this.length = length;
    this.aircraftType = aircraftType;
    this.aircraftReg = aircraftReg;
    this.aircraftColor = aircraftColor;
    this.aircraftIndex = aircraftIndex;
  }
}

// VARIABLES
var personnelCounter = 0;
var pilotsCounter = 0;
var engineersCounter = 0;
var othersCounter = 0;
var flightsCounter = 0;
var currentPerson = new Person();
var currentRowID = "";

var dateRegex = /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/;
var timeRegex = /([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/;
var coordRegex = new RegExp(
  "^[-+]?([1-8]?d(.d+)?|90(.0+)?),s*[-+]?(180(.0+)?|((1[0-7]d)|([1-9]?d))(.d+)?)$"
);

var latitudeRegex = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))/;
var longitudeRegex = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))/;

var today = new Date();

const pilotFunctionsOnDeck = [
  "wybierz",
  "D-ca SP",
  "Pilot szkolony",
  "Pilot szkolący",
  "Pilot monitorujący",
  "II pilot"
];

var ptlInfo = new PTLInfo();
var personnel = new Array();
var aircrafts = new Array();
var flights = new Array();

// UI Class: Handle UI Tasks
class UI {
  // UI.SetupView
  static setupView() {
    const storedPTLInfo = Store.getPTLInfo();
    ptlInfo = storedPTLInfo;
    if (ptlInfo.length === 0) {
      // Disable menu options
      document.querySelector("#exportPTLBtn").classList.add("disabled");
      document.querySelector("#editPTLBtn").classList.add("disabled");
      document.querySelector("#clearPTLBtn").classList.add("disabled");
      document.querySelector("#addMenuBtn").classList.add("disabled");
      document.querySelector("#removeMenuBtn").classList.add("disabled");
      document.querySelector("#generateMenuBtn").classList.add("disabled");

      UI.hidePTL();
    } else {
      UI.adjustAddFlightBtn();
      UI.updatePTL(ptlInfo);
    }
  }

  // UI.menu update
  static adjustAddFlightBtn() {
    // Enable addFlight menu options
    const storedAircrafts = Store.getAircrafts();
    const storedPersonnel = Store.getPersonnel();

    let addFlight = document.querySelector("#addFlightBtn");

    if (storedAircrafts.length === 0 || storedPersonnel.length === 0) {
      addFlight.classList.add("disabled");
    } else {
      addFlight.classList.remove("disabled");
    }
  }

  // UI.PTLInfo
  static updatePTL(obj) {
    // Enable menu options
    document.querySelector("#exportPTLBtn").classList.remove("disabled");
    document.querySelector("#editPTLBtn").classList.remove("disabled");
    document.querySelector("#clearPTLBtn").classList.remove("disabled");
    document.querySelector("#addMenuBtn").classList.remove("disabled");
    document.querySelector("#removeMenuBtn").classList.remove("disabled");
    document.querySelector("#generateMenuBtn").classList.remove("disabled");

    calculateSunAndMoon();

    // ptlHeader content load
    document.querySelector("#ptlVariant").innerHTML = `<h3>${obj.variant}</h3>`;
    document.querySelector("#ptlUnit").innerHTML = `<h3>${obj.unit}</h3>`;
    document.querySelector("#ptlDate").innerHTML = `<h3>${obj.date}</h3>`;

    var allHours = new Array();
    // time badges update
    for (var i = 1; i < 10; i++) {
      var hour = document
        .getElementById("ptlContent")
        .getElementsByClassName(`${i}_hour`);
      allHours.push(hour);
      // console.log("allHours", allHours);
    }

    allHours.forEach(hour => {
      // console.log("zawiera", hour.length)
      for (var i = 0; i < hour.length; i++) {
        hour[i].classList.add("hidden_element");
      }
    });

    var hour2show = Number(obj.shiftLength);
    var colSpan = 12 + hour2show * 6 - 2;
    var ptlTimeHeader = document.getElementById("ptlTimeHeader");
    ptlTimeHeader.setAttribute("colspan", colSpan);

    var allHoursToShow = new Array();
    for (var i = 1; i < hour2show + 1; i++) {
      var hour = document
        .getElementById("ptlContent")
        .getElementsByClassName(`${i}_hour`);
      allHoursToShow.push(hour);
    }
    // console.log("allHoursToShow", allHoursToShow);
    allHoursToShow.forEach(el => {
      // console.log("zawiera", el.length)
      for (var i = 0; i < el.length; i++) {
        el[i].classList.remove("hidden_element");
      }
    });

    UI.adjustAddFlightBtn();

    UI.updateBadges(obj.start, obj.offset);
    UI.removeAllPersons();
    UI.displayPersonnel();
    // FIXME: odswiezenie kafelkow z lotami po edycji danych ptlInfo
    // UI.removeAllFlights();
    // UI.displayFlights();

    UI.showPTL();
  }

  // TIME BADGES
  static updateBadges(tm, offset) {
    document.querySelector("#LMToffsetLbl").innerHTML = `UTC+${offset}`;
    document.querySelector("#LMToffsetLbl").className =
      "badge badge-pill badge-primary";

    const timeBadges = document.getElementById("time-badges").childNodes;
    let totalInMinutes = getMinutes(tm);
    // console.log(totalInMinutes, offset, timeBadges.length)
    var i = 0; // długość zmiany
    timeBadges.forEach(e => {
      var tdChild = e.firstChild;
      if (tdChild !== null) {
        let tmInMinutes = totalInMinutes - 120 - offset * 60 + 60 * i;
        if (tmInMinutes > 24 * 60) {
          tmInMinutes = tmInMinutes - 24 * 60;
          // console.log(`badger ${i} ${tmInMinutes}`)
        }
        var tm = formatTime(tmInMinutes);
        tdChild.innerHTML = `${tm}`;
        i++;
      }
    });
    // console.log(`ogółem: ${i-1} badgerów`)
  }

  // show PTL
  static showPTL() {
    document.querySelector("#welcomeInfo").classList.add("hidden_element");
    document.querySelector("#ptlHeader").classList.remove("hidden_element");
    document.querySelector("#ptlContent").classList.remove("hidden_element");
  }

  // hide PTL
  static hidePTL() {
    document.querySelector("#welcomeInfo").classList.remove("hidden_element");
    document.querySelector("#ptlHeader").classList.add("hidden_element");
    document.querySelector("#ptlContent").classList.add("hidden_element");
  }

  //UI.PERSON
  static displayPersonnel() {
    const storedPersonnel = Store.getPersonnel();
    personnel = storedPersonnel;

    personnelCounter = personnel.length;
    // console.log("osob", personnel.length)

    // var tbody = document.getElementById("personnel-list");
    var tbody = $("#ptlContent tbody");

    if (tbody.children().length == 0) {
      personnel.forEach(person => UI.addPersonToList(person));
    }
  }

  static updateRoleBadge(person) {
    var callsignTD = "";
    if (person.role === "engineer") {
      callsignTD = `
            <span class="sn-teal" title="Technik pokładowy">Technik</span>
            `;
    } else if (person.role === "navigator") {
      callsignTD = `
            <span class="sn-indigo" title="Nawigator pokładowy">Nawigator</span>
            `;
    } else if (person.role === "medic") {
      callsignTD = `
            <span class="sn-red" title="Ratownik medyczny">Medyk</span>
            `;
    } else if (person.role === "gunner") {
      callsignTD = `
            <span class="sn-cyan" title="Strzelec pokładowy">Strzelec</span>
            `;
    } else if (person.role === "passenger") {
      callsignTD = `
            <span class="sn-green" title="Pasażer">Pasażer</span>
            `;
    } else if (person.role === "other") {
      callsignTD = `
            <span class="sn-yellow" title="Inny">Inny</span>
            `;
    } else {
      callsignTD = person.callsign;
    }
    return callsignTD;
  }

  static addPersonToList(person) {
    const storedPTLInfo = Store.getPTLInfo();
    ptlInfo = storedPTLInfo;

    const list = document.querySelector("#personnel-list");

    const row = document.createElement("tr");
    const uniqueId =
      person.aircraftType + "_" + person.surname + "_" + person.role;

    row.setAttribute("id", uniqueId);

    let cols = ``;

    const bL = `<td class="border-l"></td>`;
    const bLR = `<td class="border-lr"></td>`;

    let col2render = 6 * (2 + Number(ptlInfo.shiftLength));
    for (var i = 1; i < col2render; i++) {
      if (i % 6 != 0) {
        cols += bL;
      } else {
        cols += bLR;
      }
    }
    row.innerHTML = `
            ${bL}
            <td class="acType border-l">${person.aircraftType}</td>
            <td class="surname border-l">${person.surname}</td>
            <td class="cs border-l">${UI.updateRoleBadge(person)}</td>
            <td id="${
              person.surname
            }_timeline" colspan="${col2render}" class="s-row">
            
            </td>
            ${bLR}
            <td id="totalTime"></td>
            <td class="mwm border-l">${person.WM}</td>
            <td class="editTD"><svg class="icon-edit"></svg></td>

            <td class="deleteTD"><svg class="icon-delete"></svg></td>
            `;

    list.appendChild(row);

    if (person.role === "pilot") {
      pilotsCounter += 1;
      document.querySelector("#pilotsCounter").innerHTML = `${pilotsCounter}`;
    } else if (person.role === "engineer") {
      engineersCounter += 1;
      document.querySelector(
        "#engineersCounter"
      ).innerHTML = `${engineersCounter}`;
    } else {
      othersCounter += 1;
      document.querySelector("#othersCounter").innerHTML = `${othersCounter}`;
    }

    let total = pilotsCounter + engineersCounter + othersCounter;
    document.querySelector("#totalPersonCounter").innerHTML = `${total}`;

    if (total !== 0) {
      document.querySelector("#info-table").className = "ac-table-wrapper";
    }
  }

  static updatePersonInList(person) {
    const row = document.getElementById(currentRowID);
    let nodes = row.childNodes;

    nodes.forEach(td => {
      var cls = td.classList;
      if (cls !== undefined) {
        if (person.role === "pilot") {
          switch (true) {
            case cls.contains("acType"):
              td.innerHTML = person.aircraftType;
              break;
            case cls.contains("surname"):
              td.innerHTML = person.surname;
              break;
            case cls.contains("cs"):
              td.innerHTML = person.callsign;
              break;
            case cls.contains("mwm"):
              td.innerHTML = person.WM;
              break;
          }
        } else {
          switch (true) {
            case cls.contains("acType"):
              td.innerHTML = person.aircraftType;
              break;
            case cls.contains("surname"):
              td.innerHTML = person.surname;
              break;
            case cls.contains("cs"):
              td.innerHTML = UI.updateRoleBadge(person);
              break;
            case cls.contains("mwm"):
              td.innerHTML = "";
              break;
          }
        }
      }
    });
  }

  // UI.REMOVE PERSON
  static removePersonFromList(el) {
    el.parentElement.parentElement.remove();
  }

  // UI.REMOVE ALL PERSONS
  static removeAllPersons() {
    personnel = [];
    var tbody = $("#ptlContent tbody");
    var list = document.getElementById("personnel-list");

    if (tbody.children().length != 0) {
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
    }
  }

  // UI.AIRCRAFT
  static displayAircrafts() {
    const storedAircrafts = Store.getAircrafts();
    aircrafts = storedAircrafts;

    aircrafts.forEach(ac => UI.addAircraftToList(ac));
  }

  // UI.ADD AC
  static addAircraftToList(ac) {
    const list = document.querySelector("#aircrafts-list");

    const row = document.createElement("tr");
    const uniqueId = ac.type + "_" + ac.reg;

    row.setAttribute("id", uniqueId);
    row.setAttribute("class", "border-top");

    row.innerHTML = `
            <td class="sn-${ac.color}" scope="row"></td>
            <td>${ac.type}</td>
            <td id="acReg">${ac.reg}</td>
            <td class="border-r">${ac.rmk}</td>
            <td class="deleteAcTD"><svg class="icon-delete"></svg></td>
            `;

    list.appendChild(row);
    document.querySelector("#ac-table").className = "ac-table-wrapper";
  }

  // UI.REMOVE AC
  static removeAircraft(el) {
    el.parentElement.parentElement.remove();

    if (document.querySelector("#aircrafts-list").childNodes.length === 1) {
      document.querySelector("#ac-table").className =
        "ac-table-wrapper hidden_element";
    }
  }

  // UI.REMOVE ALL AC
  static removeAllAircrafts() {
    aircrafts = [];

    var list = document.getElementById("aircrafts-list");
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    document.querySelector("#ac-table").className =
      "ac-table-wrapper hidden_element";
  }

  static showAlert(message, className, id) {
    const div = document.createElement("div");
    div.className = `alert alert-${className} text-center mt-2`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(`#${id}alert-container`);

    container.appendChild(div);
    // Vanish in 3 seconds
    setTimeout(() => {
      if (container.firstChild) {
        document.querySelector(".alert").remove();
      }
    }, 3000);
  }

  static clearAddPersonFields() {
    document.querySelector("#pf-surname").value = "";
    document.querySelector("#pf-role").value = "wybierz";
    var row = document.querySelector("#callsignRow");
    row.className = "form-row hidden_element mt-2";
    document.querySelector("#pf-callsign").value = "";
    row = document.querySelector("#wxminimaRow");
    row.className = "form-row hidden_element mt-2";
    document.querySelector("#pf-wm").value = "";
    var acType = document.querySelector("#pf-acType");
    acType.value = "wybierz";
  }

  static clearAddAircraftFields() {
    document.querySelector("#af-acType").value = "wybierz";
    document.querySelector("#af-acReg").value = "#";
    var acRegRow = document.querySelector("#acRegRow");
    acRegRow.className = "form-row hidden_element mt-2";
    document.querySelector("#af-acRmk").value = "";
  }

  static clearEditPTLInfoFields() {
    document.querySelector("#flightShiftUnit").value = "";
    document.querySelector("#flightShiftVariant").value = "";
    document.querySelector("#flightShiftDate").value = "";
    document.querySelector("#flightShiftStart").value = "";
    document.querySelector("#flightShiftLength").value = 1;
    document.querySelector("#flightShiftLocationList").value = "wybierz";
    document.querySelector("#flightShiftSS").value = "";
    document.querySelector("#flightShiftRemarks").value = "";
  }

  // UI.DISPLAY FLIGHTS
  static displayFlights() {
    const storedFlights = Store.getFlights();
    flights = storedFlights;

    flights.forEach(flight => UI.addFlightToTimeline(flight));
  }

  // UI.ADD FLIGHT
  static addFlightToTimeline(flight) {
    // console.log (flight.crew)

    let startTotalInMinutes =
      getMinutes(ptlInfo.start) - 120 - ptlInfo.offset * 60;
    let flightStartTotalInMinutes = getMinutes(flight.startTime);

    const entries = Object.entries(flight.crew);
    let crewMembersCount = 0;
    for (const [key, value] of entries) {
      if (value !== undefined) {
        crewMembersCount++;

        let timelineContainer = document.querySelector(
          `#${value.person}_timeline`
        );
        var seatDiv = document.createElement("div");
        seatDiv.id = "flight_" + flightsCounter + "_" + value.person;
        seatDiv.className = "s-flight";
        seatDiv.style.left =
          Math.round(
            ((flightStartTotalInMinutes - startTotalInMinutes) * 4) / 20
          ) *
            20 +
          "px";
        seatDiv.style.width = flight.length * 4 + "px";
        seatDiv.style.background = "#c2c2c2";

        seatDiv.innerHTML = `
                <div class='attributes'>
                    <div class='att content'><svg class="ti-${flight.taskIcon}" ></svg></div>

                    <div class='att top-left'></div>
                    <div class='att top-right'>${value.task}</div>
                    <div class='att resizer'></div>
                    <div class='att ac-color' style="background-color: var(--${flight.aircraftColor});">${flight.aircraftIndex}</div>
                    <div class='att bottom-left'></div>
                    <div class='att bottom-right'>${flight.quantity}</div>
                </div>`;
        timelineContainer.appendChild(seatDiv);
      }
      // console.log(key, value, crewMembersCount)
    }
    flightsCounter++;
  }

  static removeFlightFromTimeline(el) {}

  static removeAllFlights() {
    var timelines = document.getElementById("personnel-list").childNodes;

    timelines.forEach(row => {
      if (row.id !== undefined) {
        let tds = row.childNodes;
        tds.forEach(td => {
          if (td.id !== undefined) {
            if (td.id.includes("_timeline")) {
              while (td.hasChildNodes()) {
                td.removeChild(td.firstChild);
              }
            }
          }
        });
      }
    });
  }

  static resizeElement(obj) {
    const resizer = obj.getElementsByClassName("resizer")[0];

    const minimum_size = 20;
    let original_width = 0;
    let original_mouse_x = 0;

    resizer.addEventListener("mousedown", function(e) {
      $("#personnel-list").sortable("disable");

      e.preventDefault();
      original_width = parseFloat(
        getComputedStyle(obj, null)
          .getPropertyValue("width")
          .replace("px", "")
      );
      original_mouse_x = e.pageX;
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResize);
    });

    function resize(e) {
      bringOnTop(obj);

      var range = (2 + parseInt(ptlInfo.shiftLength)) * 240;
      const width = original_width + (e.pageX - original_mouse_x);
      if (width > minimum_size && obj.offsetLeft + width < range) {
        getFlightDivsID(obj).each(function(i, d) {
          d.style.width = Math.round(width / 20) * 20 + "px";
        });

        // obj.style.width = Math.round(width/20) * 20 + 'px';
        // divs[1].style.width = Math.round(width/20) * 20 + 'px';
        Store.updateFlightLength(obj, width);
      }
    }

    function stopResize() {
      $("#personnel-list").sortable("enable");

      window.removeEventListener("mousemove", resize);
    }
  }

  // FIXME: show submenu
  static showFlightSubmenu() {}

  static dragElement(obj) {
    bringOnTop(obj);

    let blocks = getFlightDivsID(obj);

    const dragger = document
      .getElementById(obj.id)
      .getElementsByClassName("ac-color")[0];
    let original_left = 0;
    let original_mouse_xD = 0;

    dragger.addEventListener("mousedown", function(e) {
      $("#personnel-list").sortable("disable");
      e.preventDefault();
      addShadow();

      original_left = parseFloat(
        getComputedStyle(obj, null)
          .getPropertyValue("left")
          .replace("px", "")
      );
      original_mouse_xD = e.pageX;

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", stopMove);
    });

    function move(e) {
      const range = (2 + parseInt(ptlInfo.shiftLength)) * 240;
      const newPosition = original_left + (e.pageX - original_mouse_xD);

      let startTotalInMinutes =
        getMinutes(ptlInfo.start) - 120 - ptlInfo.offset * 60;

      let newTime;

      if (newPosition < 0) {
        getFlightDivsID(obj).each(function(i, d) {
          d.style.left = "0 px";
        });
        newTime = convertToTime(startTotalInMinutes);
      } else if (newPosition + obj.offsetWidth >= range) {
        getFlightDivsID(obj).each(function(i, d) {
          d.style.left = range - obj.offsetWidth + "px";
        });
        let newTimeInMinutes = ((range - obj.offsetWidth) / 40) * 10;
        newTime = convertToTime(newTimeInMinutes + startTotalInMinutes);
      } else {
        getFlightDivsID(obj).each(function(i, d) {
          d.style.left = Math.round(newPosition / 20) * 20 + "px";
        });
        let newTimeInMinutes = ((Math.round(newPosition / 20) * 20) / 40) * 10;
        newTime = convertToTime(newTimeInMinutes + startTotalInMinutes);
      }
      Store.updateTakeOffTime(obj, newTime);
    }

    function stopMove() {
      $("#personnel-list").sortable("enable");

      removeShadow();
      window.removeEventListener("mousemove", move);
    }

    function addShadow() {
      blocks.each(function(i, block) {
        block.classList.add("onDrag");
      });
    }

    function removeShadow() {
      blocks.each(function(i, block) {
        block.classList.remove("onDrag");
      });
    }
  }
}

// Store Class: Handle Storage
class Store {
  //STORE.PTLInfo
  static getPTLInfo() {
    let ptlInfo;

    if (localStorage.getItem("ptlInfo") === null) {
      ptlInfo = [];
    } else {
      ptlInfo = JSON.parse(localStorage.getItem("ptlInfo"));
    }
    return ptlInfo;
  }

  static setPTLInfo(dt) {
    localStorage.setItem("ptlInfo", JSON.stringify(dt));
  }

  //STORE.PERSON
  static getPersonnel() {
    let personnel;

    if (localStorage.getItem("personnel") === null) {
      personnel = [];
    } else {
      personnel = JSON.parse(localStorage.getItem("personnel"));
    }
    return personnel;
  }

  // Event: add person
  static addPerson(person) {
    const personnel = Store.getPersonnel();
    personnel.push(person);
    localStorage.setItem("personnel", JSON.stringify(personnel));
  }

  // Event: edit person
  static editPerson(obj) {
    const personnel = Store.getPersonnel();
    let currentID =
      currentPerson.aircraftType +
      "_" +
      currentPerson.surname +
      "_" +
      currentPerson.role;
    let personRowID = document.getElementById(currentID);
    let newID = obj.aircraftType + "_" + obj.surname + "_" + obj.role;

    personnel.forEach((person, index) => {
      if (
        person.surname === currentPerson.surname &&
        person.aircraftType === currentPerson.aircraftType &&
        person.role === currentPerson.role
      ) {
        personnel[index] = obj;
      }
    });
    personRowID.id = newID;
    localStorage.setItem("personnel", JSON.stringify(personnel));
  }

  static deletePerson(record) {
    var surname = findSurname(record);
    // console.log("surname:", surname);
    const personnel = Store.getPersonnel();
    // cs = findCallsign(el);

    personnel.forEach((person, index) => {
      if (person.surname === surname) {
        personnel.splice(index, 1);
        // console.log("personnel:", personnel);
      }
    });
    localStorage.setItem("personnel", JSON.stringify(personnel));
  }

  //STORE.AIRCRAFT
  static getAircrafts() {
    let aircrafts;
    if (localStorage.getItem("aircrafts") === null) {
      aircrafts = [];
    } else {
      aircrafts = JSON.parse(localStorage.getItem("aircrafts"));
    }

    return aircrafts;
  }

  static addAircraft(ac) {
    const aircrafts = Store.getAircrafts();
    aircrafts.push(ac);
    console.log("Ilość śmigłowców:", aircrafts.length);
    localStorage.setItem("aircrafts", JSON.stringify(aircrafts));
  }

  static removeAircraft(reg) {
    const aircrafts = Store.getAircrafts();
    aircrafts.forEach((ac, index) => {
      // console.log("ac:", ac);

      if (ac.reg === reg) {
        aircrafts.splice(index, 1);
        // console.log("aircrafts:", aircrafts);
      }
    });
    localStorage.setItem("aircrafts", JSON.stringify(aircrafts));
  }

  // STORE.FLIGHT
  static getFlights() {
    let flights;
    if (localStorage.getItem("flights") === null) {
      flights = [];
    } else {
      flights = JSON.parse(localStorage.getItem("flights"));
    }
    return flights;
  }

  // STORE Event: add flight
  static addFlight(flight) {
    const flights = Store.getFlights();
    flights.push(flight);
    console.log("Ilość lotów:", flights.length);
    localStorage.setItem("flights", JSON.stringify(flights));
  }

  // STORE FIXME: Event: edit flight
  static editFlight(obj) {
    // const personnel = Store.getPersonnel();
    // let currentID = currentPerson.aircraftType + "_" + currentPerson.surname + "_" + currentPerson.role;
    // let personRowID = document.getElementById(currentID)
    // let newID = obj.aircraftType + "_" + obj.surname + "_" + obj.role;
    // personnel.forEach((person, index) => {
    //     if (person.surname === currentPerson.surname && person.aircraftType === currentPerson.aircraftType && person.role === currentPerson.role) {
    //         personnel[index] = obj
    //     }
    // });
    // personRowID.id = newID
    // localStorage.setItem('personnel', JSON.stringify(personnel));
  }

  // STORE Event: edit flight -> length
  static updateFlightLength(flight, newWidth) {
    let flightID = flight.id.split("_"); //.pop()
    // console.log(flightID[1])

    const storedFlights = Store.getFlights();
    flights = storedFlights;

    flights[flightID[1]].length = (Math.round(newWidth / 20) * 20) / 4;
    localStorage.setItem("flights", JSON.stringify(flights));
  }

  // STORE Event: edit flight -> T/O time
  static updateTakeOffTime(flight, takeOffTime) {
    let flightID = flight.id.split("_"); //.pop()
    // console.log(flightID[1])
    const storedFlights = Store.getFlights();
    flights = storedFlights;

    flights[flightID[1]].startTime = takeOffTime; //"9:00" //Math.round(takeOffTime/20) * 20
    localStorage.setItem("flights", JSON.stringify(flights));
  }

  // STORE Event: delete all Flight

  static deleteAllFlights() {
    flights = [];
    localStorage.setItem("flights", JSON.stringify(flights));
  }
}

let trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};

// SETUP PAGE
// Event: Prepare PTL
document.addEventListener("DOMContentLoaded", ready);

// window.onbeforeunload = function() {
//     return "Zmiany nie zostały zapisane, na pewno chcesz kontynuować?";
//   };

function ready() {
  $("body").tooltip({
    selector: "[data-toggle=tooltip]"
  });

  UI.setupView();
  UI.displayAircrafts();
  UI.displayPersonnel();
  UI.displayFlights();

  reorderPersonnelList();

  // FIXME: generowanie graficznej formy
  // var capturePTL = document.querySelector("#capture")
  // fullhtml2canvas(capturePTL)

  console.log("ready()");
}

// GENERATE
// Event: generateGraphicsPTL
// FIXME: zapisanie ptl do pdfa
// const generateGraphicsPTL = document.querySelector('#generateGraphicsPTL');
// generateGraphicsPTL.onclick = function(){

//     // $('#graphicsPTLModal').on('show.bs.modal', prepareGraphicsPTLModal());
//     $('#graphicsPTLModal').modal('show');

// };

function fullhtml2canvas(el) {
  var ptlFilename =
    "Planówka_" + ptlInfo.date + "_" + ptlInfo.unit + "_" + ptlInfo.variant;
  const filename = `${ptlFilename}.png`;

  return new Promise(resolve => {
    html2canvas(el, {
      // windowWidth: capturePTL.scrollWidth,
      // windowHeight: capturePTL.scrollHeight,
      // windowWidth: capturePTL.clientWidth,
      // windowHeight: capturePTL.clientHeight,
      backgroundColor: "#ffffff",
      width: el.scrollWidth,
      height: el.scrollHeight,
      allowTaint: true
      // scale:2
    }).then(canvas => {
      resolve(canvas);
      var download = document.getElementById("generateGraphicsPTL");
      var image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      download.setAttribute("href", image);
      download.setAttribute("download", filename);
    });
  });
}

// NEW PTL
// Event: New PTL
const newPTLBtn = document.querySelector("#newPTLBtn");
newPTLBtn.onclick = function() {
  $("#newPTLModal").modal("show");
};

// Event: Create PTL
const createNewPTL = document.querySelector("#createNewPTL");
createNewPTL.onclick = function() {
  clearAllData();

  $("#newPTLModal").on("hide.bs.modal", UI.hidePTL());
  $("#newPTLModal").modal("hide");
  $("#PTLInfoModal").on("show.bs.modal", prepareEditModal());
  $("#PTLInfoModal").modal("show");
};

// EDIT PTL
// Event: Prepare PTLInfoModal
function prepareEditModal() {
  const storedPTLInfo = Store.getPTLInfo();
  ptlInfo = storedPTLInfo;
  // console.log("prepareEditModal():", ptlInfo, (ptlInfo).length)

  var unit = document.querySelector("#flightShiftUnit");
  var variant = document.querySelector("#flightShiftVariant");
  var date = document.querySelector("#flightShiftDate");
  var start = document.querySelector("#flightShiftStart");
  var end = document.querySelector("#flightShiftEnd");
  var shiftLength = document.querySelector("#flightShiftLength");
  var flightShiftLocationList = document.querySelector(
    "#flightShiftLocationList"
  );
  var selLocCoords = document.querySelector("#flightShiftSelLocCoords");
  var coordsRow = document.querySelector("#coordsRow");
  var locationLat = document.querySelector("#flightShiftInputCoordsLat");
  var locationLong = document.querySelector("#flightShiftInputCoordsLong");
  var sunset = document.querySelector("#flightShiftSS");
  var remarks = document.querySelector("#flightShiftRemarks");

  // Dropdown setup
  $.getJSON("json/locations.json", function(json) {
    $("#flightShiftLocationList").empty();
    $("#flightShiftLocationList").append($("<option>").text("wybierz"));
    $("#flightShiftLocationList").append(
      $("<option>").text("wprowadź współrzędne")
    );
    $.each(json, function(i, location) {
      $("#flightShiftLocationList").append(
        $("<option>")
          .text(location.name)
          .attr("value", location.name)
      );
    });
    if (ptlInfo.location !== "Inna") {
      $("#flightShiftLocationList").val(ptlInfo.location);
    } else {
      $("#flightShiftLocationList").val("wprowadź współrzędne");
    }
  });

  // Placeholders setup
  unit.setAttribute("placeholder", "Pododdział/Jednostka");
  variant.setAttribute("placeholder", "VFR/IMC/VFR Spec/PLG");
  date.setAttribute("placeholder", "DD.MM.RRRR");
  date.className = "form-control fs-Date-input";
  start.setAttribute("placeholder", "HH:MM");
  start.className = "form-control";
  locationLat.setAttribute("placeholder", "Długość (52.431)");
  locationLong.setAttribute("placeholder", "Szerokość (18.123)");
  sunset.setAttribute("placeholder", "HH:MM");
  remarks.setAttribute("placeholder", "Uwagi");

  if (ptlInfo.length === 0) {
    shiftLength.value = 1;

    flightShiftLocationList.className = "custom-select";
    selLocCoords.className =
      "col-md-3 v-middle justify-content-center invisible";
    coordsRow.className = "form-row mt-2 hidden_element";
    selLocCoords.innerHTML = "";
    locationLat.className = "custom-select";
    locationLong.className = "custom-select";
    document.querySelector("#confirm-PTL-modal-btn").value = "Utwórz";
  } else {
    unit.value = ptlInfo.unit;
    variant.value = ptlInfo.variant;
    date.value = ptlInfo.date;
    start.value = ptlInfo.start;
    shiftLength.value = ptlInfo.shiftLength;
    sunset.value = ptlInfo.ss;

    if (ptlInfo.location === "Inna") {
      coordsRow.className = "form-row mt-2";

      locationLat.value = ptlInfo.locationCords.split(", ")[0];
      locationLong.value = ptlInfo.locationCords.split(", ")[1];
    }

    selLocCoords.innerHTML =
      typeof ptlInfo.locationCords === "undefined"
        ? ""
        : ptlInfo.location === "Inna"
        ? "Inna"
        : ptlInfo.locationCords;
    selLocCoords.className = "col-md-3 v-middle justify-content-center";

    remarks.value = ptlInfo.remarks;
    document.querySelector("#confirm-PTL-modal-btn").value = "Zapisz zmiany";
  }
  showFlightEndLabel(start.value, true, shiftLength.value);
}

// Event: calculate sunset tapped 'sprawdź'
const calculateSSBtn = document.querySelector("#calculateSSBtn");
calculateSSBtn.onclick = function() {
  checkSunset();
};

function calculateSunAndMoon() {
  const storedPTLInfo = Store.getPTLInfo();
  ptlInfo = storedPTLInfo;

  var ssTimes = SunCalc.getTimes(
    toDate(ptlInfo.date),
    ptlInfo.locationCords.split(", ")[0],
    ptlInfo.locationCords.split(", ")[1]
  );
  var sunset = ssTimes.sunset.getHours() + ":" + ssTimes.sunset.getMinutes();

  var moonIllumination = SunCalc.getMoonIllumination(toDate(ptlInfo.date));
  var moonIllum = Math.round(moonIllumination.fraction * 100) + "%";
  var moonTimes = SunCalc.getMoonTimes(
    toDate(ptlInfo.date),
    ptlInfo.locationCords.split(", ")[0],
    ptlInfo.locationCords.split(", ")[1]
  );
  var moonRise = moonTimes.rise.getHours() + ":" + moonTimes.rise.getMinutes();
  var moonSet = moonTimes.set.getHours() + ":" + moonTimes.set.getMinutes();

  document.querySelector("#localSunset").innerHTML = sunset + " LMT";
  document.querySelector("#moonIllum").innerHTML = moonIllum;
  document.querySelector("#localMoonrise").innerHTML = moonRise + " LMT";
  document.querySelector("#localMoonset").innerHTML = moonSet + " LMT";

  var moonPhase = Math.round(moonIllumination.phase * 100) / 100;
  var moonPhaseClass = "";
  switch (true) {
    case moonPhase == 0:
      moonPhaseClass = "i-moonphase1";
      break;
    case moonPhase > 0 && moonPhase < 0.25:
      moonPhaseClass = "i-moonphase2";
      break;
    case moonPhase == 0.25:
      moonPhaseClass = "i-moonphase3";
      break;
    case moonPhase > 0.25 && moonPhase < 0.5:
      moonPhaseClass = "i-moonphase4";
      break;
    case moonPhase == 0.5:
      moonPhaseClass = "i-moonphase5";
      break;
    case moonPhase > 0.5 && moonPhase < 0.75:
      moonPhaseClass = "i-moonphase6";
      break;
    case moonPhase == 0.75:
      moonPhaseClass = "i-moonphase7";
      break;
    case moonPhase > 0.75 && moonPhase < 1.0:
      moonPhaseClass = "i-moonphase8";
      break;
    default:
      moonPhaseClass = "i-moonphase";
      break;
  }
  document.querySelector("#moonIllum").className = moonPhaseClass;
}

function checkSunset() {
  const alertContainer = document.querySelector("#ef-alert-container");
  var flightsDate = document.querySelector("#flightShiftDate");

  var flightShiftLocationList = document.querySelector(
    "#flightShiftLocationList"
  );
  //var flightShiftSelLocCoords = document.querySelector("#flightShiftSelLocCoords");
  var flightShiftInputCoordsLat = document.querySelector(
    "#flightShiftInputCoordsLat"
  );
  var flightShiftInputCoordsLong = document.querySelector(
    "#flightShiftInputCoordsLong"
  );

  var inputData = toDate(flightsDate.value);

  var latitude = flightShiftInputCoordsLat.value;
  var longitude = flightShiftInputCoordsLong.value;

  if (dateRegex.test(flightsDate.value) && flightsDate.value.length === 10) {
    flightsDate.className = "form-control fs-Date-input is-valid";
  } else {
    flightsDate.className = "form-control fs-Date-input is-invalid";
    if (!alertContainer.firstChild) {
      UI.showAlert("Wprowadzona data jest nieprawidłowa", "danger", "ef-");
    }
  }

  if (flightShiftLocationList.value === "wybierz") {
    flightShiftLocationList.className = "custom-select is-invalid";

    if (!alertContainer.firstChild) {
      UI.showAlert("Wybierz lokalizację z listy", "danger", "ef-");
    }
  } else if (flightShiftLocationList.value === "wprowadź współrzędne") {
    if (
      flightShiftInputCoordsLat.value !== "" &&
      flightShiftInputCoordsLong.value !== ""
    ) {
      var sunsetAtInputDate = new Date(inputData).calculateSunset(
        latitude,
        longitude
      );
      var mm = sunsetAtInputDate.getMinutes();
      var hh = sunsetAtInputDate.getHours();

      hh = checkTime(hh);
      mm = checkTime(mm);
      document.querySelector("#flightShiftSS").value = hh + ":" + mm;
    } else {
      flightShiftInputCoordsLat.className = "custom-select is-invalid";
      flightShiftInputCoordsLong.className = "custom-select is-invalid";
      if (!alertContainer.firstChild) {
        UI.showAlert("Podaj długość i szerokość geograficzną", "danger", "ef-");
      }
    }
  } else {
    $.getJSON("json/locations.json", function(json) {
      $.each(json, function(i, option) {
        if (option.name === flightShiftLocationList.value) {
          var sunsetAtInputDate = new Date(inputData).calculateSunset(
            option.latitude,
            option.longitude
          );
          var mm = sunsetAtInputDate.getMinutes();
          var hh = sunsetAtInputDate.getHours();

          hh = checkTime(hh);
          mm = checkTime(mm);
          document.querySelector("#flightShiftSS").value = hh + ":" + mm;
        }
      });
    });
  }
}

// Event flightShiftStart onBlur
document
  .querySelector("#flightShiftStart")
  .addEventListener("blur", function() {
    let flightShiftLength = parseInt(
      document.querySelector("#flightShiftLength").value
    );
    let shiftStart = this.value;
    let shiftStartTimeValid = validateTime(this);

    showFlightEndLabel(shiftStart, shiftStartTimeValid, flightShiftLength);
  });

function showFlightEndLabel(start, shiftStartTimeValid, flightShiftLength) {
  let shiftEnd = document.querySelector("#flightShiftEnd");
  if (
    (start !== "" || start.length !== 0 || start !== null) &&
    shiftStartTimeValid
  ) {
    totalInMinutes = getMinutes(start);

    let endInMinutes = totalInMinutes + 60 * flightShiftLength;
    if (endInMinutes > 1440) {
      endInMinutes = endInMinutes - 1440;
    }
    let end = formatTime(endInMinutes);

    shiftEnd.innerHTML = "Loty do " + end;
    shiftEnd.classList.remove("invisible");
  } else {
    shiftEnd.classList.add("invisible");

    const alertContainer = document.querySelector("#ef-alert-container");
    if (!alertContainer.firstChild) {
      UI.showAlert(
        "Popraw godzinę początku zmiany lotnej (wg formatu HH:MM)",
        "danger",
        "ef-"
      );
    }
  }
}

// PTLInfo MODAL
// Event: Show PTLInfoModal
const editPTLBtn = document.querySelector("#editPTLBtn");
editPTLBtn.onclick = function() {
  $("#PTLInfoModal").on("show.bs.modal", prepareEditModal());
  $("#PTLInfoModal").modal("show");
};

// Event: save edited PTL
const confirmPTLChangesBtn = document.querySelector("#confirm-PTL-modal-btn");
confirmPTLChangesBtn.onclick = function() {
  ptlForm();
};

function ptlForm() {
  const alertContainer = document.querySelector("#ef-alert-container");

  validateDate(document.querySelector("#flightShiftDate"));
  validateTime(document.querySelector("#flightShiftStart"));

  const unit = document.querySelector("#flightShiftUnit").value;
  const variant = document.querySelector("#flightShiftVariant").value;
  const date = document.querySelector("#flightShiftDate").value;
  const offset = setTimeOffset(date);
  const sunset = document.querySelector("#flightShiftSS").value;
  const start = document.querySelector("#flightShiftStart").value;
  const length = document.querySelector("#flightShiftLength").value;
  const remarks = document.querySelector("#flightShiftRemarks").value;
  const locationCords = document.querySelector("#flightShiftSelLocCoords")
    .innerHTML;
  const locationName = document.querySelector("#flightShiftLocationList").value;

  var inputData = new PTLInfo();

  inputData.unit = unit;
  inputData.variant = variant;
  inputData.date = date;
  inputData.offset = offset;
  inputData.start = start;
  inputData.shiftLength = length;
  inputData.ss = sunset;
  inputData.remarks = remarks;

  if (locationName !== "wprowadź współrzędne") {
    inputData.locationCords = locationCords;
    inputData.location = locationName;
  } else {
    const lat = document.querySelector("#flightShiftInputCoordsLat").value;
    const long = document.querySelector("#flightShiftInputCoordsLong").value;
    inputData.location = "Inna";
    var coords =
      Math.round(lat * 1000) / 1000 + ", " + Math.round(long * 1000) / 1000;
    inputData.locationCords = coords;
  }

  checkSunset();

  if (
    !document
      .querySelector("#flightShiftDate")
      .classList.contains("is-invalid") &&
    !document
      .querySelector("#flightShiftStart")
      .classList.contains("is-invalid")
  ) {
    Store.setPTLInfo(inputData);
    // Show success message
    if (!alertContainer.firstChild) {
      UI.showAlert("Dane zostały pomyślnie zaktualizowane", "success", "ef-");

      setTimeout(() => {
        $("#PTLInfoModal").on("hide.bs.modal", UI.updatePTL(inputData));
        $("#PTLInfoModal").modal("hide");
      }, 1500);
    }
  } else {
    if (!alertContainer.firstChild) {
      UI.showAlert(
        "Wprowdź przynajmniej datę i godzinę początku zmiany lotnej",
        "danger",
        "ef-"
      );
    }
  }
}

// Event: Clear PTL
const clearAllBtn = document.querySelector("#clearAllBtn");
clearAllBtn.onclick = function() {
  clearAllData();
  $("#clearPTLModal").modal("hide");
};

// --------------------------------------------//
// ------------ADD OBJECT----------------------//
// FLIGHT
const addFlightBtn = document.getElementById("addFlightBtn");
addFlightBtn.onclick = function() {
  $("#flightModal").on("show.bs.modal", prepareFlightModal());
  $("#flightModal").modal("show");
};

// Event: Prepare addFlightModal
function prepareFlightModal() {
  document.querySelector("#ff-acType").value = "wybierz";
  document.querySelector("#ff-acReg").className =
    "custom-select hidden_element";
  document.querySelector("#ff-acColor").className =
    "col-md-2 v-middle hidden_element";

  document.getElementById("leftSeatRow").classList.add("hidden_element");
  document.getElementById("rightSeatRow").classList.add("hidden_element");

  $("#ff-leftSeatRole").empty();
  $("#ff-rightSeatRole").empty();
  pilotFunctionsOnDeck.forEach(func => {
    if (func !== "II pilot") {
      $("#ff-leftSeatRole").append(
        $("<option/>")
          .attr("value", func)
          .text(func)
      );
    }
    $("#ff-rightSeatRole").append(
      $("<option/>")
        .attr("value", func)
        .text(func)
    );
  });

  // populate task icon select
  prepareTaskIconsSelect();

  document.getElementById("enginnerSeatRow").classList.add("hidden_element");
  document
    .getElementById("engineerInstructorRow")
    .classList.add("hidden_element");
  document.getElementById("ff-flightStart").value = "";
  document.getElementById("ff-flightStart").className = "form-control";

  document.getElementById("additionalCrewRow").classList.add("hidden_element");

  getAvailableTypes();

  // Placeholders setup
  var flightStart = document.getElementById("ff-flightStart");
  flightStart.setAttribute("placeholder", "HH:MM");
}

function prepareTaskIconsSelect() {
  iconSelect = new IconSelect("ff-taskIconSelect", {
    selectedIconWidth: 60,
    selectedIconHeight: 30,
    selectedBoxPadding: 1,
    iconsWidth: 60,
    iconsHeight: 30,
    boxIconSpace: 1,
    vectoralIconNumber: 4,
    horizontalIconNumber: 6
  });

  var icons = [];
  icons.push({ iconFilePath: "assets/taskIcons/proba.svg", iconValue: "1" });
  icons.push({
    iconFilePath: "assets/taskIcons/kolowanie.svg",
    iconValue: "2"
  });
  icons.push({ iconFilePath: "assets/taskIcons/zawis.svg", iconValue: "3" });
  icons.push({ iconFilePath: "assets/taskIcons/zawisOGE.svg", iconValue: "4" });
  icons.push({
    iconFilePath: "assets/taskIcons/manewrowanie.svg",
    iconValue: "5"
  });
  icons.push({ iconFilePath: "assets/taskIcons/krag.svg", iconValue: "6" });
  icons.push({
    iconFilePath: "assets/taskIcons/kragNiski.svg",
    iconValue: "7"
  });
  icons.push({
    iconFilePath: "assets/taskIcons/samolotowe.svg",
    iconValue: "8"
  });
  icons.push({
    iconFilePath: "assets/taskIcons/zawisAwaria.svg",
    iconValue: "9"
  });
  icons.push({
    iconFilePath: "assets/taskIcons/startAwaria.svg",
    iconValue: "10"
  });
  icons.push({
    iconFilePath: "assets/taskIcons/silnikAwaria.svg",
    iconValue: "11"
  });
  icons.push({
    iconFilePath: "assets/taskIcons/autorotacja.svg",
    iconValue: "12"
  });
  icons.push({ iconFilePath: "assets/taskIcons/ogonowe.svg", iconValue: "13" });
  icons.push({ iconFilePath: "assets/taskIcons/rs.svg", iconValue: "14" });
  icons.push({ iconFilePath: "assets/taskIcons/pl.svg", iconValue: "15" });
  icons.push({
    iconFilePath: "assets/taskIcons/kragAwaria.svg",
    iconValue: "16"
  });
  icons.push({ iconFilePath: "assets/taskIcons/trasa.svg", iconValue: "17" });
  icons.push({ iconFilePath: "assets/taskIcons/strefa.svg", iconValue: "18" });
  icons.push({
    iconFilePath: "assets/taskIcons/strefaNiska.svg",
    iconValue: "19"
  });
  icons.push({
    iconFilePath: "assets/taskIcons/ladowisko.svg",
    iconValue: "20"
  });
  icons.push({
    iconFilePath: "assets/taskIcons/strefaLadowiskoKrag.svg",
    iconValue: "21"
  });

  iconSelect.refresh(icons);
}

function getAvailableTypes() {
  const storedAircrafts = Store.getAircrafts();
  let availableTypes = [];
  storedAircrafts.forEach(ac => {
    if ($.inArray(ac.type, availableTypes) === -1) availableTypes.push(ac.type);
  });
  // console.log(storedAircrafts, availableTypes)

  $("#ff-acType").empty();

  if (availableTypes.length !== 0) {
    $("#ff-acType").append(
      $("<option/>")
        .attr("value", "wybierz")
        .text("wybierz")
    );
    availableTypes.forEach(type => {
      $("#ff-acType").append(
        $("<option/>")
          .attr("value", type)
          .text(type)
      );
    });
  } else {
    $("#ff-acType").append(
      $("<option/>")
        .attr("value", "brak")
        .text("brak dostępnych SP")
    );
  }
}

function addPilotsToDropdown(acType) {
  let availablePilots = getAvailablePilots(acType);

  $("#ff-leftSeatPilot").empty();
  $("#ff-rightSeatPilot").empty();
  $("#ff-leftSeatPilot").append(
    $("<option/>")
      .attr("value", "wybierz")
      .text("wybierz")
  );
  $("#ff-rightSeatPilot").append(
    $("<option/>")
      .attr("value", "wybierz")
      .text("wybierz")
  );

  availablePilots.filter(function(pilot) {
    $("#ff-leftSeatPilot").append(
      $("<option>")
        .text(pilot)
        .attr("value", pilot)
    );
    $("#ff-rightSeatPilot").append(
      $("<option>")
        .text(pilot)
        .attr("value", pilot)
    );
  });

  // if (acType === "Mi-2") {
  //     $('#ff-rightSeatPilot').append($('<option>').text("brak").attr('value', "brak"));
  // }
}

function getAvailablePilots(acType) {
  const storedPersonnel = Store.getPersonnel();
  let availablePilots = [];

  storedPersonnel.filter(function(val) {
    if (val.aircraftType === acType && val.role === "pilot") {
      availablePilots.push(val.surname);
    }
  });
  return availablePilots;
}

// Event: Clear all flights
const deleteAllFlightsBtn = document.querySelector("#deleteAllFlightsBtn");
deleteAllFlightsBtn.onclick = function() {
  Store.deleteAllFlights();
  UI.removeAllFlights();
  $("#clearAllFlightsModal").modal("hide");
};

/* ELEMENTS DECLARATIONS */
// PRESENTATION MODE
const modeToggle = document.querySelector("input[name=presentationMode]");

/* Personnel Form */
let personRole = document.querySelector("#pf-role");

/* Aircraft Form */
let aircraftType = document.querySelector("#af-acType");
let aircraftReg = document.querySelector("#af-acReg");
let aircraftColor = document.querySelector("#af-acColors");
let aircraftRmk = document.querySelector("#af-acRmk");

/* Flight Form */
let acTypeDropDown = document.getElementById("ff-acType");
let acRegDropDown = document.querySelector("#ff-acReg");
let engineerTrainingToggle = document.querySelector(
  "input[name=engineerTraining]"
);
let additionalCrewCapacity = document.getElementById(
  "ff-additionalCrewCapacity"
);

let leftSeat = document.getElementById("ff-leftSeatPilot");
let rightSeat = document.getElementById("ff-rightSeatPilot");

/* CHANGE EVENT LISTENERS */
// DISPLAY
modeToggle.addEventListener("change", function() {
  if (this.checked) {
    document.getElementById("presentationModeLabel").innerHTML =
      "Tryb prezentacji";
    document.getElementById("main-menu").classList.add("hidden_element");
    document.getElementById("editH").classList.add("hidden_element");
    document.getElementById("deleteH").classList.add("hidden_element");
    document.getElementById("editF").classList.add("hidden_element");
    document.getElementById("deleteF").classList.add("hidden_element");
    document.getElementById("deleteAcH").classList.add("hidden_element");

    var tds = document.querySelectorAll(".editTD");
    tds.forEach(td => {
      td.classList.add("hidden_element");
    });
    tds = document.querySelectorAll(".deleteTD");
    tds.forEach(td => {
      td.classList.add("hidden_element");
    });
    tds = document.querySelectorAll(".deleteAcTD");
    tds.forEach(td => {
      td.classList.add("hidden_element");
    });
  } else {
    document.getElementById("presentationModeLabel").innerHTML = "Tryb edycji";
    document.getElementById("main-menu").classList.remove("hidden_element");
    document.getElementById("editH").classList.remove("hidden_element");
    document.getElementById("deleteH").classList.remove("hidden_element");
    document.getElementById("editF").classList.remove("hidden_element");
    document.getElementById("deleteF").classList.remove("hidden_element");
    document.getElementById("deleteAcH").classList.remove("hidden_element");

    var tds = document.querySelectorAll(".editTD");
    tds.forEach(td => {
      td.classList.remove("hidden_element");
    });
    tds = document.querySelectorAll(".deleteTD");
    tds.forEach(td => {
      td.classList.remove("hidden_element");
    });
    tds = document.querySelectorAll(".deleteAcTD");
    tds.forEach(td => {
      td.classList.remove("hidden_element");
    });
  }
});

//PTL FORM
// Event shiftLength dropdown change
document
  .querySelector("#flightShiftLength")
  .addEventListener("change", function() {
    let flightShiftLength = parseInt(this.value);
    let shiftStart = document.querySelector("#flightShiftStart").value;
    let shiftStartTimeValid = validateTime(
      document.querySelector("#flightShiftStart")
    );

    showFlightEndLabel(shiftStart, shiftStartTimeValid, flightShiftLength);
  });

// Event location dropdown change
document
  .querySelector("#flightShiftLocationList")
  .addEventListener("change", function() {
    var location = document.querySelector("#flightShiftLocationList").value;
    // console.log("Location changed to", location);
    document.querySelector("#flightShiftLocationList").className =
      "custom-select";
    document.querySelector("#flightShiftSS").value = "";

    if (location === "wybierz") {
      document.querySelector("#flightShiftSelLocCoords").innerHTML = "";
      document
        .querySelector("#flightShiftSelLocCoords")
        .classList.add("invisible");
      document.querySelector("#coordsRow").classList.add("hidden_element");
    } else if (location === "wprowadź współrzędne") {
      document.querySelector("#flightShiftInputCoordsLat").innerHTML = "";
      document.querySelector("#flightShiftInputCoordsLat").className =
        "custom-select";
      document.querySelector("#flightShiftInputCoordsLong").innerHTML = "";
      document.querySelector("#flightShiftInputCoordsLong").className =
        "custom-select";

      document.querySelector("#flightShiftSelLocCoords").innerHTML = "";
      document
        .querySelector("#flightShiftSelLocCoords")
        .classList.add("invisible");

      document.querySelector("#coordsRow").classList.remove("hidden_element");
    } else {
      document.querySelector("#coordsRow").classList.add("hidden_element");

      $.getJSON("json/locations.json", function(json) {
        $.each(json, function(i, option) {
          if (option.name === location) {
            var coords =
              Math.round(option.latitude * 1000) / 1000 +
              ", " +
              Math.round(option.longitude * 1000) / 1000;
            document.querySelector(
              "#flightShiftSelLocCoords"
            ).innerHTML = coords;
            document
              .querySelector("#flightShiftSelLocCoords")
              .classList.remove("invisible");
            document.querySelector("#flightShiftInputCoordsLat").value = "";
            document.querySelector("#flightShiftInputCoordsLong").value = "";
          }
        });
      });
    }
  });

// Event coords lat/long input change
document
  .querySelector("#flightShiftInputCoordsLat")
  .addEventListener("change", function() {
    document.querySelector("#flightShiftSelLocCoords").innerHTML = "";
    document
      .querySelector("#flightShiftSelLocCoords")
      .classList.add("invisible");
  });
document
  .querySelector("#flightShiftInputCoordsLong")
  .addEventListener("change", function() {
    document.querySelector("#flightShiftSelLocCoords").innerHTML = "";
    document
      .querySelector("#flightShiftSelLocCoords")
      .classList.add("invisible");
  });

// PERSON FORM
personRole.addEventListener("change", function() {
  let hideRow =
    this.value === "pilot" ? "form-row mt-2" : "form-row hidden_element mt-2";

  document.querySelector("#callsignRow").className = hideRow;
  document.querySelector("#wxminimaRow").className = hideRow;
});

// AIRCRAFT FORM
// Event acColor dropdown change
aircraftColor.addEventListener("change", function() {
  var color = document.querySelector("#af-acColors").value;
  document.querySelector(
    "#acSelectedColor"
  ).className = `badge helo-color-${color}`;
});

// FLIGHT FORM
acTypeDropDown.addEventListener("change", function() {
  // console.log("Type change")

  document.getElementById("ff-acColor").classList.add("hidden_element");
  document.getElementById("leftSeatRow").classList.add("hidden_element");
  document.getElementById("rightSeatRow").classList.add("hidden_element");
  document.getElementById("enginnerSeatRow").classList.add("hidden_element");
  document
    .getElementById("engineerInstructorRow")
    .classList.add("hidden_element");

  document.getElementById("additionalCrewRow").classList.add("hidden_element");

  // document.querySelector('input[name=engineerTraining]').checked = false
  // document.getElementById("ff-acColor").classList.add("hidden_element")

  // const additionalRows = document.getElementById("additionalRows");
  // while (additionalRows.firstChild) {
  //     additionalRows.removeChild(additionalRows.firstChild);
  // }
  // fetchAdditionalCrewCapacity(acTypeDropDown.value)
  // if (acTypeDropDown.value === "W-3") {
  //     addPilotsToDropdown(acTypeDropDown.value)
  //     getAvailableEngineers(acTypeDropDown.value)
  //     document.getElementById("leftSeatRow").classList.remove("hidden_element")
  //     document.getElementById("rightSeatRow").classList.remove("hidden_element")
  //     document.getElementById("enginnerSeatRow").classList.remove("hidden_element")

  //     document.getElementById("additionalCrewRow").classList.remove("hidden_element")

  // } else if (acTypeDropDown.value === "Mi-2") {
  //     addPilotsToDropdown(acTypeDropDown.value)
  //     if (getAvailablePilots(acTypeDropDown.value).length === 1) {
  //         document.getElementById("leftSeatRow").classList.remove("hidden_element")
  //         document.getElementById("rightSeatRow").classList.add("hidden_element")
  //     } else {
  //         document.getElementById("leftSeatRow").classList.remove("hidden_element")
  //         document.getElementById("rightSeatRow").classList.remove("hidden_element")
  //     }
  //     document.getElementById("enginnerSeatRow").classList.add("hidden_element")
  //     document.getElementById("engineerInstructorRow").classList.add("hidden_element")

  //     document.getElementById("additionalCrewRow").classList.remove("hidden_element")

  // } else {
  //     document.getElementById("leftSeatRow").classList.add("hidden_element")
  //     document.getElementById("rightSeatRow").classList.add("hidden_element")
  //     document.getElementById("enginnerSeatRow").classList.add("hidden_element")
  //     document.getElementById("engineerInstructorRow").classList.add("hidden_element")

  //     document.getElementById("additionalCrewRow").classList.add("hidden_element")
  // }
});

acRegDropDown.addEventListener("change", function() {
  document.querySelector("input[name=engineerTraining]").checked = false;

  const additionalRows = document.getElementById("additionalRows");
  while (additionalRows.firstChild) {
    additionalRows.removeChild(additionalRows.firstChild);
  }
  fetchAdditionalCrewCapacity(acTypeDropDown.value);
  if (acTypeDropDown.value === "W-3") {
    addPilotsToDropdown(acTypeDropDown.value);
    getAvailableEngineers(acTypeDropDown.value);
    document.getElementById("leftSeatRow").classList.remove("hidden_element");
    document.getElementById("rightSeatRow").classList.remove("hidden_element");
    document
      .getElementById("enginnerSeatRow")
      .classList.remove("hidden_element");

    document
      .getElementById("additionalCrewRow")
      .classList.remove("hidden_element");
  } else if (acTypeDropDown.value === "Mi-2") {
    addPilotsToDropdown(acTypeDropDown.value);
    if (getAvailablePilots(acTypeDropDown.value).length === 1) {
      document.getElementById("leftSeatRow").classList.remove("hidden_element");
      document.getElementById("rightSeatRow").classList.add("hidden_element");
    } else {
      document.getElementById("leftSeatRow").classList.remove("hidden_element");
      document
        .getElementById("rightSeatRow")
        .classList.remove("hidden_element");
    }
    document.getElementById("enginnerSeatRow").classList.add("hidden_element");
    document
      .getElementById("engineerInstructorRow")
      .classList.add("hidden_element");

    document
      .getElementById("additionalCrewRow")
      .classList.remove("hidden_element");
  } else {
    document.getElementById("leftSeatRow").classList.add("hidden_element");
    document.getElementById("rightSeatRow").classList.add("hidden_element");
    document.getElementById("enginnerSeatRow").classList.add("hidden_element");
    document
      .getElementById("engineerInstructorRow")
      .classList.add("hidden_element");

    document
      .getElementById("additionalCrewRow")
      .classList.add("hidden_element");
  }
});

additionalCrewCapacity.addEventListener("change", function() {
  const additionalRows = document.getElementById("additionalRows");
  while (additionalRows.firstChild) {
    additionalRows.removeChild(additionalRows.firstChild);
  }

  let options = getAdditionalCrew(acTypeDropDown.value);
  // console.log(options)
  for (i = 1; i <= additionalCrewCapacity.value; i++) {
    const row = document.createElement("div");
    const uniqueId = "crewRow_" + i;

    row.setAttribute("id", uniqueId);
    row.className = "form-row mt-2";

    row.innerHTML = `
            <div class="col-md-1 v-middle"># ${i}</div>
            <div class="col-md-4"><select id="ff-additionCrewRoles_${i}" class="custom-select"></select></div>       
            <div class="col-md-3">
            <select id="ff-additionCrewMember_${i}" class="custom-select hidden_element"></select>
            </div>   
            <div class="col-md-1 v-middle hidden_element">Zadanie</div>
            <div class="col-md-3">
            <input id="ff-additionCrewMemberTask_${i}" type="text" class="form-control hidden_element"></div>
        `;
    additionalRows.appendChild(row);
    $(`#ff-additionCrewRoles_${i}`).empty();
    $(`#ff-additionCrewRoles_${i}`).append(
      $("<option/>")
        .attr("value", "wybierz")
        .text("wybierz")
    );

    for (index = 0; index < options[0].length; index++) {
      $(`#ff-additionCrewRoles_${i}`).append(
        $("<option/>")
          .attr("value", options[0][index])
          .text(options[1][index])
      );
    }
    // console.log(row)

    (function() {
      document
        .getElementById(`ff-additionCrewRoles_${i}`)
        .addEventListener("change", function() {
          let iterator = parseInt(this.id.split("_").pop());
          // console.log("change", this, iterator)
          document
            .getElementById(`ff-additionCrewMember_${iterator}`)
            .classList.remove("hidden_element");
          document
            .getElementById(`ff-additionCrewMemberTask_${iterator}`)
            .classList.remove("hidden_element");
        });
    })();
  }
});

engineerTrainingToggle.addEventListener("change", function() {
  if (this.checked) {
    document
      .getElementById("engineerInstructorRow")
      .classList.remove("hidden_element");
  } else {
    document
      .getElementById("engineerInstructorRow")
      .classList.add("hidden_element");
  }
});

leftSeat.addEventListener("change", function() {
  let ac = acTypeDropDown.value;
  var available = getAvailablePilots(ac);
  let tempLeft = leftSeat.value;
  let tempRight = rightSeat.value;

  if (tempLeft !== "wybierz" && tempRight === "wybierz") {
    $("#ff-rightSeatPilot").empty();
    $("#ff-rightSeatPilot").append(
      $("<option>")
        .text("wybierz")
        .attr("value", "wybierz")
    );

    available.filter(function(pilot) {
      if (pilot !== leftSeat.value) {
        $("#ff-rightSeatPilot").append(
          $("<option>")
            .text(pilot)
            .attr("value", pilot)
        );
      }
    });
  } else if (tempLeft !== "wybierz" && tempRight !== "wybierz") {
    $("#ff-rightSeatPilot").empty();
    $("#ff-rightSeatPilot").append(
      $("<option>")
        .text("wybierz")
        .attr("value", "wybierz")
    );

    available.filter(function(pilot) {
      if (pilot !== leftSeat.value) {
        $("#ff-rightSeatPilot").append(
          $("<option>")
            .text(pilot)
            .attr("value", pilot)
        );
      }
    });
  } else {
    $("#ff-rightSeatPilot").empty();
    $("#ff-rightSeatPilot").append(
      $("<option>")
        .text("wybierz")
        .attr("value", "wybierz")
    );

    available.filter(function(pilot) {
      $("#ff-rightSeatPilot").append(
        $("<option>")
          .text(pilot)
          .attr("value", pilot)
      );
    });
  }
  setSelectedIndex(rightSeat, tempRight);
});

rightSeat.addEventListener("change", function() {
  let ac = acTypeDropDown.value;
  var available = getAvailablePilots(ac);
  let tempLeft = leftSeat.value;
  let tempRight = rightSeat.value;

  if (tempRight !== "wybierz" && tempLeft === "wybierz") {
    $("#ff-leftSeatPilot").empty();
    $("#ff-leftSeatPilot").append(
      $("<option>")
        .text("wybierz")
        .attr("value", "wybierz")
    );

    available.filter(function(pilot) {
      if (pilot !== rightSeat.value) {
        $("#ff-leftSeatPilot").append(
          $("<option>")
            .text(pilot)
            .attr("value", pilot)
        );
      }
    });
  } else if (tempRight !== "wybierz" && tempLeft !== "wybierz") {
    $("#ff-leftSeatPilot").empty();
    $("#ff-leftSeatPilot").append(
      $("<option>")
        .text("wybierz")
        .attr("value", "wybierz")
    );

    available.filter(function(pilot) {
      if (pilot !== rightSeat.value) {
        $("#ff-leftSeatPilot").append(
          $("<option>")
            .text(pilot)
            .attr("value", pilot)
        );
      }
    });
  } else {
    $("#ff-leftSeatPilot").empty();
    $("#ff-leftSeatPilot").append(
      $("<option>")
        .text("wybierz")
        .attr("value", "wybierz")
    );

    available.filter(function(pilot) {
      $("#ff-leftSeatPilot").append(
        $("<option>")
          .text(pilot)
          .attr("value", pilot)
      );
    });
  }
  setSelectedIndex(leftSeat, tempLeft);
});

/* GET FUNCTIONS / FETCH FUNCTIONS */
function getFlightDivsID(obj) {
  let dragObjID = obj.id.split("_"); //.pop()
  let flightID = "flight_" + dragObjID[1];

  let flightBlocks = $(`div[id^=${flightID}]`);
  return flightBlocks;
}

function getAvailableEngineers(acType) {
  const storedPersonnel = Store.getPersonnel();
  let availableEngineers = [];

  storedPersonnel.forEach(person => {
    $("#ff-engineerSeat").empty();
    $("#ff-engineerInstructor").empty();

    if (acType !== "wybierz") {
      if (person.aircraftType === acType && person.role === "engineer") {
        availableEngineers.push(person.surname);
      }

      if (availableEngineers.length !== 0) {
        $("#ff-engineerSeat").append(
          $("<option/>")
            .attr("value", "wybierz")
            .text("wybierz")
        );
        $("#ff-engineerInstructor").append(
          $("<option/>")
            .attr("value", "wybierz instruktora")
            .text("wybierz instruktora")
        );

        availableEngineers.forEach(enginner => {
          $("#ff-engineerSeat").append(
            $("<option/>")
              .attr("value", enginner)
              .text(enginner)
          );
          $("#ff-engineerInstructor").append(
            $("<option/>")
              .attr("value", enginner)
              .text(enginner)
          );
        });
      } else {
        $("#ff-engineerSeat").append(
          $("<option/>")
            .attr("value", "brak`")
            .text("brak techników pokładowych")
        );
      }
    }
  });
}

function fetchAdditionalCrewCapacity(acType) {
  let addedAdditionalCrew = 0;
  const storedPersonnel = Store.getPersonnel();

  storedPersonnel.forEach(person => {
    if (acType !== "wybierz") {
      if (
        person.aircraftType === acType &&
        person.role !== "pilot" &&
        person.role !== "engineer"
      ) {
        addedAdditionalCrew++;
      }
    }
  });
  let additionalCrew;
  $.getJSON("json/aircraftTypes.json", function(aircraft) {
    $.each(aircraft, function(i, ac) {
      if (ac.type === acType) {
        additionalCrew = ac.additionalCrew;
      }
    });
    $("#ff-additionalCrewCapacity").empty();
    if (additionalCrew > 0) {
      let range = 0;
      if (addedAdditionalCrew >= additionalCrew) {
        range = additionalCrew;
      } else {
        range = addedAdditionalCrew;
      }
      for (i = 0; i <= range; i++) {
        if (i === 0) {
          $("#ff-additionalCrewCapacity").append(
            $("<option/>")
              .attr("value", i)
              .text("brak")
          );
        } else {
          $("#ff-additionalCrewCapacity").append(
            $("<option/>")
              .attr("value", i)
              .text(`${i}`)
          );
        }
      }
    } else {
      $("#ff-additionalCrewCapacity").append(
        $("<option/>")
          .attr("value", 0)
          .text("brak")
      );
    }
  });
}

function getAdditionalCrew(acType) {
  const storedPersonnel = Store.getPersonnel();
  let availableAdditionalCrewRoles = [];
  let availableAdditionalCrewRolesShort = [];

  storedPersonnel.forEach(person => {
    if (acType !== "wybierz") {
      if (
        person.aircraftType === acType &&
        person.role !== "pilot" &&
        person.role !== "engineer"
      ) {
        if (availableAdditionalCrewRolesShort.indexOf(person.role) === -1) {
          availableAdditionalCrewRolesShort.push(person.role);
        }
      }
    }
  });

  for (i = 0; i < availableAdditionalCrewRolesShort.length; i++) {
    switch (availableAdditionalCrewRolesShort[i]) {
      case "navigator":
        availableAdditionalCrewRoles[i] = "Nawigator pokładowy";
        break;
      case "gunner":
        availableAdditionalCrewRoles[i] = "Strzelec pokładowy";
        break;
      case "medic":
        availableAdditionalCrewRoles[i] = "Ratownik medyczny";
        break;
      case "passenger":
        availableAdditionalCrewRoles[i] = "Pasażer";
        break;
      case "other":
        availableAdditionalCrewRoles[i] = "Inny";
        break;
    }
  }
  return [availableAdditionalCrewRolesShort, availableAdditionalCrewRoles];
}

$("#search").on("keyup", function() {
  var value = $(this)
    .val()
    .toLowerCase();
  $("#personnel-list tr").filter(function() {
    $(this).toggle(
      $(this)
        .text()
        .toLowerCase()
        .indexOf(value) > -1
    );
  });
});

// Event: Show addFlightModal
// Event: Add flight
const saveFlightBtn = document.getElementById("saveFlightBtn");
saveFlightBtn.onclick = function() {
  flightForm();
};

function flightForm() {
  var crew = new Crew();

  const quantity = document.querySelector("#ff-quantity").value;
  const aircraftType = document.querySelector("#ff-acType").value;
  const aircraftReg = document.querySelector("#ff-acReg").value;

  const storedAircrafts = Store.getAircrafts();
  storedAircrafts.forEach((ac, index) => {
    if (ac.reg === aircraftReg) {
      aircraftColor = ac.color;
      aircraftIndex = index + 1;
    }
  });

  const leftSeat = document.querySelector("#ff-leftSeatPilot").value;
  const leftSeatRole = document.querySelector("#ff-leftSeatRole").value;
  const leftSeatTask = document.querySelector("#ff-leftSeatTask").value;

  const rightSeat = document.querySelector("#ff-rightSeatPilot").value;
  const rightSeatRole = document.querySelector("#ff-rightSeatRole").value;
  const rightSeatTask = document.querySelector("#ff-rightSeatTask").value;

  const engineerSeat = document.querySelector("#ff-engineerSeat").value;
  const engineerSeatTask = document.querySelector("#ff-engineerSeatTask").value;

  const flightStart = document.getElementById("ff-flightStart");
  const flightLength = document.getElementById("ff-flightLength").value;

  const taskIcon = document
    .querySelector("#taskIcon")
    .src.split("/")
    .pop()
    .split(".")[0];
  // console.log("taskIcon", taskIcon)

  // const flightBreak = document.getElementById("ff-flightBreak").value

  // Validate
  const alertContainer = document.querySelector("#ff-alert-container");

  if (aircraftType === "wybierz") {
    if (!alertContainer.firstChild) {
      UI.showAlert("Wybierz typ śmigłowca", "danger", "ff-");
    }
  } else if (aircraftReg === "wybierz" || aircraftReg === "") {
    if (!alertContainer.firstChild) {
      UI.showAlert("Wybierz numer śmigłowca", "danger", "ff-");
    }
  } else if (!validateTime(flightStart)) {
    if (!alertContainer.firstChild) {
      UI.showAlert(
        "Wprowadzona godzina startu jest nieprawidłowa",
        "danger",
        "ff-"
      );
    }
    // FIXME: flight form validation
  } else if (leftSeat === "wybierz") {
    if (!alertContainer.firstChild) {
      UI.showAlert(
        "Wybierz osobę wykonującą lot z lewego fotela",
        "danger",
        "ff-"
      );
    }
  } else if (leftSeat === "brak" || rightSeat === "brak") {
    if (!alertContainer.firstChild) {
      UI.showAlert(
        `Brak dostępnych pilotów (${aircraftType}) wykonujących loty`,
        "danger",
        "ff-"
      );
    }
  } else if (rightSeat === "wybierz" && aircraftType === "W-3") {
    if (!alertContainer.firstChild) {
      UI.showAlert(
        "Wybierz osobę wykonującą lot z prawego fotela",
        "danger",
        "ff-"
      );
    }
  } else if (engineerSeat === "wybierz" && aircraftType === "W-3") {
    if (!alertContainer.firstChild) {
      UI.showAlert(
        "Wybierz osobę wykonującą lot w charakterze technika pokładowego",
        "danger",
        "ff-"
      );
    }
  } else if (engineerSeat === "brak" && aircraftType === "W-3") {
    if (!alertContainer.firstChild) {
      UI.showAlert(
        `Brak dostępnych techniów pokładowych (${aircraftType})`,
        "danger",
        "ff-"
      );
    }
  } else {
    validateFlightTime(flightStart.value, flightLength);

    if (aircraftType === "W-3") {
      crew.leftSeat = new CrewMember(leftSeat, leftSeatRole, leftSeatTask);
      crew.rightSeat = new CrewMember(rightSeat, rightSeatRole, rightSeatTask);
      crew.engineerSeat = new CrewMember(
        engineerSeat,
        "Technik pokładowy",
        engineerSeatTask
      );

      // let leftSeatPilot = new CrewMember(leftSeat, leftSeatRole, leftSeatTask)
      // let rightSeatPilot = new CrewMember(rightSeat, rightSeatRole, rightSeatTask)
      // let engineer = new CrewMember(engineerSeat, "Technik pokładowy", engineerSeatTask)

      // var crew = new Crew(leftSeatPilot, rightSeatPilot, engineer)
    } else if (aircraftType === "Mi-2") {
      crew.leftSeat = new CrewMember(leftSeat, leftSeatRole, leftSeatTask);
      // let leftSeatPilot = new CrewMember(leftSeat, leftSeatRole, leftSeatTask)
      // let rightSeatPilot = new CrewMember(rightSeat, rightSeatRole, rightSeatTask)

      // var crew = new Crew(leftSeatPilot, rightSeatPilot, engineer)
    }

    handleAddFlight(
      crew,
      flightStart.value,
      flightLength,
      quantity,
      aircraftType,
      aircraftReg,
      aircraftColor,
      aircraftIndex,
      taskIcon
    );

    // handleAddFlight(leftSeatPilot, rightSeatPilot, engineer, flightStart.value, flightLength, quantity, aircraftType, aircraftReg, aircraftColor, aircraftIndex)
  }
}

// Event: handleAddFlight
// function handleAddFlight (commander, coPilot, engineer, startTime, length, quantity, aircraftType, aircraftReg, aircraftColor, aircraftIndex) {
function handleAddFlight(
  crew,
  startTime,
  length,
  quantity,
  aircraftType,
  aircraftReg,
  aircraftColor,
  aircraftIndex,
  taskIcon
) {
  const alertContainer = document.querySelector("#ff-alert-container");

  // Instatiate flight
  const flight = new Flight(
    crew,
    taskIcon,
    startTime,
    length,
    quantity,
    aircraftType,
    aircraftReg,
    aircraftColor,
    aircraftIndex
  );

  // Add aircraft to UI
  UI.addFlightToTimeline(flight);

  // Add aircraft to Store
  Store.addFlight(flight);

  // Show success message
  if (!alertContainer.firstChild) {
    UI.showAlert("Lot został dodany pomyślnie", "success", "ff-");

    setTimeout(() => {
      $("#flightModal").modal("hide");
    }, 1500);
  }
}

function setHoverColor(obj) {
  let className = ".s-flight :hover";

  var nds = obj.parentElement.childNodes;
  let hoverColor = "";
  nds.forEach(node => {
    if (node.className === "att ac-color") {
      hoverColor = node.style.backgroundColor;
    }
  });

  let styleCSS =
    document.styleSheets[0].rules || document.styleSheets[0].cssRules;
  for (var x = 0; x < styleCSS.length; x++) {
    if (styleCSS[x].selectorText === undefined) {
      continue;
    }
    if (
      styleCSS[x].selectorText === className ||
      styleCSS[x].selectorText.indexOf(className) >= 0
    ) {
      if (styleCSS[x].cssText) {
        // console.log("befor", styleCSS[x].cssText)
        styleCSS[x].style["background-color"] = hoverColor;
        // console.log("after", styleCSS[x].cssText)
        // return styleCSS[x].cssText;
      }
    }
  }
}

// Event: Drag & resize
var flightsContainer = document.getElementById("personnel-list");

flightsContainer.addEventListener("mouseover", function(e) {
  var obj = e.target.parentElement.parentElement;
  let elemClass = e.target.className;
  if (elemClass === "att resizer") {
    e.target.style.opacity = "1.0";
    UI.resizeElement(obj);
  } else if (elemClass === "att ac-color") {
    UI.dragElement(obj); // temporary disabled
    // FIXME: add flight adjustement (drag/edit/remove) submenu when user click on flight div
    UI.showFlightSubmenu();
  } else if (
    elemClass === "att content" ||
    elemClass === "att top-right" ||
    elemClass === "att bottom-right" ||
    elemClass === "s-flight"
  ) {
    bringOnTop(obj);
    setHoverColor(e.target);
  }
});

flightsContainer.addEventListener("mouseout", function(e) {
  if (e.target.className === "att resizer") {
    e.target.style.opacity = "0.0";
  }
});

// $("#catalog").sortable({});
function reorderPersonnelList() {
  $("#personnel-list").sortable({
    start: function(event, ui) {
      // console.log("start", rows);
    },
    change: function(event, ui) {
      // console.log("change");
    },
    sort: function(event, ui) {
      //  console.log("sort");
    },
    stop: function(event, ui) {
      var newRowID = ui.item[0].id;
      var rows = ui.item[0].parentElement.childNodes;

      var storredPersonnel = Store.getPersonnel();
      var personnel = storredPersonnel;

      rows.forEach((node, i) => {
        if (node.id !== undefined) {
          var rowID = node.id.split("_");
          for (index = 0; index < personnel.length; index++) {
            if (
              personnel[index].aircraftType === rowID[0] &&
              personnel[index].surname === rowID[1] &&
              personnel[index].role === rowID[2]
            ) {
              personnel[index].id = i;
            }
          }
        }
      });
      personnel.sort(function(a, b) {
        return a.id - b.id;
      });
      localStorage.setItem("personnel", JSON.stringify(personnel));
    }
  });
  $("#personnel-list").disableSelection();
}

// PERSON
// Event: Prepare addPersonModal
function prepareAddPersonModal() {
  UI.clearAddPersonFields();

  // Placeholders setup
  var surname = document.querySelector("#pf-surname");
  surname.setAttribute("placeholder", "Surname");
  var callsign = document.querySelector("#pf-callsign");
  callsign.setAttribute("placeholder", "Callsign");
  var wm = document.querySelector("#pf-wm");
  wm.setAttribute("placeholder", "Visibility/RVR");

  document.querySelector("#add-person-btn").value = "Dodaj osobę";
  document.querySelector("#personModalLabel").innerHTML =
    "Dodaj członka załogi";

  $("#pf-acType").empty();
  $.getJSON("json/aircraftTypes.json", function(aircraft) {
    $.each(aircraft, function(i, option) {
      $("#pf-acType").append(
        $("<option/>")
          .attr("value", option.type)
          .text(option.type)
      );
    });
  });
}

// Event: Show addPersonModal
const newPersonBtn = document.querySelector("#newPersonBtn");
newPersonBtn.onclick = function() {
  $("#personModal").on("show.bs.modal", prepareAddPersonModal());
  $("#personModal").modal("show");
};

// Event: Add/save edited person
const addPersonBtn = document.querySelector("#add-person-btn");
addPersonBtn.onclick = function() {
  personForm();
};

function personForm() {
  const surname = document.querySelector("#pf-surname").value;
  const aircraftType = document.querySelector("#pf-acType").value;
  const role = document.querySelector("#pf-role").value;
  const callsign = document.querySelector("#pf-callsign").value;
  const wm = document.querySelector("#pf-wm").value;

  const alertContainer = document.querySelector("#pf-alert-container");

  if (role !== "wybierz") {
    if (role === "pilot") {
      if (
        aircraftType === "wybierz" ||
        surname === "" ||
        callsign === "" ||
        wm === ""
      ) {
        if (!alertContainer.firstChild) {
          UI.showAlert("Uzupełnij wymagane pola", "danger", "pf-");
        }
      } else {
        if (alertContainer.firstChild) {
          document.querySelector(".alert").remove();
        }
        handlePerson(aircraftType, surname, role, callsign, wm);
      }
    } else {
      if (aircraftType === "wybierz" || surname === "") {
        if (!alertContainer.firstChild) {
          UI.showAlert("Uzupełnij wymagane pola", "danger", "pf-");
        }
      } else {
        if (alertContainer.firstChild) {
          document.querySelector(".alert").remove();
        }
        handlePerson(aircraftType, surname, role, callsign, wm);
      }
    }
  } else {
    if (!alertContainer.firstChild) {
      UI.showAlert("Uzupełnij wymagane pola", "danger", "pf-");
    }
  }
}

function handlePerson(aircraftType, surname, role, callsign, wm) {
  let id = Store.getPersonnel().length;

  // console.log(person)
  const alertContainer = document.querySelector("#pf-alert-container");

  // Instatiate person
  const person = new Person(id, aircraftType, surname, role, callsign, wm);

  let personBtnLabel = document.querySelector("#add-person-btn").value;
  if (personBtnLabel === "Dodaj osobę") {
    let storredPersonnel = Store.getPersonnel();
    let uniqSurname = contains(storredPersonnel, "surname", surname);
    if (!uniqSurname) {
      if (!alertContainer.firstChild) {
        UI.showAlert(
          "Osoba o tym nazwisku została już dodana (dopisz inicjał imienia)",
          "danger",
          "pf-"
        );
      }
    } else {
      // Add person to UI
      UI.addPersonToList(person);

      // Add person to Store
      Store.addPerson(person);

      // Show success message
      if (!alertContainer.firstChild) {
        UI.showAlert("Osoba została dodana pomyślnie", "success", "pf-");

        setTimeout(() => {
          $("#personModal").on("hide.bs.modal", UI.adjustAddFlightBtn());
          $("#personModal").modal("hide");
        }, 1500);
      }
    }
  } else if (personBtnLabel === "Zapisz zmiany") {
    var val = currentPerson.surname;
    var index = Store.getPersonnel().findIndex(function(item, i) {
      return item.surname === val;
    });
    person.id = index;

    // Update person to UI
    UI.updatePersonInList(person);

    // Edit person to Store
    Store.editPerson(person);

    // Show success message
    if (!alertContainer.firstChild) {
      UI.showAlert("Osoba została zaktualizowana pomyślnie", "success", "pf-");

      setTimeout(() => {
        $("#personModal").on("hide.bs.modal", UI.adjustAddFlightBtn());
        $("#personModal").modal("hide");
      }, 1500);
    }
  }
  // UI.adjustAddFlightBtn()
}

// Event: Remove/edit person
document.querySelector("#personnel-list").addEventListener("click", e => {
  // console.log(e.target)

  if (e.target.className.baseVal === "icon-delete") {
    // var cs = findCallsign(e.target);
    var surname = findSurname(e.target);
    var role = findRole(surname)[0];

    document.querySelector(
      "#crewMember"
    ).innerHTML = `${surname} (${role}) <br> zostanie usunięty z tabeli`;

    $("#deletePersonModal").modal("show");

    const deletePersonBtn = document.querySelector("#deletePersonBtn");
    deletePersonBtn.onclick = function() {
      if (role === "pilot") {
        pilotsCounter -= 1;
        document.querySelector("#pilotsCounter").innerHTML = `${pilotsCounter}`;
      } else if (role === "engineer") {
        engineersCounter -= 1;
        document.querySelector(
          "#engineersCounter"
        ).innerHTML = `${engineersCounter}`;
      } else {
        othersCounter -= 1;
        document.querySelector("#othersCounter").innerHTML = `${othersCounter}`;
      }

      var total = pilotsCounter + engineersCounter + othersCounter;
      document.querySelector("#totalPersonCounter").innerHTML = `${total}`;

      if (total === 0) {
        document.querySelector("#info-table").className =
          "ac-table-wrapper hidden_element";
      }

      // Remove person from UI
      UI.removePersonFromList(e.target);

      // Remove person from store
      Store.deletePerson(e.target);

      $("#deletePersonModal").on("hide.bs.modal", UI.adjustAddFlightBtn());
      $("#deletePersonModal").modal("hide");
    };
  } else if (e.target.className.baseVal === "icon-edit") {
    // console.log("edit", e.target)
    $("#personModal").on("show.bs.modal", prepareEditPersonModal(e));
    $("#personModal").modal("show");
  }
});

// ---------------------- //
// AIRCRAFT
// functions

// loads added aircraft registration numbers
function getRegs(obj) {
  var acType = obj.value;
  var acRegList = document.querySelector("#ff-acReg");

  const storedAircrafts = Store.getAircrafts();

  if (acType !== "wybierz") {
    // acRegLabel.className = 'col-md-1 align-self-center text-right';
    acRegList.className = "custom-select ";

    $("#ff-acReg").empty();
    $("#ff-acReg").append(
      $("<option/>")
        .attr("value", "wybierz")
        .text("#")
    );

    let availableRegs = [];

    storedAircrafts.forEach(ac => {
      if (ac.type === acType) {
        availableRegs.push(ac.reg);
      }
    });
    availableRegs.forEach(reg => {
      $("#ff-acReg").append(
        $("<option/>")
          .attr("value", reg)
          .text(reg)
      );
    });
  } else {
    // acRegLabel.className = 'col-md-1 align-self-center text-right hidden_element';
    acRegList.className = "custom-select hidden_element";
  }
}

function getAcColor(obj) {
  var acReg = obj.value;
  var acColor = document.querySelector("#ff-acColor");

  const storedAircrafts = Store.getAircrafts();
  storedAircrafts.forEach((ac, index) => {
    if (ac.reg === acReg) {
      document.querySelector(
        "#acColor"
      ).className = `badge helo-color-${ac.color}`;
      document.querySelector("#acColor").innerHTML = index + 1;
    }
  });

  if (acReg !== "wybierz") {
    acColor.classList.remove("hidden_element");
  } else {
    acColor.classList.add("hidden_element");
  }
}

// loads aircraft registration numbers from json file
function loadRegs(obj) {
  var acType = obj.value;
  var row = document.querySelector("#acRegRow");
  const storedAircrafts = Store.getAircrafts();

  if (acType !== "wybierz") {
    row.className = "form-row mt-2";
    $("#af-acReg").empty();
    $.getJSON("json/aircraftTypes.json", function(aircraft) {
      aircraft.forEach(ac => {
        if (ac.type === acType) {
          var regs = ac.reg;
          regs.forEach(reg => {
            if (!containsReg(storedAircrafts, reg)) {
              $("#af-acReg").append(
                $("<option/>")
                  .attr("value", reg)
                  .text(reg)
              );
            }
          });
        }
      });
    });
  } else {
    row.className = "form-row hidden_element mt-2";
  }
}

function containsReg(jsonArray, reg) {
  var isFound = false;
  for (var i in jsonArray) {
    // console.log("#", i, jsonArray[i]);
    // console.log(jsonArray[i].reg, "|" ,reg);
    if (jsonArray[i].reg !== reg && !isFound) {
      isFound = false;
    } else {
      isFound = true;
      break;
    }
  }
  return isFound;
}

// Event: Prepare addAircraftModal
function prepareAddAircraftModal() {
  // console.log("prepareAddAircraftModal");

  // Clear fields
  UI.clearAddAircraftFields();

  // Placeholders setup
  var acRmk = document.querySelector("#af-acRmk");
  acRmk.setAttribute("placeholder", "Remarks");

  $("#af-acType").empty();
  $.getJSON("json/aircraftTypes.json", function(aircraft) {
    $.each(aircraft, function(i, option) {
      $("#af-acType").append(
        $("<option/>")
          .attr("value", option.type)
          .text(option.type)
      );
    });
  });
}

// Event: Show addAircraftModal
const newACBtn = document.querySelector("#newACBtn");
newACBtn.onclick = function() {
  $("#addAircraftModal").on("show.bs.modal", prepareAddAircraftModal());
  $("#addAircraftModal").modal("show");
};

// Event: Add aircraft
const addAircraftBtn = document.querySelector("#addAircraftBtn");
addAircraftBtn.onclick = function() {
  aircraftForm();
};

function aircraftForm() {
  // const aircraftType = document.querySelector('#af-acType').value;
  // const aircraftReg = document.querySelector('#af-acReg').value;
  // const aircraftColor = document.querySelector('#af-acColors').value;
  // const aircraftRmk = document.querySelector('#af-acRmk').value;

  // Validate
  const alertContainer = document.querySelector("#af-alert-container");

  if (
    aircraftType.value === "wybierz" ||
    aircraftReg.value === "#" ||
    aircraftReg.value === ""
  ) {
    if (!alertContainer.firstChild) {
      UI.showAlert("Uzupełnij wymagane pola", "danger", "af-");
    }
  } else {
    if (alertContainer.firstChild) {
      document.querySelector(".alert").remove();
    }
    handleAddAircraft(
      aircraftType.value,
      aircraftReg.value,
      aircraftColor.value,
      aircraftRmk.value
    );
  }
}

// Event: handleAddAircraft
function handleAddAircraft(type, reg, color, rmk) {
  const alertContainer = document.querySelector("#af-alert-container");

  // Instatiate aircraft
  const ac = new Aircraft(type, reg, color, rmk);

  // Add aircraft to UI
  UI.addAircraftToList(ac);

  // Add aircraft to Store
  Store.addAircraft(ac);

  // Show success message
  if (!alertContainer.firstChild) {
    UI.showAlert("Statek powietrzny został dodany pomyślnie", "success", "af-");

    setTimeout(() => {
      $("#addAircraftModal").on("hide.bs.modal", UI.adjustAddFlightBtn());
      $("#addAircraftModal").modal("hide");
    }, 1500);
  }
}

// Event: Remove aircraft
document.querySelector("#aircrafts-list").addEventListener("click", e => {
  var reg = findACReg(e.target);
  var type = findACType(reg);
  document.querySelector(
    "#acToDelete"
  ).innerHTML = `Śmigłowiec ${type} o nr ${reg} zostanie usunięty.`;

  if (e.target.className.baseVal === "icon-delete") {
    $("#deleteAircraftModal").modal("show");

    const deleteAircraftBtn = document.querySelector("#deleteAircraftBtn");
    deleteAircraftBtn.onclick = function() {
      // Remove aircraft from UI
      UI.removeAircraft(e.target);

      // Remove aircraft from store
      Store.removeAircraft(reg);

      $("#deleteAircraftModal").on("hide.bs.modal", UI.adjustAddFlightBtn());
      $("#deleteAircraftModal").modal("hide");
    };
  }
});

// Event: Edit person
// Event: Prepare editPersonModal
function prepareEditPersonModal(record) {
  // console.log("prepareEditPersonModal", record);
  currentRowID = record.target.parentElement.parentElement.id;
  // console.log("prepareEdit", currentRowID)
  let person = fetchPerson(record);
  // console.log("person", person)

  currentPerson = person;
  // const role = findRole(person.surname)[0]

  document.querySelector("#pf-surname").value = person.surname;
  document.querySelector("#pf-role").selectedIndex = findRole(
    person.surname
  )[1];
  let rowClass =
    person.role === "pilot" ? "form-row mt-2" : "form-row mt-2 hidden_element";

  document.querySelector("#callsignRow").className = rowClass;
  document.querySelector("#wxminimaRow").className = rowClass;

  if (person.role === "pilot") {
    document.querySelector("#pf-callsign").value = person.callsign;
    document.querySelector("#pf-wm").value = person.WM;
  } else {
    document.querySelector("#pf-callsign").value = "";
    document.querySelector("#pf-wm").value = "";
  }
  document.querySelector("#add-person-btn").value = "Zapisz zmiany";
  document.querySelector("#personModalLabel").innerHTML =
    "Edytuj członka załogi";

  $("#pf-acType").empty();
  $.getJSON("json/aircraftTypes.json", function(aircraft) {
    $.each(aircraft, function(i, option) {
      $("#pf-acType").append(
        $("<option/>")
          .attr("value", option.type)
          .text(option.type)
      );
      if (option.type === person.aircraftType) {
        document.querySelector("#pf-acType").selectedIndex = i;
      }
    });
  });
}

// Event: Import Personnel
document.querySelector("#importPersonnelBtn").addEventListener("click", e => {
  const selectedFile = document.querySelector(".selectedFile");
  if (selectedFile.value != "") {
    clearAllData();
    handleFileSelect(selectedFile);
    selectedFile.value = "";
    $("#importPTLModal").modal("hide");
  } else {
    console.log("No file selected!");
  }
});

function handleFileSelect(selected) {
  var files = selected.files;

  var output = [];
  for (var i = 0, f; (f = files[i]); i++) {
    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        try {
          UI.removeAllPersons();
          UI.removeAllAircrafts();
          UI.removeAllFlights();

          json = JSON.parse(e.target.result);
          // var importedPTL = JSON.stringify(json);
          console.log("importedPTL", json);

          ptlInfo = JSON.stringify(json.ptlInfo);
          personnel = JSON.stringify(json.personnel);
          aircrafts = JSON.stringify(json.aircrafts);
          flights = JSON.stringify(json.flights);

          localStorage.setItem("ptlInfo", ptlInfo);
          localStorage.setItem("personnel", personnel);
          localStorage.setItem("aircrafts", aircrafts);
          localStorage.setItem("flights", flights);

          ready();

          document.querySelector("#exportPTLBtn").classList.remove("disabled");
          document.querySelector("#editPTLBtn").classList.remove("disabled");
          document.querySelector("#clearPTLBtn").classList.remove("disabled");
          document.querySelector("#addMenuBtn").classList.remove("disabled");
          document.querySelector("#removeMenuBtn").classList.remove("disabled");
          document
            .querySelector("#generateMenuBtn")
            .classList.remove("disabled");

          //alert(JSON.stringify(json, null, "\t"));
        } catch (ex) {
          //alert('Wystąpił błąd podczas ładowania pliku: \n' + ex);
        }
      };
    })(f);
    reader.readAsText(f);
  }
  console.log("JSON Loaded");
}

// Event: Export JSON
const exportPTLBtn = document.querySelector("#exportPTLBtn");
exportPTLBtn.onclick = function() {
  var ptlFilename =
    "PTL_" + ptlInfo.date + "_" + ptlInfo.unit + "_" + ptlInfo.variant;
  const filename = `${ptlFilename}.json`;

  const storedPTLInfo = Store.getPTLInfo();
  var info = storedPTLInfo;
  const storedPersonnel = Store.getPersonnel();
  var addedPersonnel = storedPersonnel;
  const storedAircrafts = Store.getAircrafts();
  var addedAircraft = storedAircrafts;
  const storedFlights = Store.getFlights();
  var addedFlights = storedFlights;

  var ptl = new PTL(info, addedPersonnel, addedAircraft, addedFlights);
  var jsonPTL = JSON.stringify(ptl, null, "\t");

  download(jsonPTL, filename, "text/plain");
  console.log("PTL exported");
};

// FIXME: EXPORT TO ORDER
// Event: Prepare exportToOrderModal
function exportToOrderModal() {
  console.log("exportToOrderModal");
  getDDMMYYYDate(today);

  // Placeholders setup
  var initialOrderNumber = document.querySelector("#exf-initialOrderNumber");
  initialOrderNumber.setAttribute("placeholder", "#");
  var dysponent = document.querySelector("#exf-dysponent");
  dysponent.setAttribute("placeholder", "np. 'D-ca 56. BLot'");
  var organizator = document.querySelector("#exf-organizator");
  organizator.setAttribute("placeholder", "np. 'Jan Nowak'");
  var logistic = document.querySelector("#exf-logistic");
  logistic.setAttribute("placeholder", "np. 'Lotnisko EPIR'");
  var orderNumber = document.querySelector("#exf-orderNumber");
  orderNumber.setAttribute("placeholder", "np. 'Nr Z-12 z dn. 23.01.2019'");
  var location = document.querySelector("#exf-location");
  location.setAttribute("placeholder", "np. 'Inowrocław'");
}

// Event: Show exportToOrderModal
const exportToOrderBtn = document.querySelector("#exportToOrderBtn");
exportToOrderBtn.onclick = function() {
  $("#exportToOrderModal").on("show.bs.modal", exportToOrderModal());
  $("#exportToOrderModal").modal("show");
};

// Event: FIXME: Export orders

// --------------------------------------------//
// -----------------CLOCK----------------------//
document.getElementById("DTG").innerHTML = `<h6>${getDTG(today)}</h6>`;

// --------------------------------------------//
// ---------DATE & TIME FUNCTIONS--------------//

function startTime() {
  var today = new Date();

  var DD = today.getUTCDate();
  var MM = today.getUTCMonth() + 1;
  var MMM = short_months(today);
  var YYYY = today.getFullYear();

  var h = today.getUTCHours();
  var m = today.getUTCMinutes();
  var s = today.getUTCSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById(
    "DTG"
  ).innerHTML = `<h5>${DD} ${MMM} ${YYYY} ${h}:${m}:${s}Z</h5>`;
  var t = setTimeout(startTime, 500);
}

function toDate(dateStr) {
  var dateParts = dateStr.split(".");
  var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  return dateObject;
}

function short_months(dt) {
  return Date.monthNamesShortEn[dt.getMonth()];
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function getDTG(dt) {
  //DDHHMM(Z)MONYY
  Date.monthNamesEn = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  Date.monthNamesShortEn = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];

  var DD = dt.getUTCDate();
  var MM = dt.getUTCMonth() + 1;
  var MMM = short_months(dt);
  var YYYY = dt.getFullYear();

  var mm = dt.getUTCMinutes();
  var hh = dt.getUTCHours();

  DD = checkTime(DD);
  MM = checkTime(MM);
  hh = checkTime(hh);
  mm = checkTime(mm);

  var dtg = DD + " " + hh + "" + mm + "Z " + MMM + " " + YYYY;
  return dtg;
}

function getDDMMYYYDate(dt) {
  var dd = dt.getDate();
  var mm = dt.getMonth() + 1;
  var yyyy = dt.getFullYear();

  dd = checkTime(dd);
  mm = checkTime(mm);

  var DDMMYYYY = dd + "." + mm + "." + yyyy;

  document.getElementById("orderSignDate").value = DDMMYYYY;
}

function setTimeOffset(obj) {
  // dt = new Date(2019,07,30);
  var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  var dt = new Date(obj.replace(pattern, "$3-$2-$1"));

  var offset = dt.getTimezoneOffset();

  if (Math.abs(offset) / 60 == 1) {
    return 1;
  } else {
    return 2;
  }
}

// function getWorkingDays(endDate){
//    var result = 0;
//    var currentDate = new Date(2019, 01, 1);
//    while (currentDate <= endDate)  {
//        var weekDay = currentDate.getDay();
//        if(weekDay != 0 && weekDay != 6)
//            result++;
//         currentDate.setDate(currentDate.getDate()+1);
//    }
//    return result;
// }
// var testDate = new Date(2019, 03, 11);
// console.log(getWorkingDays(testDate));

function getMinutes(hhmm) {
  return parseInt(hhmm.split(":")[0]) * 60 + parseInt(hhmm.split(":")[1]);
}

function convertToTime(min) {
  var hrs = Math.floor(min / 60);
  var minuntes = Math.floor(min - hrs * 60);

  var result = hrs < 10 ? "0" + hrs : hrs;
  result += ":" + (minuntes < 10 ? "0" + minuntes : minuntes);
  return result;
  // console.log (result)
}

function formatTime(minutes) {
  return [parseInt(minutes / 60), parseInt(minutes % 60)]
    .join(":")
    .replace(/\b(\d)\b/g, "0$1");
}

function clearAllData() {
  localStorage.clear();
  ptlInfo = [];
  json = null;

  pilotsCounter = 0;
  engineersCounter = 0;
  othersCounter = 0;
  flightsCounter = 0;

  UI.removeAllPersons();
  UI.removeAllAircrafts();
  UI.removeAllFlights();
  UI.clearEditPTLInfoFields();
  UI.hidePTL();

  document.querySelector("#exportPTLBtn").classList.add("disabled");
  document.querySelector("#editPTLBtn").classList.add("disabled");
  document.querySelector("#clearPTLBtn").classList.add("disabled");
  document.querySelector("#addMenuBtn").classList.add("disabled");
  document.querySelector("#removeMenuBtn").classList.add("disabled");
  document.querySelector("#generateMenuBtn").classList.add("disabled");
  // console.log("ALL DATA CLEARED");
}

// Validation
function validateDate(obj) {
  var dt = obj.value;

  if (dateRegex.test(dt) && dt.length === 10) {
    document.querySelector("#localTimeRow").className = "form-row mt-2";
    obj.className = `form-control is-valid`;

    var offset = setTimeOffset(dt);
    var timeOffsetLbl = document.getElementById("timeOffset");
    switch (offset) {
      case 1:
        timeOffsetLbl.innerHTML = `Zimowy (UTC+${offset})`;
        break;
      case 2:
        timeOffsetLbl.innerHTML = `Letni (UTC+${offset})`;
        break;
    }
  } else {
    document.querySelector("#localTimeRow").className =
      "form-row hidden_element mt-2";
    obj.className = "form-control is-invalid";
  }
}

function validateLat(obj) {
  var lat = obj.value;

  if (latitudeRegex.test(lat)) {
    obj.className = "form-control is-valid";
  } else {
    obj.className = "form-control is-invalid";
  }
}

function validateLong(obj) {
  var long = obj.value;

  if (longitudeRegex.test(long)) {
    obj.className = "form-control is-valid";
  } else {
    obj.className = "form-control is-invalid";
  }
}

function validateTime(obj) {
  var timeValue = obj.value;
  let sHours = 0;
  let sMinutes = 0;
  if (timeRegex.test(timeValue) && timeValue.length === 5) {
    obj.className = `form-control is-valid`;
  } else {
    if (timeValue.includes(":")) {
      obj.className = `form-control is-valid`;

      sHours = timeValue.split(":")[0];
      sMinutes = timeValue.split(":")[1];

      if (sHours.length !== 2) {
        if (sHours <= 9) {
          sHours = checkTime(sHours);
        } else {
          obj.className = `form-control is-invalid`;
        }
      }

      if (sMinutes === "") {
        sMinutes = "00";
      } else if (sMinutes.length !== 2) {
        if (sMinutes <= 9) {
          sMinutes = checkTime(sMinutes);
        } else {
          obj.className = `form-control is-invalid`;
        }
      }
      // obj.className = `form-control is-valid`;
      obj.value = sHours + ":" + sMinutes;
    } else {
      obj.className = `form-control is-invalid`;
    }
    // obj.className = `form-control is-invalid`;
    return false;
  }
  return true;
}

function validateFlightTime(start, length) {
  const alertContainer = document.querySelector("#ff-alert-container");

  startTotalInMinutes = getMinutes(ptlInfo.start) - 120 - ptlInfo.offset * 60;
  endTotalInMinutes = startTotalInMinutes + 120 + ptlInfo.shiftLength * 60;

  flightStartTotalInMinutes = getMinutes(start);
  flightEndTotalInMinutes =
    parseInt(flightStartTotalInMinutes) + parseInt(length);

  if (alertContainer.firstChild) {
    document.querySelector(".alert").remove();
  }
  if (flightStartTotalInMinutes < startTotalInMinutes) {
    if (!alertContainer.firstChild) {
      UI.showAlert(
        "Wprowadzona godzina startu jest zbyt wczesna, wykracza poza zmiane lotną",
        "danger",
        "ff-"
      );
    }
  } else if (flightStartTotalInMinutes >= endTotalInMinutes) {
    if (!alertContainer.firstChild) {
      UI.showAlert(
        "Wprowadzona godzina startu jest zbyt późna, wykracza poza zmiane lotną",
        "danger",
        "ff-"
      );
    }
  } else if (flightEndTotalInMinutes > endTotalInMinutes) {
    if (!alertContainer.firstChild) {
      UI.showAlert(
        "Czas lotu wykracza poza zmiane lotną, lądowanie planowane po zakończeniu lotów",
        "danger",
        "ff-"
      );
    }
  }
  return true;
}

// Featch functions
function fetchPerson(record) {
  const cs = findCallsign(record.target);
  const surname = findSurname(record.target);
  const id = findID(surname);
  // const roleIndex = findRole(surname)[1];
  const role = findRole(surname)[2];
  // console.log("role", role)
  const mwm = findWx(surname);
  const ac = findAC(record.target);
  let person = new Person(id, ac, surname, role, cs, mwm);

  return person;
}

function contains(arr, key, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] === value) return false;
  }
  return true;
}

function findID(surname) {
  let id = "";
  const personnel = Store.getPersonnel();
  personnel.forEach(person => {
    if (person.surname === surname) {
      id = person.id;
    }
  });
  return id;
}

function findAC(el) {
  let ac = "";
  const tds = el.parentElement.parentElement.childNodes;
  tds.forEach(td => {
    if (td.className === "acType border-l") {
      ac = td.textContent;
    }
  });
  return ac;
}

function findCallsign(el) {
  let cs = "";
  const tds = el.parentElement.parentElement.childNodes;
  tds.forEach(td => {
    if (td.className === "cs border-l") {
      cs = td.textContent;
    }
  });
  findSurnameFrom(cs);
  return cs;
}

function findSurname(el) {
  let surname = "";
  const tds = el.parentElement.parentElement.childNodes;
  tds.forEach(td => {
    if (td.className === "surname border-l") {
      surname = td.textContent;
    }
  });
  return surname;
}

function findWx(surname) {
  let wx = "";
  const personnel = Store.getPersonnel();
  personnel.forEach(person => {
    if (person.surname === surname) {
      wx = person.WM;
    }
  });
  return wx;
}

function findSurnameFrom(cs) {
  let crewMember = "";

  const personnel = Store.getPersonnel();
  personnel.forEach(person => {
    if (person.callsign === cs) {
      crewMember = person.surname;

      switch (person.role) {
        case "pilot":
          crewMember += " (Pilot)";
          break;
        case "engineer":
          crewMember += " (Technik pokładowy)";
          break;
        case "navigator":
          crewMember += " (Nawigator pokładowy)";
          break;
        case "gunner":
          crewMember += " (Strzelec pokładowy)";
          break;
        case "medic":
          crewMember += " (Ratownik medyczny)";
          break;
        case "passenger":
          crewMember += " (Pasażer)";
          break;
        case "other":
          crewMember += " (Inny)";
          break;
        default:
          crewMember += " (Funkcja na pokładzie nie została określona)";
          break;
      }
    }
  });
  return crewMember;
}

function findRole(surname) {
  var personRole = "";
  var role = "";
  var roleIndex = 0;

  const personnel = Store.getPersonnel();
  personnel.forEach(person => {
    if (person.surname === surname) {
      role = person.role;
      switch (person.role) {
        case "pilot":
          personRole = "Pilot";
          roleIndex = 1;
          break;
        case "engineer":
          personRole = "Technik pokładowy";
          roleIndex = 2;
          break;
        case "navigator":
          personRole = "Nawigator pokładowy";
          roleIndex = 3;
          break;
        case "gunner":
          personRole = "Strzelec pokładowy";
          roleIndex = 4;
          break;
        case "medic":
          personRole = "Ratownik medyczny";
          roleIndex = 5;
          break;
        case "passenger":
          personRole = "Pasażer";
          roleIndex = 6;
          break;
        case "other":
          personRole = "Inny";
          roleIndex = 7;
          break;
        default:
          personRole = "Funkcja na pokładzie nie została określona";
          roleIndex = 0;
          break;
      }
    }
  });
  return [personRole, roleIndex, role];
}

function findACReg(el) {
  var reg;
  const tds = el.parentElement.parentElement.childNodes;
  tds.forEach(td => {
    if (td.id === "acReg") {
      reg = td.textContent;
    }
  });
  return reg;
}

function findACType(reg) {
  var type = "";
  const aircrafts = Store.getAircrafts();

  aircrafts.forEach((ac, index) => {
    if (ac.reg === reg) {
      type = ac.type;
    }
  });
  return type;
}

var Zindex = 100;
function bringOnTop(obj) {
  getFlightDivsID(obj).each(function(i, block) {
    // console.log(i, block.id)
    if (typeof block.id == "string") {
      block = document.getElementById(block.id);
    }
    block.style.zIndex = Zindex++;
    // console.log("toFront", block.id, block.style.zIndex)
  });
}

function setSelectedIndex(s, v) {
  for (i = 0; i < s.options.length; i++) {
    if (s.options[i].text == v) {
      s.options[i].selected = true;
      return;
    }
  }
}

// function remove(arr, what) {
//     var found = arr.indexOf(what);

//     while (found !== -1) {
//         arr.splice(found, 1);
//         found = arr.indexOf(what);
//     }
// }
