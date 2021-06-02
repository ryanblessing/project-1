var currentInfo = {
	options: ['restaurant', 'bar',]
}


getModalInputInfo = () => {
	//store input values into vraiables
	var name = $('input[type="text"]').val();
	var email = $('input[type="email"]').val();
	

	//turn variables into objects
	var currentInfo = {
		name: name,
		email: email,
		options: ['restaurant', 'bar']
	}

	saveAboutYou(currentInfo)
	
}

saveAboutYou = (currentInfo) => {
	//create array
	var aboutYouInfo = [];

	// add form information to array
	aboutYouInfo.push(currentInfo);

	//save newest information to local storage
	localStorage.setItem('about-you', JSON.stringify(aboutYouInfo));

	// initMap(currentInfo);
}



clearScreen = () => {
	$('.practice').remove();
}

// map of activiteies pulls up 
let map;
let service;
let infowindow;

var request;
var marker = [];

initMap = () => {
	map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 36.1627, lng: -86.7816 },
    zoom: 12,
  });

  request = {
	  location: { lat: 36.1627, lng: -86.7816 },
	  radius: 5000,
	  keyword: currentInfo.options,
	  openNow: 'true',
	  rankby: 'prominence'
  }

  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, placeMarkersOnMap);

  google.maps.event.addListener(map, 'rightclick', (e) => {
	  map.setCenter(e.latLng);
	  clearResults(markers);

	  var request = {
		  location: e.latLng,
		  radius: 5000,
		  keyword: currentInfo.options
	  }
	  service.nearbySearch(request, placeMarkersOnMap);
  })
  infowindow = new google.maps.InfoWindow();
}

createCardsFromApi = (results) => {
	console.log(results);

	//create container to hold all cards
	restaurantContainer = document.createElement('div');
	restaurantContainer.classList = 'practice';
	$('#results').append(restaurantContainer);

	for(i = 0; i < currentInfo.options.length; i++) {
		
		for(k = 0; k < results.length; k++) {

			for(m = 0; m < results[k].types.length; m++) {

				if(results[k].types[m] == currentInfo.options[i]) {
					console.log(results[k].types[m]);
					
					var card = document.createElement('div');
						$(card).addClass('card columns').appendTo('#results')

					var cardContent = document.createElement('div');
						$(cardContent).addClass('card-content').appendTo(card)

					var cardTitle = document.createElement('p')
						$(cardTitle).addClass('title')
						.html(results[k].name);

					var cardDetail = document.createElement('p')
						$(cardDetail).addClass('subtitle')
						.html(results[k].vicinity);
						cardContent.append(cardTitle, cardDetail)
					break;
				}
			}
			break;	
		}
	}

	// getModalInputInfo();
}

placeMarkersOnMap = (results, status) => {

	if(status == google.maps.places.PlacesServiceStatus.OK) {
		for(i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
		createCardsFromApi(results);
	}
	
}

createMarker = (place) => {

	marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});
	
	google.maps.event.addListener(marker, 'click', (e) => {
		infowindow.setContent(place.name);
		infowindow.setPosition(e.latLng);
    	infowindow.open(map);
	});
}

// when you click get started button
// about you modal pops up



// ACTIVITES
// after fill out the form and hit save
// activities page shows up
// select the options that are given






// REVIEWS
// list out the options that were selected in the activities page


// RESULTS
// shows a map
// recommend places to go



// CONTACT US


// NAVBAR-BURGER
// directs to its page when clicked




class BulmaModal {
	constructor(selector) {
		this.elem = document.querySelector(selector)
		this.close_data()
	}
	
	show() {
		this.elem.classList.toggle('is-active')
		this.on_show()
	}
	
	close() {
		this.elem.classList.toggle('is-active')
		this.on_close()
	}
	
	close_data() {
		var modalClose = this.elem.querySelectorAll("[data-bulma-modal='close'], .modal-background")
		var that = this
		modalClose.forEach(function(e) {
			e.addEventListener("click", function() {
				
				that.elem.classList.toggle('is-active')

				var event = new Event('modal:close')

				that.elem.dispatchEvent(event);
			})
		})
	}
	
	on_show() {
		var event = new Event('modal:show')
	
		this.elem.dispatchEvent(event);
	}
	
	on_close() {
		var event = new Event('modal:close')
	
		this.elem.dispatchEvent(event);
	}
	
	addEventListener(event, callback) {
		this.elem.addEventListener(event, callback)
	}
}

var btn = document.querySelector("#btn")
var mdl = new BulmaModal("#myModal")

btn.addEventListener("click", function () {
	mdl.show()
})

mdl.addEventListener('modal:show', function() {
	console.log("opened")
})

mdl.addEventListener("modal:close", function() {
	console.log("closed")
})
