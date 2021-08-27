let result = {
	name: "nothing",
    full_name: "full_name",
    private: false,
	owner:{
  		login:"owner.login",
		name:" API call to result.owner.url ",
        followersCount: 'API call to result.owner.url',
        followingCount: "API call to result.owner.url",
        },
       licenseName: "license.name",
       score: 'score',
       numberOfBranch:"API call to result.branches_url and count the    result"
}
let dataFetched;
//initial fetch to the url
async function fetching() {
    await fetch(urlToFetch)
    .then(res => res.json())
    .then(data => dataFetched = data)
    desiredData = dataFetched.items[0]
    result.name = dataFetched.items[0].name
    result.full_name = desiredData.full_name
    result.private = desiredData.private
    result.owner.login = desiredData.owner.login
    result.owner.name = desiredData.owner.url
    result.licenseName = desiredData.license.name
    result.score = desiredData.score
    result.numberOfBranch = desiredData.branches_url

}
//fetching owner details
async function nestedFetching (branched_url){
    await fetch(branched_url)
    .then(res => res.json())
    .then(data => dataFetched = data)
    result.owner.name = dataFetched.name
    result.owner.followersCount = dataFetched.followers
    result.owner.followingCount = dataFetched.following

}
//counting number of branches
async function fetchingBranchUrl (branches_url) {
    branches_url = branches_url.split('{')[0]
    await fetch(branches_url)
    .then(res => res.json())
    .then(data => dataFetched = data)
    result.numberOfBranch = dataFetched.length

    console.log("The final result is ", result)
}


document.getElementById('searchButton').onclick = async function() {
    inputFromText = document.getElementById('search').value
    urlToFetch = 'https://api.github.com/search/repositories?q=' + inputFromText
    console.log("The input value is ",inputFromText)
    console.log("The url value is ",urlToFetch)
    
    await fetching()
    await nestedFetching(result.owner.name)
    await fetchingBranchUrl(result.numberOfBranch)
}
    