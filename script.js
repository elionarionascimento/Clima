document.querySelector('.busca').addEventListener('submit', async (Event)=>{
    Event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}
        &appid=258624788c3401bfe702209ae85c54bc&units=metric&lang=pt_br`

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            showWarning("Não encontrado")
        }
    }

})


function showInfo(json){
    showWarning('');

    document.querySelector('.resultado').style.display = 'block'

    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km</span>`

    document.querySelector('.temo img').setAttribute('src', `http://openweathermap.org/img/wn/${json,tempIcon}@2x.png`)
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}