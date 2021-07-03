var top5ContainerEl = document.querySelector(".top-five-container")
var twitterFeedgitContainerEl = document.querySelector(".twitter-feed-section")

var CryptoCompareAPIKey = "47c595746df319744dafc11abb6db295cfe1ca9e302bec40e6c5a038f1a494da";
// //Coin Pakrika API #2
// fetch("https://api.coinlore.net/api/tickers/?start=100&limit=100")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//    console.log(data);
//   });
// //Coin Pakrika API #2
//   fetch("https://api.coinlore.net/api/coin/markets/?id=90")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//    console.log(data);
//   });

//   ///Redit API
//   fetch("https://dashboard.nbshare.io/api/v1/apps/reddit")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//    console.log(data);
//   });

    ///Crypto Cpmare API
    // fetch("https://min-api.cryptocompare.com/data/all/coinlist")
    // .then(function (response) {
    //   return response.json();
    // })
    // .then(function (data) {
    //  console.log(data);
    // });
 




//  function fetchCoinTwitterFollowers(coinId){
//   var apiURL = `https://min-api.cryptocompare.com/data/social/coin/latest?coinId=${coinId}&apikey=${CryptoCompareAPIKey}`
//  console.log("fetchCoinTwitterFollowers URL ", coinId,  apiURL)

//   fetch(apiURL)
//   .then(function (response) {
//     console.log(response.body)
//     return response.json();
//   })
//   .then(function (data) {
//       console.log("fetchCoinTwitterFollowers: ", data)
//      return data;
//   });
// }



function fetchCoinTwitterFollowers(coinId){
  var apiURL = `https://min-api.cryptocompare.com/data/social/coin/latest?coinId=${coinId}&apikey=${CryptoCompareAPIKey}`
  var apiUrl = https://min-api.cryptocompare.com/data/social/coin/latest?coinId=5324&apikey=47c595746df319744dafc11abb6db295cfe1ca9e302bec40e6c5a038f1a494da"
 console.log("fetchCoinTwitterFollowers URL ", coinId,  apiURL)

  $.get(apiURL, function(data,status){
      console.log(status)
      console.log(data)
  })

}

/******************************************************************
 * Funtion : convertToUSDollars(number)
 * Description: 
 *  1. Use number passed in as a parameter and returns a value 
 *     formated as of US Dollars
 *****************************************************************/
var convertToUSDollars = function(number){
  var options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }
  return number.toLocaleString("en-US", options);
}
/******************************************************************
 * Funtion : convertToPrecent(number)
 * Description: 
 *  1. Use number passed in as a parameter and returns a value 
 *     formated as a precentage of 2 places.   
 *****************************************************************/

var convertToPrecent = function(number){
  return(parseFloat(number).toFixed(2)+"%");
}

/***************************************************************************************************
 *  Function : buildTopFiveSection(data)
 *  Description: 
 *        1. Receives data from endpoint: /min-api.cryptocompare.com/data/top/totaltoptiervolfull
 *        2. Loop through the array 5 times to retrieve relevant data to build out the top 5 section
 *        3. Display section on the page
 **********************************************************************************************/
var  buildTopFiveSection = function(data) {
  console.log("buildTopFiveSection: ", data)
  var dataArray = data.Data; 
  for(const[index,item] of dataArray.entries()) {
 // for(var i=0; i<5; i++){
    var coinId = dataArray[index].CoinInfo.Id;
    var tickerName = dataArray[index].CoinInfo.Name;
    var toSymbol = dataArray[index].RAW.USD.TOSYMBOL;
    var price = dataArray[index].RAW.USD.PRICE;
    var change24HourPct = dataArray[index].RAW.USD.CHANGEPCT24HOUR;
    var changeHourPct =dataArray[index].RAW.USD.CHANGEPCTHOUR;

    console.log("buildTopFiveSection: " , index,coinId, tickerName, toSymbol, price, change24HourPct, change24HourPct)
    var twitterFeedData = fetchCoinTwitterFollowers(coinId);
    console.log("buildTopFiveSection: TWEET " , twitterFeedData)
    
    var cryptoCard = 
        `
          <div class="crypto-card w-56 shadow rounded bg-gray-50 rounded-md shadow-lg">
            <p class="ticker-name font-semibold text-blue-600 text-center bg-purple-100 rounded-t-md">
                ${tickerName}/${toSymbol}
            </p>
            <div class= "card-txt py-2 pl-4 font-light">
              <p><span class = "label">Price:</span> ${convertToUSDollars(price)}</p>
              <p><span class = "label">24-HR Price Change:</span> ${convertToPrecent(change24HourPct)}</p>
              <p><span class = "label">1-HR Price Change:</span> ${convertToPrecent(changeHourPct)}</p>
              <p><span class = "label">Twitter followers:</span> 414355</p>
              <p><span class = "label">Sentiment:</span> Sentiment</p>
            </div>
         </div>
        `
        top5ContainerEl.innerHTML += cryptoCard
        if(index >= 4) break;
  }
  
}

/************************************************************************
 * Function: fetchCryptoCompareTopList()
 * Description: 
 *      1. Fetch the top 10 Crypo Currency at the time the data is
 *         requested.
 *      2. Calls buildTopFiveSection passing the data retrieved from 
 *         the api call
 ***********************************************************************/

var fetchCryptoCompareTopList= function() {
  var limit = 10;
  var tsym = "USD";
  var apiURL = `https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=${limit}&tsym=${tsym}&apikey=${CryptoCompareAPIKey}`

  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      buildTopFiveSection(data);
    });
}


/************************************************************************
 * Function : loadPage()
 * Description: Initial function called to initally load the page
 ************************************************************************/
var loadPage = function(){
  fetchCryptoCompareTopList();

}



//function called on page load
loadPage();
