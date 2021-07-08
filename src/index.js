import axios from 'axios';
console.log(axios);

//Non idomatic way
// const result = axios.get('https://lambda-times-api.herokuapp.com/friends');
// // console.log(result);// the data is not here
// console.log('1 About to fetch data with Axios');

// result.then(furtureData => {
//   //freedom to assume the data is here
//   //future code, for when the data actually arives
//   console.log('3 Here is the future data', furtureData);
// });

//Idomatic way
// console.log(result);// the data is not here
console.log('1 About to fetch data with Axios');

axios.get('https://lambda-times-api.herokuapp.com/friends')
.then(res => {
  //freedom to assume the data is here
  //future code, for when the data actually arives
  console.log('3 Here is the response organized by axios', res);
  console.log('Here is the response body', res.data);

  // axios.get(res.data.newURL);//for multiple request from the same point
  // BUT from Two different end point you must add a new request...
  // next request here
})
// .then():
// .then();
// .then();
.catch(drama => {
  //handle the drama
  console.log(drama);
});

// if you want to handle several indepent promises 
// Promise.all([p1, p2, p3]).then([res1, res2, res3])

console.log('2 We requested data with axios');

//The above lines of code are proof that JavaScript doesn't wait on #3 to come back. It passed thru #3 and went to #2 while waiting for #3 to finally finish it's computation. Remember... a PROMISE is an object that represents the RESULT of a computation. 

// Imports at the top of the file!
// We never nest imports inside blocks of code!


// 👉 TASK 1- Test out the following endpoints:

//  https://lambda-times-api.herokuapp.com/friends
//  https://lambda-times-api.herokuapp.com/friends/1
//  https://lambda-times-api.herokuapp.com/quotes
//  https://lambda-times-api.herokuapp.com/cards
//  https://lambda-times-api.herokuapp.com/breeds
//  https://dog.ceo/api/breeds/image/random

//  * With HTTPie (command-line HTTP Client)
//  * With Postman (HTTP Client with GUI)
//  * With Chrome and the Network Tab
//  * With JS using the native fetch [STRETCH]

//DONE I like postman and HTTPie for different reasons


// 👉 TASK 2- Select the "entry point", the element
// inside of which we'll inject our dog cards 
const entryPoint = document.querySelector('.entry');


// 👉 TASK 3- `dogCardMaker` takes an object and returns a Dog Card.
// Use this function to build a Card, and append it to the entry point.
function dogCardMaker({ imageURL, breed }) {
  // instantiating the elements
  const dogCard = document.createElement('div');
  const image = document.createElement('img');
  const heading = document.createElement('h3');
  // setting class names, attributes and text
  heading.textContent = `Breed: ${breed}`;
  image.src = imageURL;
  image.classList.add('dog-image');
  dogCard.classList.add('dog-card');
  // creating the hierarchy
  dogCard.appendChild(image);
  dogCard.appendChild(heading);
  // adding some interactivity
  dogCard.addEventListener('click', () => {
    dogCard.classList.toggle('selected');
  });
  // never forget to return!
  return dogCard;
}



// 👉 TASK 4- Bring the Axios library into the project using one of two methods:
//    * Traditional way: put another script tag inside index.html (`https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js`)
//    * Proyects with npm: install it with npm and import it into this file

//DONE - See Lines 1-2


// 👉 TASK 5- Fetch dogs from `https://dog.ceo/api/breed/{breed}/images/random/{number}`
//    * ON SUCCESS: use the data to create dogCards and append them to the entry point
//    * ON FAILURE: log the error to the console
//    * IN ANY CASE: log "done" to the console
axios.get('https://dog.ceo/api/breed/boxer/images/random/6')
.then(res => {//inside there curly brackets is wehre we have access to the data which comes from your api... this dat goes into the fuctionMaker
  // debugger
  const images = res.data.message; //which via debugger we determined was an array of images.
  console.log(images);//just to check
  images.forEach(image => {
    //make a dog card
    //append it to the DOM
    entryPoint.append(dogCardMaker({ imageURL: image , breed: 'boxer' }));
  });
})
.catch(err => {
  debugger
});



// 👉 (OPTIONAL) TASK 6- Wrap the fetching operation inside a function `getDogs`
// that takes a breed and a count (of dogs)
function getDogs(breed, count) {
  axios.get(`https://dog.ceo/api/api/breed/${breed}/images/random/${count}`)
  .then(res => {
    res.data.message.forEach(imageURL => {
      const dogCard = dogCardMaker({ imageURL, breed });
      entryPoint.appendChild(dogCard);
    });
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    console.log('done');
  });
}
// getDogs('mastiff', 4);

// 👉 (OPTIONAL) TASK 7- Put a button in index.html to 'get dogs' and add a click
// event listener that executes `getDogs`

const getDogsButton = document.createElement('button');
getDogsButton.textContent = 'Get Dogs';
entryPoint.appendChild(getDogsButton);

getDogsButton.addEventListener('click', () =>{
  getDogs('mastiff', 3);
  getDogs('australian', 3);
});
// getDogsButton.onclick = () => {
//   getDogs(`mastiff`, 3); 
//   getDogs(`australian`, 3);
// };




// 👉 (OPTIONAL) TASK 8- Import the breeds from `breeds.js`
// or request them from https://lambda-times-api.herokuapp.com/breeds
// and loop over them, fetching a dog at each iteration
