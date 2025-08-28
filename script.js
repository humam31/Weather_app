//http://api.weatherapi.com/v1/current.json?key=653e77347ca44f70a1285747252307&q=Karachi&aqi=no

const temperatureFeild = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener('submit', searchForLocation)

let target = "Lahore";

const fetchResults = async (targetLocation) => {
    const apiKey = "YOUR_API_KEY"; // yahan apna API key daalo
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${targetLocation}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Location not found");
        }

        const data = await res.json();
        console.log(data);

        let locationName = data.name;
        let temp = data.main.temp; // Celsius (units=metric use kia hai)
        let condition = data.weather[0].description;

        // convert timestamp to local time
        let time = new Date(data.dt * 1000).toLocaleString();

        updateDetails(temp, locationName, time, condition);

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Location not found or API issue");
    }
};


    updateDetails(temp, locationName, time, condition)
}



function updateDetails(temp,locationName, time, condition){

    let splitDate = time.split(' ')[0]

    let splitTime = time.split(' ')[1]

    let currentDay = getDayName(new Date(splitDate).getDay());



    temperatureFeild.innerText = temp
    locationField.innerText = locationName
    dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition



}

function searchForLocation(e){
    e.preventDefault()
    
    target = searchField.value

    fetchResults(target)

}

fetchResults(target);

function getDayName(number){
switch(number){

    case 0:
    return 'Sunday';

     case 1:
    return 'Monday';

     case 2:
    return 'Tuesday';

     case 3:
    return 'Wednesday';

     case 4:
    return 'Thursday';

     case 5:
    return 'Friday';

     case 6:
    return 'Saturday';
}




}
