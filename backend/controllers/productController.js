let self = {}
var restler = require('restler');
const externalApi = require('../services/productService')

const author = {
  name: 'Belén',
  lastname: 'Rey',
}

getCategory = function(data) {
  let selectedCategory = {
      name: [],
      id: '',
      results: 0
    } 

  if(data.filters.length <= 0) {
    let categoryPos = data.available_filters.map(function(e){
      return e.id;
    }).indexOf('category');

    const availableCategories = data.available_filters[categoryPos].values

    // get the category with most results 
    
    for (var i = 0; i < availableCategories.length; i++ ) {
      if (selectedCategory.results < availableCategories[i].results) {
        selectedCategory.results = availableCategories[i].results
        selectedCategory.name = availableCategories[i].name
        selectedCategory.id = availableCategories[i].id
      }  
    }
    return selectedCategory
  }
  else {
    const currentFilters = data.filters[0].values[0].path_from_root
    for(var i = 0; i < currentFilters.length; i++) {
      selectedCategory.name.push(currentFilters[i].name)
    }    
    //selectedCategory = data.filters[0].values[0].path_from_root
    console.log('vengo de filter', selectedCategory)
    return selectedCategory
  }
}

getAmount = function(price) {
  price = price.toString()
  console.log(price)
  if (price.indexOf('.') > -1) {
   return amount = parseInt(price.slice(0, price.indexOf('.')))
 } else {
   return amount = parseInt(price)
 }
}
// 7.5
getDecimals = function(price) {
price = price.toString()
 if (price.indexOf('.') > -1) {
   return decimals = parseInt(price.slice(price.indexOf('.')+1))
 } else {
   return decimals = 0
 }
}

getItemsPerPage = function(data) {
  let items = []

  for(var i = 0; i < data.results.length; i++) {

    console.log('hola soy price',data.results[i].price)

    const amount = getAmount(data.results[i].price)
    const decimals = getDecimals(data.results[i].price)

    console.log('hola soy price',amount, '  aaa   ',decimals)

    items[i] = {
      id: data.results[i].id,
      title: data.results[i].title,
      price: {
        currency: data.results[i].currency_id,
        amount: amount,
        decimals: decimals,
      },
      picture: data.results[i].thumbnail,
      location: data.results[i].address.state_name,
      condition: data.results[i].condition,
      free_shipping: data.results[i].shipping.free_shipping
    }
  }
  return items
}

self.getProducts = function(req, res) {
    let search = req.query.q
      externalApi.getProductData(search).then(function(data) {
        const selectedCategory = getCategory(data)

        let items = getItemsPerPage(data);
        const response = {
          author: {
            name: author.name,
            lastname: author.lastname,
          },
          categories: selectedCategory,
          items: items
        }

        return res.json(response)
      }).catch(function(err) {
        console.log(err)
      })
  }

  self.getProductById = function(req, res) {
    let id = req.params.id
    let description = ''

    console.log('lala', id)

      externalApi.getProductDescription(id).then(function(data) {
        console.log('esto es data', data)
        if (data.plain_text != "") {
          description = data.plain_text
        } else {
          description = 'Item sin descripción'
        }
      }).catch(function(err) {
        console.log(err)
      })

      externalApi.getProductById(id).then(function(data) {
        const amount = getAmount(data.price)
        const decimals = getDecimals(data.price)

        const response = {
          author: {
            name: author.name,
            lastname: author.lastname,
          },
            item: {     
            id: data.id, 
            title: data.title,
            price: {       
              currency: data.price.currency,       
              amount: amount,       
              decimals: decimals,   
            },     
              picture: data.pictures[0].url,     
              condition: data.condition,     
              free_shipping: data.free_shipping,     
              sold_quantity: data.sold_quantity,     
              description: description,   
              },
            } 
        return res.json(response)
      }).catch(function(err) {
        console.log(err)
      })
  }

  

  /*self.getProductDescription = function(req, res) {
    let id = req.params.id
    console.log(req.params)
    console.log(id)
      externalApi.getProductById(id).then(function(data) {
        return res.json(data)
      }).catch(function(err) {
        console.log(err)
      })
  }
*/
  /*
  {   
    “author”: {
           “name”: String
            “lastname”: String   },
            “item”: {     
              "id": String, 
              "title": String,
              "price": {       
                "currency": String,       
                "amount": Number,       
                "decimals": Number,   },     
                “picture”: String,     
                "condition": String,     
                "free_shipping": Boolean,     
                "sold_quantity", Number     
                "description": String   }
              } 
  */

module.exports = self
