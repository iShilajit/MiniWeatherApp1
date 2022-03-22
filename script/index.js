const showdata = document.getElementById("showdata");

let apikey = `05acdfed366347794422468e39b7f11f`;

const search = document.getElementById("search");
search.addEventListener("click", (event) => {
    event.preventDefault();
    getWeatherData(apikey);
})

const getWeatherData = async (apikey) => {
    console.log("ok");
    // console.log(apikey)
    try {
        
        let input = document.getElementById("weathersearch").value;
        if(input===""){
            alert("Plase enter a city name");
        }
        else{
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apikey}&units=metric`);
            let data = await res.json();
            console.log("data:", data)
            appendData(data)
        }
      
    } catch (error) {
       
        console.log("error:", error);
        
    }
}

const appendData=(data)=>{
    console.log("appdata",data)
    showdata.innerHTML="";
    let container = document.createElement("div");
    container.setAttribute("class","container");

    let info = document.createElement("div");
    info.setAttribute("class","info");

    let emap = document.createElement("div");
    emap.setAttribute("class","emap");


    let cityname = document.createElement("h2");
    cityname.innerText=`City Name:${data.name}`;

    let tem = document.createElement("h2");
    tem.innerText = `Temperature:${data.main.temp}°C`;

    let min = document.createElement("h2");
    min.innerText = `Minimum:${data.main.temp_min}°C`;
    let max = document.createElement("h2");
    max.innerText = `Maximum:${data.main.temp_max}°C`;

    let pr = document.createElement("h2");
    pr.innerText = `Pressure:${data.main.pressure}`;

    let hum = document.createElement("h2");
    hum.innerText = `Humudity:${data.main.humidity}`;

    let wind = document.createElement("h2");
    wind.innerText = `Wind:${data.wind.speed} m/s`;

    let cloud = document.createElement("h2");
    cloud.innerText = `Clouds:${data.clouds.all} %`;

    let sunrisediv = document.createElement("div");
    sunrisediv.setAttribute("class","sundiv");
    let riseimg = document.createElement("img");
    
    riseimg.src="./assets/sunrise.png";
    let sunrise = document.createElement("h2");
    sunrise.innerText = `Sunrise:${data.sys.sunrise} `;

    sunrisediv.append(riseimg,sunrise);


    let sunsetdiv = document.createElement("div");
    sunsetdiv.setAttribute("class","sundiv");
    let sunset = document.createElement("h2");
    let setimg = document.createElement("img");
    setimg.src="./assets/sunset.png";
    sunset.innerText = `Sunset:${data.sys.sunset} `;
    sunsetdiv.append(setimg,sunset);

    let iframe = document.createElement("iframe");
    iframe.src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    iframe.height=`400px`;
    iframe.width=`500px`;
    emap.append(iframe)

    info.append(cityname,tem,min,max,pr,hum,wind,cloud,sunrisediv,sunsetdiv)
    container.append(info,emap);
    showdata.append(container);

}