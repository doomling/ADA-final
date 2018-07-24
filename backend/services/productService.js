let self = {}
const restler = require('restler');

const url = 'https://api.mercadolibre.com/'

// promises

self.getProductData = function (query) {
    let getProduct = new Promise(function(resolve, reject) {
    restler.get(url + 'sites/MLA/search?q=' + query + '&limit=4').on('success', function(result) {
      resolve(result)
    }).on('fail', function(err) {
      reject(err)
    })
  })
  return getProduct
}

self.getProductById = function (id) {
    let getProductById = new Promise(function(resolve, reject) {
    restler.get(url + 'items/​' + id).on('success', function(result) {
      resolve(result)
    }).on('fail', function(err) {
      reject(err)
    })
  })
  return getProductById
}

self.getProductDescription = function (id) {
  let getProductDescription = new Promise(function(resolve, reject) {
  restler.get( url + '/items/' + id + '/description').on('success', function(result) {
    resolve(result)
  }).on('fail', function(err) {
    reject(err)
  })
})
return getProductDescription
}

self.getProductCategories = function (id) {
 let getProductCategories = new Promise (function(resolve, reject) {
   restler.get('https://api.mercadolibre.com/categories/' + id).on('success', function(result){
     resolve(result)
   }).on('fail', function(err) {
     reject(err)
   })
 }) 
 return getProductCategories
}

module.exports = self
