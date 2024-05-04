const button = document.querySelector('.svg-div');
const inputBox = document.querySelector('input');
const ip_location = document.querySelector('#location');
const ip_value = document.querySelector('#address');
const time = document.querySelector('#timezone');
const isp = document.querySelector('#isp');

const geo_key = 'at_jG8J7upB8w1CTvzpCPg4RMWnSIGvs';
const ipdata_key = '295025712ec65b77bdf4f7f36a2a2fc1f9b66d63c30de09684618cb7'

let ip_address = '';

let map = L.map("map", {center: [0, 0], zoom: 15});
leaflet.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {maxZoom: 16,subdomains: ['mt0', 'mt1', 'mt2', 'mt3']}).addTo(map);       
            
            
fetch(`https://api.ipdata.co/?api-key=` + ipdata_key,
  {
    headers: {
      Accept: 'application/json',
    }
  })
  .then(response => response.json())
  .then( (data) => {
    ip_address = data.ip;
    console.log(ip_address);
    getData();
  })
  .catch(err => console.log('something went wrong'));
  

function getData() {
  fetch("https://geo.ipify.org/api/v1?apiKey=" + geo_key + "&ipAddress=" + ip_address)
    
    .then(json => json.json())
    .then( (pos) => {
      map.setView([pos.location.lat, pos.location.lng], 13)
      var locationIcon = L.icon({
    iconUrl: 'images/icon-location.svg',

    /*iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
*/});

      var marker = L.marker([pos.location.lat, pos.location.lng], {icon: locationIcon}).addTo(map);
      showDetails(pos)
      console.log(pos)
    })
}


button.addEventListener('click', () => {
  
  ip_address = inputBox.value;
  
  fetch("https://geo.ipify.org/api/v1?apiKey=" + geo_key + "&ipAddress=" + ip_address)
    
    .then(response => response.json())
    .then((data) => {
      map.setView([data.location.lat, data.location.lng], 13)
      var marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
      console.log(data);
      showDetails(data);
    })
    .catch(err => console.log('Something went wrong'));
  
})

function showDetails(data) {
  ip_value.innerText = data.ip;
  
  ip_location.innerText = data.location.city + ', ' + data.location.region + ' ' + data.location.postalCode;
  
  timezone.innerText = 'UTC ' + data.location.timezone
  
  isp.innerText = data.isp;
}

