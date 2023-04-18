// scrapped data from cricbuzz according to website structure on Tue, 18 April 2023 03:00 PM IST

const axios = require("axios")
const cheerio = require("cheerio")

const handleHTML = (html)=>{
  const $ = cheerio.load(html);
  const commentaryPara = $(".commtext");
  for(let i=0;i<commentaryPara.length;i++){
    const lastBall = $(commentaryPara[i]).find("span");
    const lastBallVal = $(lastBall).text().split(".")[1];
    if(lastBallVal == 6){
      // show that data only which loads initially
      console.log($(commentaryPara[i]).text());
    }
  }
}


const url = "https://m.cricbuzz.com/cricket-commentary/66169/gt-vs-csk-1st-match-indian-premier-league-2023";
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