 // api.openweathermap.org/data/2.5/weather?q=London&appid=16be5034253e79ee7c3745dc69157f91&units=metric
 //https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg

const form=document.querySelector(".top-banner form");
const input=document.querySelector(".top-banner input");
const button=document.querySelector(".top-banner button");
const msg=document.querySelector(".top-banner .msg");
const list=document.querySelector(".cities");
const apiKey="16be5034253e79ee7c3745dc69157f91"
button.addEventListener("click", event=>{
    event.preventDefault();
    const inputVal=input.value;
    input.value="";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`)
    .then(reponse=> reponse=reponse.json())
    .then(data=>{
        const {main,name,sys,weather}=data;
        const icon=`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
        const li=document.createElement("li");
        const markup=`
        <h2 class='city-name' city-property=${name},${sys.country}>
        <span>${name}</span>
        <span>${sys.country}</span>
        </h2>
        <div class='city-temp'>${Math.round(main.temp)}</div>
        <figure>
            <img class='city-icon' src='${icon}' alt='${weather[0]["description"]}'>
            <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
        `
        li.classList="city";
        li.innerHTML=markup;
        list.appendChild(li);
        msg.innerText="";
    })
    .catch(input.value==""?msg.innerText="please enter a valid city":null)

})