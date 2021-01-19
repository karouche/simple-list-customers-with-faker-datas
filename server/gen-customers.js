var faker = require('faker');

var dbcustomers = { users: [], products: []};
let gender = ['male', 'female'];

function getAdress() {

        var   address =  {}; 
        address.zip = faker.address.zipCode(); 
        address.city = faker.address.city();
        address.streetName= faker.address.streetName(); 
        address.country= faker.address.country(); 
        address.state=  faker.address.state(); 
        address.latitude= faker.address.latitude();
        address.longitude= faker.address.longitude()      ;

      return address; 

}

function getProducts(row, userId){
    var products = [];
    var size = faker.random.number(5); 
    for (var j = 1; j<= size; j++) {

        products.push({
            userId : userId, 
            id: 10*row+j,
            name: faker.commerce.productName(),
            description: faker.lorem.sentences(),
            price: faker.commerce.price(),
            imageUrl: faker.image.business(),// "https://source.unsplash.com/1600x900/?product",
            image: `${faker.image.fashion()}?random=${Date.now()}`,
            quantity: faker.random.number(10)
          });
    }
    return products; 
}

for (var i = 1; i<= 10; i++) {

    var gnd = faker.random.arrayElement(gender); 
    var imageUrl = `https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/${gnd}/${i}.png`;   

    var user = {
        id: i,
        firstname : faker.name.firstName(),
        lastname : faker.name.lastName(),    
        avatar :imageUrl,
        job : faker.name.jobTitle(),
        gender : faker.random.arrayElement(gender),        
        company : faker.company.companyName(),
        phonenumber : faker.phone.phoneNumber(),
        address : getAdress() 
        //,products : getProducts(i) 
    }

    dbcustomers.users.push(user);
    dbcustomers.products = dbcustomers.products.concat(getProducts(i, i));
  };

console.log(JSON.stringify(dbcustomers));