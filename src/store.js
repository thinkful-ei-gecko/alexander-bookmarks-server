const uuid = require('uuid');

module.exports = [

  {
    id: uuid(),
    title: 'Fish Finder',
    link: 'http://www.fishfinder.com',
    desc: '404: Fish are friends, not found.',
    rating: 5
  },

  {
    id: uuid(),
    title: 'Food Finder',
    link: 'http://www.foodfinder.com',
    desc: '404: Food are friends, not fish.',
    rating: 3
  }

];