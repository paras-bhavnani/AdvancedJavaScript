result = {
	actors :[
			{
				Name : "",
				Movies : []
			}
		],
	Genres : [
			{
				Type : "",
				Movies : []
			}
		]
}
actorsInMovies = {}
genresOfMovies = {}
url = "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json";
let dataFetched;
async function getData() {
    await fetch(url)
    .then(res => res.json())
    .then(data => dataFetched = data)
    dataFetched.forEach(element => {
        element.cast.map(actor => {
            if (actor in actorsInMovies){
                actorsInMovies[actor].push(element.title)
            } else{
                actorsInMovies[actor] = [element.title];
            }
        })
        element.genres.map(genre => {
            if (genre in genresOfMovies){
                genresOfMovies[genre].push(element.title)
            } else{
                genresOfMovies[genre] = [element.title];
            }
        })
    });
    for (const [actor, Movies] of Object.entries(actorsInMovies)){
        result.actors.push({Name: actor, Movies: Movies})
    }
    for (const [genre, Movies] of Object.entries(genresOfMovies)){
        result.Genres.push({Type: genre, Movies: Movies})
    }
    console.log("Result is ", result);
}
getData();