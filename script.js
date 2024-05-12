import dataOrig from './data.js'
import dataReplace from './dataReplace.js'

const values = Object.keys(dataReplace)
for(let i = 0; i < dataOrig.length; i++){
    dataOrig[i].tags = dataOrig[i].tags.split(' ');
    const elm = dataOrig[i];
    addDataTags(elm);
    dataOrig[i].tags = elm.tags.filter((el) =>  values.includes(el));
    dataOrig[i].tags.sort();
}
// console.log(values)
function addDataTags(arr){
    const age = calculateAge(...(arr.born).split(' '));
    const name = arr.name.split(' ')[0];
    const arrTags = arr.tags;
    if(age > 16){
        arrTags.push("old16")
    }
    if(age > 18){
        arrTags.push('old18')
    }
    if(age > 30){
        arrTags.push('old30')
    }
    arrTags.push('wordLen' + name.length);
}
function calculateAge(day, month, year) {
    day = +day;
    month = +month;
    year = +year;
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
// console.log(dataOrig)

let i = 0;
function startGame(){
    let data = [...dataOrig];
    function start(){
        if(data.length === 0){
            console.log("I can't find");
            return;
        }
        const first = data[i];
        if(data.length === 1){
            console.log("it's " + first.name)
            return;
        }
        const elm = first.tags[0];
        // console.log(elm)
        if(!elm || elm.length === 0){
            i++;
            if(i >= data.length){
                const allData = data.map((el) => el.name).join(' ')
                console.log("I found " + (allData || 'nothings'));
                return;
            }
            return start();
        }
        i = 0;
        const answer = getQuenstion(elm);
        if(answer){
            data = data.filter((el) => {
                el = el.tags;
                for(let i = 0; i < el.length; i++){
                    const element = el[i];
                    if(elm === element){
                        el.splice(i, 1);
                        return true;
                    }
                }
            })
            return start();
        }
        data = data.filter((el) => {
            el = el.tags;
            const elmIndex = el.indexOf(elm);
            return elmIndex === -1;
        })
        return start();
    }
    start();
}
function getQuenstion(dataTag){
    return;
    let quenstion = prompt(dataReplace[dataTag]);
    return quenstion === 'yes';
}
startGame();
//TEST to send my telegram
// const BOT_TOKEN = '6947016260:AAGVDQcqcnJKxuGuFp8G_AQgpzYVPGSN6PI';
// const CHAT_ID = '1688694245';
// let text = encodeURI(`Name: Hayk;`);
// axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=` +
//     text + '&parse_mode=html')