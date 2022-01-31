const MongoClient = require("mongodb").MongoClient;
const axios = require('axios');



const fetchData = async () => {
    const url = 'https://randomuser.me/api/?results=50';
    const {data} = await axios.get(url);
    const MONGODB_URI =
    'Insert your MongoDb uri';
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const collection = client.db("ugram").collection("users");

    collection.drop();
    let usersToInsert = [];
    data.results.map((user) => {
        const newUser = {
            firstName:user.name.first,
            lastName:user.name.last,
            username:user.login.username,
            email:user.email,
            phoneNumber:user.phone,
            smallpicture:user.picture.thumbnail,
            largepicture:user.picture.large,
            registeredDate:user.registered.date
        }
    usersToInsert.push(newUser);
    });
    await collection.insertMany(usersToInsert);
    client.close();
}

fetchData()