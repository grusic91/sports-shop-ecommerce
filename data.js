const faker = require("faker");

let data = [];
const categoires = ["Watersports", "Soccer", "Chess", "Running"];

faker.seed(100);

for (let i = 1; i <= 503; i++) {
    let category = faker.helpers.randomize(categoires);
    data.push({
        id: i,
        name: faker.commerce.productName(),
        category: category,
        description: `${category}: ${faker.lorem.sentence(3)}`,
        price: Number(faker.commerce.price())
    })
}


module.exports = function () {
    return {
        categories: categoires,
        products: data,
        orders: []
    }
}