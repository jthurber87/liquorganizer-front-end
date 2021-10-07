# Liquorganizer
<img width="700" alt="Screen Shot 2021-10-06 at 5 57 56 PM" src="https://user-images.githubusercontent.com/87626914/136304375-1c94521f-8491-4e08-8920-177e811572e9.png">


Liquorganizer is a clean, simple inventory system for bars, restaurants, and individuals alike. Liquorganizer consolidates inventory or personal liquor collection for easy organization.


## User Stories

1. User should be able to add to inventory, using bottles.js model which includes spirit, brand, quantity, and notes
2. User should be able to see a layout of flippable cards reflecting the current inventory on the home page
3. User should be able to quickly add and remove the quantity of bottles from the home page 
4. User should be able to edit information and delete product when clicking on the link provided on the products card

![ezgif-6-29bc87ef82d6](https://user-images.githubusercontent.com/87626914/136305741-a7002d7d-4bf7-4bbd-896c-1617aa56b2b4.gif)



## Wireframe
<img width="450" alt="Screen Shot 2021-10-06 at 11 57 49 PM" src="https://user-images.githubusercontent.com/87626914/136334662-ed756ced-7009-4a4d-a07e-1a98a9a4dc71.png"><img width="455" alt="Screen Shot 2021-10-06 at 11 56 03 PM" src="https://user-images.githubusercontent.com/87626914/136334478-4a55e157-81a2-4aae-aab4-b4c7341bd925.png">



## Technologies

| Tools     	| Description                                                                                                                                                                     	|
|-----------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| MongoDb   	| A source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.           	|
| Express   	| A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.                                                	|
| React     	| An open-source front-end JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies. 	|
| Node.js   	| An open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.                          	|
| Bootstrap 	| Build responsive, mobile-first projects on the web with the world's most used front-end component library.                                                                       	|
## Installation
Clone this front end repo
``` 
$ git@github.com:jthurber87/liquorganizer-front-end.git
$ npm install
$ npm start
```
Clone the back end repo
``` 
$ git clone git@github.com:jthurber87/liquorganizer-back-end.git 
$ npm install
$ npm start
```

## Future Considerations
1. A feature that alerts the user of inventory status with visual cues such as green for stocked, yellow for low, and red for out of stock
2. A feature that allows the user to sort and filter their inventory by spirit type and low quantity. 

## Contributing

Jay Thurber
Dae Young Hwang
Isabel Luk

## Code Snippets
```
  const incrementCount = async (id) => {
    const updatedBottle = bottles.find(bottle => bottle._id === id);
    try {
      const response = await fetch('https://liquorganizer-back-end.herokuapp.com/bottles/' + id, {
        method: 'PUT',
        body: JSON.stringify({
          ...updatedBottle,
          count: updatedBottle.count + 1
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const parsedBottle = await response.json();
      setBottles(bottles => {
        return bottles.map(item => (
          item._id === id
            ? {
              ...parsedBottle,
              count: parsedBottle.count
            }
            : item))
      })
    } catch (error) {
      console.log(error)
    }
  }
```
