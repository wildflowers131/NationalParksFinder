'use strict';

const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length & i < maxResults; i++){
    // for each object in the data
    //array, add a list item to the results 
    //list with the full name, description,
    //and website url.
    $('#results-list').append(
      `<li><h3><a href='${responseJson.data[i].url}'>${responseJson.data[i].fullName}</a></h3>
      <p>${responseJson.data[i].description}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParks(states, maxResults) {
  const apiKey = 'GUuTJYDNOwyAPCw0uT46AvvoeujZylepH8dHaUWj';

  const params = {
    'stateCode': states,
    'limit': maxResults,
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString + '&api_key=' + apiKey;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const states = $('#js-search-states').val();
    const maxResults = $('#js-max-results').val();
    getParks(states, maxResults);
  });
}

$(watchForm);