const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');

const url = "https://www.imdb.com/india/?ref_=ib_g_in_g_gg_kwd-14898322_cv";

request(url, (err, res, body) => {
    if(err){
        console.log(err);
    }else{
        MostAnticipatedMovies(body);
    }
});


function MostAnticipatedMovies(body) {
    let selectorTools = cheerio.load(body);
    let heading = selectorTools('.trending-title').text();
    console.log(chalk.magenta(heading));
    let details = selectorTools('.trending-list-rank-items-container').html();
    let namesArr = selectorTools(details).find('.trending-list-rank-item-name');
    let viewsArr = selectorTools(details).find('.trending-list-rank-item-share');
    for(let i=0;i<namesArr.length;i++){
        task(namesArr, viewsArr, i, selectorTools);
    }
}

function task(namesArr, viewsArr, i, selectorTools){
    setTimeout(() =>{
        console.log(`${i+1}. ${chalk.yellow(selectorTools(namesArr[i]).text())}  - ${selectorTools(viewsArr[i]).text()}`);
        let storylineLink = "https://www.imdb.com/" + selectorTools(namesArr[i]).find('a').attr('href');
        story_line(storylineLink);
    },4000*i)
}

function story_line(link) {
    request(link, function callback(err, res, body) {
        if(err){
            console.error(err);   
        }else{
            storylineContent(body);
        }
    });
    
}

function storylineContent(body) {
    let selectorTool = cheerio.load(body);
    let content = selectorTool('.ipc-html-content').text();
    console.log(chalk.redBright(content));
}