try{
    let searchinput=document.getElementById("search");
    let searchbutton=document.getElementById("btnsearch");
    let location=document.getElementById("location");
    let weathertype=document.getElementById("type");
    let celicus=document.getElementById("celcius");
    let humidityval=document.getElementById("humidityval");
    let windval=document.getElementById("windval");
    let img=document.getElementsByClassName("img-container")[0];
    let body=document.getElementsByClassName("body-container")[0]
    let item1=document.getElementsByClassName("item1")[0]
    let item2=document.getElementsByClassName("item2")[0]
    let head=document.getElementsByClassName("head-container")[0]
    let nightbutton=document.getElementById("btnnight");

    body.style.display="none";

    searchbutton.addEventListener("click",()=>{
        let city=searchinput.value;    
        if (city!="") 
        {     
            body.style.display="block";
            body.style.textAlign="center"

            async function getWeather() {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=87d4273445d32b62e001eea734d89084&units=metric`);
                const response2 = await response.json();
                if(response.ok){
                    console.log("Fetching details...")
                    location.innerHTML=response2.name;
                    windval.innerHTML=response2.wind.speed;
                    humidityval.innerHTML=response2.main.humidity;
                    celicus.innerHTML=`${response2.main.temp} &deg;C`;
                    weathertype.innerHTML=response2.weather[0].main;
                    if(weathertype.innerHTML=="Clouds"){
                        img.style.backgroundImage = "url('./asset/clouds.gif')";
                    }
                    else if(weathertype.innerHTML=="Clody" || weathertype.innerHTML=="Mist"){
                        img.style.backgroundImage = "url('./asset/cloudy.gif')";
                    }
                    else if(weathertype.innerHTML=="Rain"){
                        img.style.backgroundImage = "url('./asset/umbrella.gif')";
                    }
                    else if(weathertype.innerHTML=="Clear"){
                        img.style.backgroundImage = "url('./asset/sun.gif')";
                    }
                    else if(weathertype.innerHTML=="Thunderstorm"){
                        img.style.backgroundImage = "url('./asset/storm.gif')";
                    }
                }
                else{
                    item1.style.display="none"
                    item2.style.display="none"
                    body.innerHTML=response.status+"\t\tUnable to fetch details..."; 
                }
            }
            getWeather()
        }
        else{
            body.style.display="block";
            body.style.textAlign="center"
            body.innerHTML="Please enter city name";
        }
    })

    nightbutton.addEventListener("click",()=>{
        if (nightbutton.innerHTML === `<i class="fa-solid fa-moon"></i>`) {
            nightbutton.innerHTML = `<i class="fa-solid fa-sun"></i>`;
          } 
        else{
            nightbutton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
          }
        document.body.classList.toggle("dark-mode");
        head.classList.toggle("head-mode");
    })
}
catch{
    body.innerHTML="Something Wrong happened..."
}