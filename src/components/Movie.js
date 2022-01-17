
// https://imdb-api.com/en/API/Title/k_43my2mp2/tt1375666/FullCast,Posters,Images,Ratings,

// title
// movie poster - image
// year - year
// rating - imDbRating
// poster - posters{array very big}
// run minutes - runtimeMins
// plot - plot
// dir name - directors
// actors list with images -  actorList = [] - name, image, 


// languages
// similar movies
import React from 'react'

function Movie({id}) {
    return (
        <div>
            movie {id}
        </div>
    )
}

export default Movie
