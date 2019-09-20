const returnList = () => {
    fetch('https://dtmqucifgb.execute-api.us-east-2.amazonaws.com/prod/restaurants')
    .then(res => res.json())
    .then(val => console.log(val));
}

export default returnList;