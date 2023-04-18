// scrapped data from cricbuzz according to website structure on Tue, 18 April 2023 03:00 PM IST

const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")

const extractDOB = async (link)=>{
  const {data} = await axios.get(link);
  const $ = cheerio.load(data);
  const infoSec = $(".cb-list-item");
  const  tableRows = $(infoSec[2]).find("table tr");
  const nameRow = $(tableRows[0]).find("td");
  const name = $(nameRow[1]).text();
  
  const dobRow = $(tableRows[1]).find("td");
  const DOB = $(dobRow[1]).text();
  console.log(name + " - " + DOB);
}

const handleHTML = async (html,inning)=>{
  const $ = cheerio.load(html);
  
  const data = $(`${inning} div:nth-of-type(1) .table-responsive`);
  
   for(let i=1;i<data.length;i++){
     const playerInfo = $(data[i]).find(".active td a").attr("href");
      const playerInfoLink = `https://m.cricbuzz.com${playerInfo}`;
      await extractDOB(playerInfoLink);
    }
}


const url = "https://m.cricbuzz.com/live-cricket-scorecard/66169/gt-vs-csk-1st-match-indian-premier-league-2023";
const getData = async ()=>{
try
{
  const {data} = await axios.get(url);
  handleHTML(data,"#inn_1");
  handleHTML(data,"#inn_2");
}catch(err)
{
  console.log(err);
}
}

 getData();