const returnList = () => {
    fetch('https://api.jikan.moe/v3/anime/1')
    .then(res => res.json())
    .then(val => console.log(val));
}

export default returnList;