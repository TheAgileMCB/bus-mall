'use strict';
console.log('ready to rock');

var rounds = Math.ceil(Math.random() * 20) + 5;
console.log(rounds);
var Products = [];
var imageElements = document.getElementsByTagName('img');
// var totalViews = rounds * 3;
var totalClicks = 0;
var productIndex1 = 0;
var productIndex2 = 1;
var productIndex3 = 2;

function Product(name, imageURL) {
  this.name = name;
  this.imageURL = imageURL;
  this.views = 0;
  this.clicks = 0;
  this.clickShare = 0;
  // console.log(Products);
  Products.push(this);
}



new Product('R2-D2 Bag', '../images/bag.jpg');
new Product('Banana Slicer', '../images/banana.jpg');
new Product('iPad Toilet Paper Holder', '../images/bathroom.jpg');
new Product('Rubber Shoe Shawl', '../images/boots.jpg');
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

// Product.prototype.getClickShare = function() {
//   ((this.clicks / totalClicks) / totalViews) * 100;
//   // total views, total clicks,
//   // console.log(this.getClickShare(i));
// };

Product.prototype.renderList = function() {
  var listItem = document.createElement('li');
  listItem.textContent = `${this.name} had ${this.clicks} clicks and was shown ${this.views} times, resulting in a clickshare of ${this.clickShare}%!`;
  productList.appendChild(listItem);
};

function getProducts(nameOfThePropertyIWant) {
  var answer = [];
  for(var i = 0; i < Products.length; i++){
    answer[i] = Products[i][nameOfThePropertyIWant];
  }
  console.log(answer);
  return answer;
}

function showDiv() {
  var showMyDiv = document.getElementsByClassName('hidden-div');
  console.log(showMyDiv);
  showMyDiv[0].style.display = 'block';
  showMyDiv[1].style.display = 'block';
}

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

  if(totalClicks === rounds) {
    // var footerElement = document.getElementsByTagName('footer')[0];
    // footerElement.textContent = `${Products.clicks[productIndex1]}, ${Products.clicks[productIndex2]}, ${Products.clicks[productIndex3]}`;
  // }
    for (let i = 0; i < Products.length; i++) {
      Products[i].clickShare = ((Products[i]['clicks']/ rounds) * 100).toFixed(2);
      Products[i].renderList();
      console.log(Products[i].clickshare);
    }

    for (let i = 0; i < imageElements.length; i++) {
      imageElements[i].removeEventListener('click', productVote);
    }

    showDiv();
    runBarChart();
    runPieChart();
  }
}


function runBarChart() {
  // chart code thanks to https://www.chartjs.org/docs/latest/
  var ctx = document.getElementById('product-bar-chart').getContext('2d');
  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'bar',
    data: {
      // what does labels do?
      labels: getProducts('name'),
      // what does datasets do?
      // it's an array of objects
      datasets: [{
        // what does this label do?
        // key, legend
        label: 'Clicks',
        // what does this data do?
        // actually the values in the chart
        data: getProducts('clicks'),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(253, 11, 11, 0.8)',
          'rgba(14, 10, 247, 0.8)',
          'rgba(238, 255, 0, 0.8)',
          'rgba(0, 250, 196, 0.8)',
          'rgba(52, 0, 156, 0.8)',
          'rgba(247, 123, 0, 0.8)',
          'rgba(255, 0, 85, 0.8)',
          'rgba(21, 255, 0, 0.8)',
          'rgba(183, 250, 0, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(0, 0, 0, 0.8)',
          'rgba(131, 100, 70, 0.8)',
          'rgba(128, 128, 128, 0.8)',
          'rgba(204, 0, 245, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(253, 11, 11, 1)',
          'rgba(14, 10, 247, 1)',
          'rgba(238, 255, 0, 1)',
          'rgba(0, 250, 196, 1)',
          'rgba(52, 0, 156, 1)',
          'rgba(247, 123, 0, 1)',
          'rgba(255, 0, 85, 1)',
          'rgba(21, 255, 0, 1)',
          'rgba(183, 250, 0, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(131, 100, 70, 1)',
          'rgba(128, 128, 128, 1)',
          'rgba(204, 0, 245, 1)'
        ],
        borderWidth: 1
      },
      {
        // what does this label do?
        // key, legend
        label: 'Views',
        // what does this data do?
        // actually the values in the chart
        data: getProducts('views'),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(253, 11, 11, 0.2)',
          'rgba(14, 10, 247, 0.2)',
          'rgba(238, 255, 0, 0.2)',
          'rgba(0, 250, 196, 0.2)',
          'rgba(52, 0, 156, 0.2)',
          'rgba(247, 123, 0, 0.2)',
          'rgba(255, 0, 85, 0.2)',
          'rgba(21, 255, 0, 0.2)',
          'rgba(183, 250, 0, 0.2)',
          'rgba(255, 255, 255, 0.2)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(131, 100, 70, 0.2)',
          'rgba(128, 128, 128, 0.2)',
          'rgba(204, 0, 245, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(253, 11, 11, 1)',
          'rgba(14, 10, 247, 1)',
          'rgba(238, 255, 0, 1)',
          'rgba(0, 250, 196, 1)',
          'rgba(52, 0, 156, 1)',
          'rgba(247, 123, 0, 1)',
          'rgba(255, 0, 85, 1)',
          'rgba(21, 255, 0, 1)',
          'rgba(183, 250, 0, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(131, 100, 70, 1)',
          'rgba(128, 128, 128, 1)',
          'rgba(204, 0, 245, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  });
}


function runPieChart() {
  // chart code thanks to https://www.chartjs.org/docs/latest/
  var ctx = document.getElementById('product-pie-chart').getContext('2d');
  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      // what does labels do?
      labels: getProducts('name'),
      // what does datasets do?
      // it's an array of objects
      datasets: [{
        // what does this label do?
        // key, legend
        label: 'Clickshare',
        // what does this data do?
        // actually the values in the chart
        data: getProducts('clickShare'),
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(253, 11, 11, 0.4)',
          'rgba(14, 10, 247, 0.4)',
          'rgba(238, 255, 0, 0.4)',
          'rgba(0, 250, 196, 0.4)',
          'rgba(52, 0, 156, 0.4)',
          'rgba(247, 123, 0, 0.4)',
          'rgba(255, 0, 85, 0.4)',
          'rgba(21, 255, 0, 0.4)',
          'rgba(183, 250, 0, 0.4)',
          'rgba(255, 255, 255, 0.4)',
          'rgba(0, 0, 0, 0.4)',
          'rgba(131, 100, 70, 0.4)',
          'rgba(128, 128, 128, 0.4)',
          'rgba(204, 0, 245, 0.4)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(253, 11, 11, 1)',
          'rgba(14, 10, 247, 1)',
          'rgba(238, 255, 0, 1)',
          'rgba(0, 250, 196, 1)',
          'rgba(52, 0, 156, 1)',
          'rgba(247, 123, 0, 1)',
          'rgba(255, 0, 85, 1)',
          'rgba(21, 255, 0, 1)',
          'rgba(183, 250, 0, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(131, 100, 70, 1)',
          'rgba(128, 128, 128, 1)',
          'rgba(204, 0, 245, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  });
}




for(let i = 0; i < imageElements.length; i++) {
  console.log('Events are happening');
  imageElements[i].addEventListener('click', productVote);
}
