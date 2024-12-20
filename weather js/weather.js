var firstDayName = document.querySelector("#firstDayName");
var firstDayNum = document.querySelector("#firstDayNum");
var firstMonthName = document.querySelector("#firstMonthName");
var firstDayLocation = document.querySelector("#firstDayLocation");
var firstDayTemp = document.querySelector("#firstDayTemp");
var fisrtDayImg = document.querySelector("#fisrtDayImg")
var firstDayConditionText = document.querySelector("#firstDayConditionText");
var umberellaNum = document.querySelector("#umberellaNum");
var windNum = document.querySelector("#windNum");
var copmassNum = document.querySelector("#compassNum");
var secDayName = document.querySelector("#secDayName");
var secDayImg = document.querySelector("#secDayImg");
var secMaxTemp = document.querySelector("#secMaxTemp");
var secMinTemp = document.querySelector("#secMinTemp");
var secDayConditionText = document.querySelector("#secDayConditionText");
var thrdDayName = document.querySelector("#thrdDayName");
var thrdDayImg = document.querySelector("#thrdDayImg");
var thrdMaxTemp = document.querySelector("#thrdMaxTemp");
var thrdMinTemp = document.querySelector("#thrdMinTemp");
var thrdDayConditionText = document.querySelector("#thrdDayConditionText");



navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords);

    let myLatitude = position.coords.latitude;
    let myLongitude = position.coords.longitude;
    weatherData(`${myLatitude},${myLongitude}`)
})

async function weatherData(query) {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5efcc268a8d0416199c212141241612&q=${query}&days=3&aqi=no&alerts=no`)
    let data = await res.json();
    console.log(data);
    displayFirstDay(data);
    displaysecondDay(data);
    displayThirdDay(data);
}

function displayFirstDay(data) {
    let firstDate = data.current.last_updated;

    let myDateName = new Date(firstDate);

    let todayName = myDateName.toLocaleString('en-us', {
        weekday: 'long'
    })
    firstDayName.innerHTML = todayName

    let theMonth = myDateName.toLocaleString('en-us', {
        month: 'long'
    })
    firstMonthName.innerHTML = theMonth

    let todayNum = myDateName.getDate();
    firstDayNum.innerHTML = todayNum

    firstDayLocation.innerHTML = data.location.name;
    firstDayTemp.innerHTML = data.current.temp_c;

    firstDayConditionText.innerHTML = data.current.condition.text;

    let firstImg = data.current.condition.icon;
    let firstSrc = `https:${firstImg}`;
    fisrtDayImg.setAttribute('src', firstSrc)

    umberellaNum.innerHTML = data.current.humidity;
    windNum.innerHTML = data.current.wind_kph;
    copmassNum.innerHTML = data.current.wind_dir;
}

function displaysecondDay(data) {
    let secDate = data.forecast.forecastday[1];
    console.log(secDate);

    let secondDate = new Date(secDate.date);

    let secondDayName = secondDate.toLocaleString("en-us" , {weekday:'long'})
    secDayName.innerHTML = secondDayName

    let secImg = secDate.day.condition.icon;
    let secSrc = `https:${secImg}`;
    secDayImg.setAttribute('src' , secSrc);

    secMaxTemp.innerHTML = secDate.day.maxtemp_c;
    secMinTemp.innerHTML = secDate.day.mintemp_c;

    secDayConditionText.innerHTML = secDate.day.condition.text;
}

function displayThirdDay(data) {
    let thrdDate = data.forecast.forecastday[2];
    console.log(thrdDate);

    let thirdDate = new Date(thrdDate.date);

    let thirdDayName = thirdDate.toLocaleString("en-us" , {weekday: 'long'});
    thrdDayName.innerHTML = thirdDayName


    let thirdImg = thrdDate.day.condition.icon;
    let thirdsrc = `https:${thirdImg}`;
    thrdDayImg.setAttribute('src' , thirdsrc);

    thrdMaxTemp.innerHTML = thrdDate.day.maxtemp_c;
    thrdMinTemp.innerHTML = thrdDate.day.mintemp_c;

    thrdDayConditionText.innerHTML = thrdDate.day.condition.text;
}