// scrapped data from cricbuzz according to website structure on Tue, 18 April 2023 03:00 PM IST

const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")

const handleHTML = (html)=>{
  const $ = cheerio.load(html);
  const winningTeam = $(".cbz-ui-status").text().split("won")[0];
  const data = $("#inn_2  > div:nth-of-type(3)").html();
  const playersName = $(data).find(".bat-bowl-data");
  let maxWickets = 0;
  let maxWicketsPlayer;
  const wickets = $(data).find("td > b");
  for(let i=0;i<playersName.length;i++){
    const name = $(playersName[i]).text();
    const wicket = $(wickets[i]).text();
    if(wicket > maxWickets){
      maxWickets = wicket;
      maxWicketsPlayer = name;
    }
  }
  console.log(`Winnig team :- ${winningTeam}`);
  console.log(`${maxWicketsPlayer} from ${winningTeam} takes ${maxWickets} wickets in match which are maximum`);
}


const url = "https://m.cricbuzz.com/live-cricket-scorecard/66169/gt-vs-csk-1st-match-indian-premier-league-2023";
const getData = async ()=>{
try
{
  const {data} = await axios.get(url);
  handleHTML(data);
}catch(err)
{
  console.log(err);
}
}

 getData();