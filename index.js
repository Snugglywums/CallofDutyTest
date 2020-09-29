'use strict';

const searchUrl = 'https://call-of-duty-modern-warfare.p.rapidapi.com/multiplayer/'


// function for homescreenHTML
function loadStart(){
    $('main').attr('id')
    $('main').html(`
<section>
    <div class="group">
       <div class="item">
            <form class="user">
               <h3 id="userName">Enter Your User Name</h3>
               <input type="search" id="mySearch" required>
               <h3> Select Platform </h3>
                    <select  id= "platform">
                        <option value = "battle" selected>Battle Net</option>
                        <option value = "steam">Steam</option>
                        <option value = "xbl">Xbox</option>
                        <option value = "psn">Playstation</option>
                    </select>
             </form>
       </div>
        <div class="item">
            <form class="friend">
                <h3 id="friendName">Enter Your Friend's User Name</h3>
                <input type="search" id="mySearchFriend" required>
                    <h3> Select Platform </h3>
                        <select id = "platformfriend">
                            <option value = "battle" selected>Battle Net</option>
                            <option value = "steam">Steam</option>
                            <option value = "xbl">Xbox</option>
                            <option value = "psn">Playstation</option>
                    </select>
            </form>
        </div>
    </div>
        <div class = "submitbutton">
            <input type="submit" id="mySearchButton" value="submit" onClick="return empty()">
        </div>
</section>
`)
}

//function for results screen HTML
function resultsHTML(){
    showSpinner();
    $('.heading').hide();
    $('main').html(`    
<section>
 <h1>Results</h1>
 <h2>Click one of the stats below to compare</h2>
    <div class="group">
       <div class="item">
            <form class="user">
              <section id="results">
                     <ul id="results-list">
                        <div class="tab">
                            <button class="userlinks" onclick="openTab(event, 'Player Stats')" id="defaultOpen">Player Stats</button>
                            <button class="userlinks" onclick="openTab(event, 'Game Stats')">Game Stats</button>
                            <button class="userlinks" onclick="openTab(event, 'Weapon Stats')">Weapon Stats</button> 
                        </div>               
                     </ul>
               </section>
             </form>
      </div>
         <div class="item">
               <form class="friend">
                   <section id="results-friend">
                     <ul id="results-list-friend">
                        <div class="tab">
                            <button class="tablinks2" onclick="openTabFriend(event, 'Player Stats2')" id="defaultOpen">Player Stats</button>
                            <button class="tablinks2" onclick="openTabFriend(event, 'Game Stats2')">Game Stats</button>
                            <button class="tablinks2" onclick="openTabFriend(event, 'Weapon Stats2')">Weapon Stats</button>
                        </div>
                    </ul>
                   </section>
               </form>
         </div>
      </div>
    <div class = "submitbutton">
        <button type="button" id="restart-btn"> Try Again </button>
    </div>
`)
}

//function for loader spinner
const spinner = document.getElementById("spinner");
function showSpinner() {
  spinner.className = "show";
  setTimeout(() => {spinner.className = spinner.className.replace("show", "")}, 5000);
}
function hideSpinner() {
  spinner.className = spinner.className.replace("show", "");
}

//function to get the user name
function getUserbyId(){
    
    let gamerTag = document.getElementById("mySearch").value;
    let re = /#/gi;
    let newGamerTag =gamerTag.replace(re, "%2523");
    let platform = document.getElementById("platform").value;
  
  const url = searchUrl  + newGamerTag + '/' + platform;

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
            "x-rapidapi-key": "07eac59be6msh033adcb81dfbd8ap1cd261jsn2c313c93b433"
        }
    })
    .then(response => response.json())
    .then(response => 
    displayResults(response))
    .catch(error => alert('User was not found or platform was incorrect, please try again.'));

};

//function to display results for user
  function displayResults(response) {
    console.log(response);
    let dataProperties = response.lifetime.all.properties
    let sumAR = response.lifetime.itemData.weapon_assault_rifle
    let sumSMG = response.lifetime.itemData.weapon_smg
    let sumSG =  response.lifetime.itemData.weapon_shotgun
    let sumSN = response.lifetime.itemData.weapon_sniper
    let sumP = response.lifetime.itemData.weapon_pistol
    let sumLMG = response.lifetime.itemData.weapon_lmg
   
    $('#results-list').append(
`<h3>${response.username}</h3>
    <div id="Player Stats" class="userTab">
         <li>Level: ${response.level}</li>
        <li>Accuracy: ${dataProperties.accuracy}</li>
        <li>K/D Ratio: ${dataProperties.kdRatio}</li>
        <li>Kills: ${dataProperties.kills}</li>
        <li>Deaths: ${dataProperties.deaths}</li>
        <li>Headshots: ${dataProperties.headshots}</li>
        <li>Misses: ${dataProperties.misses}</li>
    </div>
    <div id="Game Stats" class="userTab">
        <li>Games Played: ${dataProperties.gamesPlayed}</li>
        <li>Wins: ${response.lifetime.all.properties.wins}</li>
        <li>Wins loss Ratio: ${dataProperties.wlRatio}</li>
        <li>Longest Win Streak: ${dataProperties.recordLongestWinStreak}</li>
        <li>Most Kills in a Match: ${dataProperties.recordKillsInAMatch}</li>
        <li>Highest Kill Streak: ${dataProperties.recordKillStreak}</li>
        <li>Suicides: ${dataProperties.suicides}</li>
    </div>
    <div id="Weapon Stats" class="userTab">
        <li> Assault Rifle Kills: ${shallowIterator(sumAR)}</li>
        <li> SMG Kills: ${shallowIterator(sumSMG)}</li>
        <li> LMG Kills: ${shallowIterator(sumLMG)}</li>
        <li> Shotgun Kills: ${shallowIterator(sumSG)}</li>
        <li> Sniper Rifle Kills: ${shallowIterator(sumSN)}</li>
        <li> Pistol Kills: ${shallowIterator(sumP)}</li>
    </div>
        `  )
 };


//function to get friend's user name
function getFriendUserbyId(){
    
    let gamerTagFriend = document.getElementById("mySearchFriend").value;
    let re = /#/gi;
    let newGamerTagFriend =gamerTagFriend.replace(re, "%2523");
    let platformFriend = document.getElementById("platformfriend").value;
    
    const url = searchUrl  + newGamerTagFriend + '/' + platformFriend;
    const dataHeader = {
        "method": "Get",
        "headers":{
            "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
            "x-rapidapi-key": "4f73f6c31fmshcd3619c19341d56p122b48jsn0b9f0f427edc",
             }
        }

    fetch(url,dataHeader)
    .then(response => response.json())
    .then(responseJson => 
    displayResultsFriend(responseJson))
    .catch(error => alert('User was not found or platform was incorrect, please try again.'));

}

//function to get to the certain properties in the response needed
function shallowIterator(target) {
    let killTotal = [];
    for (const key in target) {
        if (typeof target[key] === 'object') {
            for (const nestedKey in target[key]) {
                killTotal.push(target[key][nestedKey].kills)
            }
        } else {
        console.log(target[key]);
        }
    }
    return killTotal.reduce(function (arg1, arg2) {
        return +arg1 + +arg2;
    }, []);
}

//function to display friend user results
function displayResultsFriend(responseJson) {
    
    let dataProperties = responseJson.lifetime.all.properties
    let sumAR = responseJson.lifetime.itemData.weapon_assault_rifle
    let sumSMG = responseJson.lifetime.itemData.weapon_smg
    let sumSG =  responseJson.lifetime.itemData.weapon_shotgun
    let sumSN = responseJson.lifetime.itemData.weapon_sniper
    let sumP = responseJson.lifetime.itemData.weapon_pistol
    let sumLMG = responseJson.lifetime.itemData.weapon_lmg

   $('#results-list-friend').append(
        `<h3>${responseJson.username}</h3>
<div id="Player Stats2" class="friendTab">
    <li>Level: ${responseJson.level}</li>
    <li>Accuracy: ${dataProperties.accuracy}</li>
    <li>K/D Ratio: ${dataProperties.kdRatio}</li>
    <li>Kills: ${dataProperties.kills}</li>
    <li>Deaths: ${dataProperties.deaths}</li>
    <li>Headshots: ${dataProperties.headshots}</li>
    <li>Misses: ${dataProperties.misses}</li>
</div>
<div id="Game Stats2" class="friendTab">
    <li>Games Played: ${dataProperties.gamesPlayed}</li>
    <li>Wins: ${responseJson.lifetime.all.properties.wins}</li>
    <li>Wins loss Ratio: ${dataProperties.wlRatio}</li>
    <li>Longest Win Streak: ${dataProperties.recordLongestWinStreak}</li>
    <li>Most Kills in a Match: ${dataProperties.recordKillsInAMatch}</li>
    <li>Highest Kill Streak: ${dataProperties.recordKillStreak}</li>
    <li>Suicides: ${dataProperties.suicides}</li>
</div>
<div id="Weapon Stats2" class="friendTab">
<li> Assault Rifle Kills: ${shallowIterator(sumAR)}</li>
<li> SMG Kills: ${shallowIterator(sumSMG)}</li>
<li> LMG Kills: ${shallowIterator(sumLMG)}</li>
<li> Shotgun Kills: ${shallowIterator(sumSG)}</li>
<li> Sniper Rifle Kills: ${shallowIterator(sumSN)}</li>
<li> Pistol Kills: ${shallowIterator(sumP)}</li>
</div>
        `   
    )     
};

//function to hide other tabs once clicked for user results

function openTab(event, tabName) {
     
  event.preventDefault();
   let i, userTab, userlinks;
   
    userTab = document.getElementsByClassName("userTab");
   for (i = 0; i < userTab.length; i++) {
        userTab[i].style.display = "none";
    };

     userlinks = document.getElementsByClassName("userlinks");
     for (i = 0; i < userlinks.length; i++) {
          userlinks[i].className = userlinks[i].className.replace(" active", "");
    };
       
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";

};

//function to hide other tabs for friend results
function openTabFriend(event, tabName){
    event.preventDefault();
    let i, friendTab;

    friendTab = document.getElementsByClassName("friendTab");
    for (i = 0; i < friendTab.length; i++) {
        friendTab[i].style.display = "none";
   };

  document.getElementById(tabName).style.display = "block";
   
};

//function to handle restart click
function restartClick() {
    $('body').on('click', '#restart-btn', function(){
      location.reload();   
   });
};

//function to make sure user submits a user name in the fields
function empty(){
    let userSearch;
    let friendSearch;

    userSearch = document.getElementById("mySearch").value;
    friendSearch = document.getElementById("mySearchFriend").value;

    if (userSearch ==="" && friendSearch ===""){
        alert("Please Enter A User Name");
        return false;
    }

    else{
        showSpinner();
        hideSpinner();
        getUserbyId();
        getFriendUserbyId();
        $('main').html(resultsHTML());     
            }
        };


    $(function() {
        console.log('App loaded! Waiting for submit!');
        loadStart();
        restartClick();
      });

