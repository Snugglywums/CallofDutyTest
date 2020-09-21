'use strict';

const searchUrl = 'https://call-of-duty-modern-warfare.p.rapidapi.com/multiplayer/'


// function for homescreenHTML
function homeScreenHTML(){
    return`  
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
`
}

//function for results screen HTML
function resultsHTML(){
    $('.heading').hide();
 return`   <section>
 <h1>Results</h1>
    <div class="group">
        <div class="item">
            <section id="results" class="user">
                <div class="btn-container" id="results-list">
                    <button class="tab-btn active" data-id="player-stats">Player Stats</button>
                    <button class="tab-btn" data-id="game-stats">Game Stats</button>
                    <button class="tab-btn" data-d="weapon-stats">Weapon Stats</button> 
                </div>
            </section>
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
`
}

function formatQueryParams(params) {
 const queryItems = Object.keys(params)
 .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
 console.log(queryItems)
return queryItems.join('/');
}

//function to get the user name
function getUserbyId(){
    
    let gamerTag = document.getElementById("mySearch").value;
    let re = /#/gi;
    let newGamerTag =gamerTag.replace(re, "%2523");
    let platform = document.getElementById("platform").value;

  const url = searchUrl  + newGamerTag + '/' + platform;
  console.log(url);

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

    let sumAR =  response.lifetime.itemData.weapon_assault_rifle.iw8_ar_akilo47.properties.kills
    + response.lifetime.itemData.weapon_assault_rifle.iw8_ar_anovember94.properties.kills
    + response.lifetime.itemData.weapon_assault_rifle.iw8_ar_asierra12.properties.kills
    + response.lifetime.itemData.weapon_assault_rifle.iw8_ar_falima.properties.kills
    + response.lifetime.itemData.weapon_assault_rifle.iw8_ar_falpha.properties.kills
    + response.lifetime.itemData.weapon_assault_rifle.iw8_ar_galima.properties.kills
    + response.lifetime.itemData.weapon_assault_rifle.iw8_ar_kilo433.properties.kills
    + response.lifetime.itemData.weapon_assault_rifle.iw8_ar_mcharlie.properties.kills
    + response.lifetime.itemData.weapon_assault_rifle.iw8_ar_mike4.properties.kills
    + response.lifetime.itemData.weapon_assault_rifle.iw8_ar_scharlie.properties.kills
    + response.lifetime.itemData.weapon_assault_rifle.iw8_ar_sierra552.properties.kills
    + response.lifetime.itemData.weapon_assault_rifle.iw8_ar_tango21.properties.kills;
 
    let sumSMG = response.lifetime.itemData.weapon_smg.iw8_sm_augolf.properties.kills
    + response.lifetime.itemData.weapon_smg.iw8_sm_beta.properties.kills
    + response.lifetime.itemData.weapon_smg.iw8_sm_charlie9.properties.kills
    + response.lifetime.itemData.weapon_smg.iw8_sm_mpapa5.properties.kills
    + response.lifetime.itemData.weapon_smg.iw8_sm_mpapa7.properties.kills
    + response.lifetime.itemData.weapon_smg.iw8_sm_papa90.properties.kills
    + response.lifetime.itemData.weapon_smg.iw8_sm_smgolf45.properties.kills
    + response.lifetime.itemData.weapon_smg.iw8_sm_uzulu.properties.kills
    + response.lifetime.itemData.weapon_smg.iw8_sm_victor.properties.kills;
 
    let sumLMG = response.lifetime.itemData.weapon_lmg.iw8_lm_kilo121.properties.kills
    + response.lifetime.itemData.weapon_lmg.iw8_lm_lima86.properties.kills
    + response.lifetime.itemData.weapon_lmg.iw8_lm_mgolf34.properties.kills
    + response.lifetime.itemData.weapon_lmg.iw8_lm_mgolf36.properties.kills
    + response.lifetime.itemData.weapon_lmg.iw8_lm_mkilo3.properties.kills
    + response.lifetime.itemData.weapon_lmg.iw8_lm_pkilo.properties.kills
    + response.lifetime.itemData.weapon_lmg.iw8_lm_sierrax.properties.kills;
 
    let sumSG =  response.lifetime.itemData.weapon_shotgun.iw8_sh_charlie725.properties.kills
    + response.lifetime.itemData.weapon_shotgun.iw8_sh_dpapa12.properties.kills
    + response.lifetime.itemData.weapon_shotgun.iw8_sh_mike26.properties.kills
    + response.lifetime.itemData.weapon_shotgun.iw8_sh_oscar12.properties.kills
    + response.lifetime.itemData.weapon_shotgun.iw8_sh_romeo870.properties.kills;
 
    let sumSN = response.lifetime.itemData.weapon_sniper.iw8_sn_alpha50.properties.kills
    + response.lifetime.itemData.weapon_sniper.iw8_sn_delta.properties.kills
    + response.lifetime.itemData.weapon_sniper.iw8_sn_hdromeo.properties.kills
    + response.lifetime.itemData.weapon_sniper.iw8_sn_xmike109.properties.kills;
 
    let sumP = response.lifetime.itemData.weapon_pistol.iw8_pi_cpapa.properties.kills
    + response.lifetime.itemData.weapon_pistol.iw8_pi_decho.properties.kills
    + response.lifetime.itemData.weapon_pistol.iw8_pi_golf21.properties.kills
    + response.lifetime.itemData.weapon_pistol.iw8_pi_mike9.properties.kills
    + response.lifetime.itemData.weapon_pistol.iw8_pi_mike1911.properties.kills
    + response.lifetime.itemData.weapon_pistol.iw8_pi_papa320.properties.kills;
   
    $('#results-list').append(
        `<h3>${response.username}</h3>
            <article id="player-stats" class="tablink active">
                <p>Level: ${response.level}<p>
                <p>Accuracy: ${response.lifetime.all.properties.accuracy}</p>
                <p>K/D Ratio: ${response.lifetime.all.properties.kdRatio}</p>
                <p>Kills: ${response.lifetime.all.properties.kills}</p>
                <p>Deaths: ${response.lifetime.all.properties.deaths}</p>
                <p>Headshots: ${response.lifetime.all.properties.headshots}</p>
                <p>Misses: ${response.lifetime.all.properties.misses}</p>
            </article>
            <article id="game-stats" class="tablink">
                <p>Games Played: ${response.lifetime.all.properties.gamesPlayed}</p>
                <p>Wins: ${response.lifetime.all.properties.wins}</p>
                <p>Wins loss Ratio: ${response.lifetime.all.properties.wlRatio}</p>
                <p>Longest Win Streak: ${response.lifetime.all.properties.recordLongestWinStreak}</p>
                <p>Most Kills in a Match: ${response.lifetime.all.properties.recordKillsInAMatch}</p>
                <p>Highest Kill Streak: ${response.lifetime.all.properties.recordKillStreak}</p>
                <p>Suicides: ${response.lifetime.all.properties.suicides}</p>
            </article>
            <article id="weapon-stats" class="tablink">
                <p> Assault Rifle Kills: ${sumAR}
                <p> SMG Kills: ${sumSMG}
                <p> LMG Kills: ${sumLMG}
                <p> Shotgun Kills: ${sumSG}
                <p> Sniper Rifle Kills: ${sumSN}
                <p> Pistol Kills: ${sumP}
            </article>
        `  )
 };

//function to get friend's user name
function getFriendUserbyId(){
    
    let gamerTagFriend = document.getElementById("mySearchFriend").value;
    let re = /#/gi;
    let newGamerTagFriend =gamerTagFriend.replace(re, "%2523");
    let platformFriend = document.getElementById("platformfriend").value;
    
    const url = searchUrl  + newGamerTagFriend + '/' + platformFriend;
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
            "x-rapidapi-key": "4f73f6c31fmshcd3619c19341d56p122b48jsn0b9f0f427edc",
        }
    })

    .then(response => response.json())
    .then(responseJson => 
    displayResultsFriend(responseJson))
    .catch(error => alert('User was not found or platform was incorrect, please try again.'));

}
// https://javascript.info/async-await
// async function myFetch(){
//   let gamerTag = document.getElementById("mySearch").value;
//     let re = /#/gi;
//     let newGamerTag =gamerTag.replace(re, "%2523");
//     let platform = document.getElementById("platform").value;
 
//     const url = searchUrl + newGamerTag + '/' + platform;

//     let response = await fetch(url, {
//         "method": "Get",
//         "headers":{
//             "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
//             "x-rapidapi-key": "4f73f6c31fmshcd3619c19341d56p122b48jsn0b9f0f427edc",
//         }
//     })
//     if(!response.ok) {
//         console.log(response, 'string');
//         throw new Error(`User was not found or platform was incorrect, please try again. ${response.status}`)
//     } else {
//         console.log(response.json(), '239');
//         return await response.json();
//     }
// }
// myFetch().then(responseJson => {
//     displayResults(responseJson) 
// })
//.catch(error => alert('User was not found or platform was incorrect, please try again.')
//);

async function myFetch(){
    let gamerTag = document.getElementById("mySearch").value;
    let re = /#/gi;
    let newGamerTag =gamerTag.replace(re, "%2523");
    let platform = document.getElementById("platform").value;
    const url = searchUrl + newGamerTag + '/' + platform;
      try {
        let response = await fetch(url, {
          "method": "Get",
          "headers":{
              "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
              "x-rapidapi-key": "4f73f6c31fmshcd3619c19341d56p122b48jsn0b9f0f427edc",
          }
        })
        let data = await response.json();
        console.log(data, 'this is data')
        let datak = () => {
            console.log(datak, 'this is responseJson')
            return displayResults(datak) 
          }
      }catch(error){
        console.log(error, 'Ahhhh')
        }
    }
//   myFetch().then(data => {
//     console.log(data, 'this is responseJson')
//     displayResults(data); 
//   })
    
//function to display friend user results
function displayResultsFriend(responseJson) {
    console.log(responseJson);

   let sumAR =  responseJson.lifetime.itemData.weapon_assault_rifle.iw8_ar_akilo47.properties.kills
   + responseJson.lifetime.itemData.weapon_assault_rifle.iw8_ar_anovember94.properties.kills
   + responseJson.lifetime.itemData.weapon_assault_rifle.iw8_ar_asierra12.properties.kills
   + responseJson.lifetime.itemData.weapon_assault_rifle.iw8_ar_falima.properties.kills
   + responseJson.lifetime.itemData.weapon_assault_rifle.iw8_ar_falpha.properties.kills
   + responseJson.lifetime.itemData.weapon_assault_rifle.iw8_ar_galima.properties.kills
   + responseJson.lifetime.itemData.weapon_assault_rifle.iw8_ar_kilo433.properties.kills
   + responseJson.lifetime.itemData.weapon_assault_rifle.iw8_ar_mcharlie.properties.kills
   + responseJson.lifetime.itemData.weapon_assault_rifle.iw8_ar_mike4.properties.kills
   + responseJson.lifetime.itemData.weapon_assault_rifle.iw8_ar_scharlie.properties.kills
   + responseJson.lifetime.itemData.weapon_assault_rifle.iw8_ar_sierra552.properties.kills
   + responseJson.lifetime.itemData.weapon_assault_rifle.iw8_ar_tango21.properties.kills;

   let sumSMG = responseJson.lifetime.itemData.weapon_smg.iw8_sm_augolf.properties.kills
   + responseJson.lifetime.itemData.weapon_smg.iw8_sm_beta.properties.kills
   + responseJson.lifetime.itemData.weapon_smg.iw8_sm_charlie9.properties.kills
   + responseJson.lifetime.itemData.weapon_smg.iw8_sm_mpapa5.properties.kills
   + responseJson.lifetime.itemData.weapon_smg.iw8_sm_mpapa7.properties.kills
   + responseJson.lifetime.itemData.weapon_smg.iw8_sm_papa90.properties.kills
   + responseJson.lifetime.itemData.weapon_smg.iw8_sm_smgolf45.properties.kills
   + responseJson.lifetime.itemData.weapon_smg.iw8_sm_uzulu.properties.kills
   + responseJson.lifetime.itemData.weapon_smg.iw8_sm_victor.properties.kills;

   let sumLMG = responseJson.lifetime.itemData.weapon_lmg.iw8_lm_kilo121.properties.kills
   + responseJson.lifetime.itemData.weapon_lmg.iw8_lm_lima86.properties.kills
   + responseJson.lifetime.itemData.weapon_lmg.iw8_lm_mgolf34.properties.kills
   + responseJson.lifetime.itemData.weapon_lmg.iw8_lm_mgolf36.properties.kills
   + responseJson.lifetime.itemData.weapon_lmg.iw8_lm_mkilo3.properties.kills
   + responseJson.lifetime.itemData.weapon_lmg.iw8_lm_pkilo.properties.kills
   + responseJson.lifetime.itemData.weapon_lmg.iw8_lm_sierrax.properties.kills;

   let sumSG =  responseJson.lifetime.itemData.weapon_shotgun.iw8_sh_charlie725.properties.kills
   + responseJson.lifetime.itemData.weapon_shotgun.iw8_sh_dpapa12.properties.kills
   + responseJson.lifetime.itemData.weapon_shotgun.iw8_sh_mike26.properties.kills
   + responseJson.lifetime.itemData.weapon_shotgun.iw8_sh_oscar12.properties.kills
   + responseJson.lifetime.itemData.weapon_shotgun.iw8_sh_romeo870.properties.kills;

   let sumSN = responseJson.lifetime.itemData.weapon_sniper.iw8_sn_alpha50.properties.kills
   + responseJson.lifetime.itemData.weapon_sniper.iw8_sn_delta.properties.kills
   + responseJson.lifetime.itemData.weapon_sniper.iw8_sn_hdromeo.properties.kills
   + responseJson.lifetime.itemData.weapon_sniper.iw8_sn_xmike109.properties.kills;

   let sumP = responseJson.lifetime.itemData.weapon_pistol.iw8_pi_cpapa.properties.kills
   + responseJson.lifetime.itemData.weapon_pistol.iw8_pi_decho.properties.kills
   + responseJson.lifetime.itemData.weapon_pistol.iw8_pi_golf21.properties.kills
   + responseJson.lifetime.itemData.weapon_pistol.iw8_pi_mike9.properties.kills
   + responseJson.lifetime.itemData.weapon_pistol.iw8_pi_mike1911.properties.kills
   + responseJson.lifetime.itemData.weapon_pistol.iw8_pi_papa320.properties.kills;


   $('#results-list-friend').append(
        `<h3>${responseJson.username}</h3>
<div id="Player Stats2" class="friendTab">
    <p>Level: ${responseJson.level}<p>
    <p>Accuracy: ${responseJson.lifetime.all.properties.accuracy}</p>
    <p>K/D Ratio: ${responseJson.lifetime.all.properties.kdRatio}</p>
    <p>Kills: ${responseJson.lifetime.all.properties.kills}</p>
    <p>Deaths: ${responseJson.lifetime.all.properties.deaths}</p>
    <p>Headshots: ${responseJson.lifetime.all.properties.headshots}</p>
    <p>Misses: ${responseJson.lifetime.all.properties.misses}</p>
</div>
<div id="Game Stats2" class="friendTab">
 <p>Games Played: ${responseJson.lifetime.all.properties.gamesPlayed}</p>
    <p>Wins: ${responseJson.lifetime.all.properties.wins}</p>
    <p>Wins loss Ratio: ${responseJson.lifetime.all.properties.wlRatio}</p>
    <p>Longest Win Streak: ${responseJson.lifetime.all.properties.recordLongestWinStreak}</p>
    <p>Most Kills in a Match: ${responseJson.lifetime.all.properties.recordKillsInAMatch}</p>
    <p>Highest Kill Streak: ${responseJson.lifetime.all.properties.recordKillStreak}</p>
    <p>Suicides: ${responseJson.lifetime.all.properties.suicides}</p>
</div>
<div id="Weapon Stats2" class="friendTab">
    <p> Assault Rifle Kills: ${sumAR}
    <p> SMG Kills: ${sumSMG}
    <p> LMG Kills: ${sumLMG}
    <p> Shotgun Kills: ${sumSG}
    <p> Sniper Rifle Kills: ${sumSN}
    <p> Pistol Kills: ${sumP}
</div>
        `   
    )     
};

//function to hide other tabs once clicked for user results
const el  = document.querySelector(".user");
const btns = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".tablink");
if(el){
    el.addEventListener("click", function(event){
        //event.preventDefault();
        const id = event.target.dataset.id; 
        if(id){
            btns.forEach(function(btn){
                btn.classList.remove("active");
            }); 
            event.target.classList.add("active");
            // hide other articles
            articles.forEach(function(article){
                article.classList.remove("active"); 
            });
            const element = document.getElementById(id);
            element.classList.add("active");
        } 
    })
}

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
    //let userSearch;
    //let friendSearch;

    let userSearch = document.getElementById("mySearch").value;
    let friendSearch = document.getElementById("mySearchFriend").value;

    // let responseInputVal = await data(userSearch, friendSearch)
    // if(!responseInputVal){
    //     throw new Error( alert("Please Enter A User Name"))
    // } else {
    //     getUserbyId();
    //     getFriendUserbyId();
    //     $('main').html(resultsHTML()); 
    // }

    if(userSearch ==="" && friendSearch ===""){
        alert("Please Enter A User Name");
        return false;
    } else{
        myFetch();
    //    getUserbyId();
    //  getFriendUserbyId();
     //   $('main').html(resultsHTML());     
    }
};


    $(function() {
        console.log('App loaded! Waiting for submit!');
        $('main').html(homeScreenHTML());
        restartClick();
      });
//IWL RAVEN (XBOX) & IWL PATRON (XBOX)
