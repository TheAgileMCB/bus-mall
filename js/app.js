'use strict';
console.log('ready to rock');

var rounds = 25;
var imageElements = document.getElementsByTagName('img');
var Products = [];
var totalClicks = 0;
var productIndex1 = 0;
var productIndex2 = 1;
var productIndex3 = 2;

function Product(name, imageURL) {
  this.name = name;
  this.imageURL = imageURL;
  this.views = 0;
  this.clicks = 0;
  this.clickShare = this.getClickShare;
  // console.log(Products);
  Products.push(this);
}

new Product('R2-D2 Bag', '../images/bag.jpg');
new Product('Banana Slicer', '../images/banana.jpg');
new Product('iPad Toilet Paper Holder', '../images/bathroom.jpg');
new Product('Rain Boots', '../images/boots.jpg');
new Product('All-In-One Breakfast Machine', '../images/breakfast.jpg');
new Product('Meatball Bubble Gum', '../images/bubblegum.jpg');
new Product('Core Toning Chair', '../images/chair.jpg');
new Product('Kneel-Before-Your-God Cthulhu statuette', '../images/cthulhu.jpg');
new Product('Doggy Duck Lips', '../images/dog-duck.jpg');
new Product('Dragon Meat', '../images/dragon.jpg');
new Product('Pen Cap Utensils', '../images/pen.jpg');
new Product('Pet Sweep', '../images/pet-sweep.jpg');
new Product('Pizza Scissors', '../images/scissors.jpg');
new Product('Shark Sleeping Bag', '../images/shark.jpg');
new Product('Baby  Sweep', '../images/sweep.png');
new Product('Taun Taun Toddler Sleeping Bag', '../images/tauntaun.jpg');
new Product('Unicorn Meat', '../images/unicorn.jpg');
new Product('Cthulhu Tentacle 1TB USB Drive', '../images/usb.gif');
new Product('M.C. Escher Watering Can', '../images/water-can.jpg');
new Product('Safety Wine Glass', '../images/wine-glass.jpg');

Product.prototype.getClickShare = function() {
  (this.clicks / this.views) * 100;
};

var productList = document.getElementById('product-list');

function productVote(event) {
  totalClicks++;
  if (event.srcElement.id === 'Product1') {
    Products[productIndex1].clicks++;
  } else if (event.srcElement.id === 'Product2') {
    Products[productIndex2].clicks++;
  } else if (event.srcElement.id === 'Product3') {
    Products[productIndex3].clicks++;
  }
  console.log('totalClicks:', totalClicks);
  console.log(Products[productIndex1].name + ' clicks', Products[productIndex1].clicks);
  console.log(Products[productIndex2].name + ' clicks', Products[productIndex2].clicks);
  console.log(Products[productIndex3].name + ' clicks', Products[productIndex3].clicks);


  var nextProductIndex1 = Math.floor(Math.random() * Products.length);
  Products[productIndex1].views++;
  console.log(Products[productIndex1].name + ' views', Products[productIndex1].views);
  while ((nextProductIndex1 === productIndex1) || (nextProductIndex1 === productIndex2) || (nextProductIndex1 === productIndex3) || (nextProductIndex1 === nextProductIndex2) || (nextProductIndex1 === nextProductIndex3)) {
    nextProductIndex1 = Math.floor(Math.random() * Products.length);
    // Products[productIndex1].views++;
    // console.log('views1:', Products[productIndex1].views++);
  }

  var nextProductIndex2 = Math.floor(Math.random() * Products.length);
  Products[productIndex2].views++;
  console.log(Products[productIndex2].name + ' views', Products[productIndex2].views);
  while ((nextProductIndex2 === productIndex1) || (nextProductIndex2 === productIndex2) || (nextProductIndex2 === productIndex3) || (nextProductIndex2 === nextProductIndex1) || (nextProductIndex2 === nextProductIndex3)) {
    nextProductIndex2 = Math.floor(Math.random() * Products.length);
    // Products[productIndex2].views++;
    // console.log('views2:', Products[productIndex1].views++);
  }

  var nextProductIndex3 = Math.floor(Math.random() * Products.length);
  Products[productIndex3].views++;
  console.log(Products[productIndex3].name + ' views', Products[productIndex3].views);
  while ((nextProductIndex3 === productIndex1) || (nextProductIndex3 === productIndex2) || (nextProductIndex3 === productIndex3) || (nextProductIndex3 === nextProductIndex1) || (nextProductIndex3 === nextProductIndex2)) {
    nextProductIndex3 = Math.floor(Math.random() * Products.length);
    // Products[productIndex3].views++;
    // console.log('views3', Products[productIndex1].views++);
  }

  productIndex1 = nextProductIndex1;
  productIndex2 = nextProductIndex2;
  productIndex3 = nextProductIndex3;

  imageElements[0].src = Products[productIndex1].imageURL;
  imageElements[1].src = Products[productIndex2].imageURL;
  imageElements[2].src = Products[productIndex3].imageURL;

  if(totalClicks >= rounds) {
    // var footerElement = document.getElementsByTagName('footer')[0];
    // footerElement.textContent = `${Products.clicks[productIndex1]}, ${Products.clicks[productIndex2]}, ${Products.clicks[productIndex3]}`;
  // }
    Product.prototype.renderList = function() {
      for (let i = 0; i < Products.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = `${this.name} had ${this.clicks} and was shown ${this.views} times, resulting in a clickshare of ${this.clickShare}%!`;
        productList.appendChild(listItem);

        Products[i].renderList();
      }
    };
  }
}

for(let i = 0; i < imageElements.length; i++) {
  console.log('Events are happening');
  imageElements[i].addEventListener('click', productVote);
}
