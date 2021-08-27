//initial fetch to the url
urlToFetch = 'http://api.nobelprize.org/v1/prize.json'
desiredData = [];
let dataFetched;
let winners = [];
async function fetching() {
    await fetch(urlToFetch)
    .then(res => res.json())
    .then(data => dataFetched = data)
    desiredData = dataFetched.prizes.filter(data => data.year >= 2000 && data.year <=2019 && data.category === "chemistry")
    desiredData.forEach(element => {
        element.laureates.forEach(person => {
            winners.push(person.firstname + " " + person.surname)
        })
    });
    console.log("Winners are ", winners)
}

async function main(){
    await fetching()
}

main()