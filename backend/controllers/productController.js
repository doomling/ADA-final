let self = {}
var restler = require('restler');
const externalApi = require('../services/productService')

const author = {
  name: 'Belén',
  lastname: 'Rey',
}

getCategory = function(data) {
  let selectedCategory = [] 

  let categories = {
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
      
      if (categories.results < availableCategories[i].results) {
        categories.results = availableCategories[i].results
        categories.name = availableCategories[i].name
        categories.id = availableCategories[i].id
      }  
    }
    selectedCategory.push(categories)
    return selectedCategory
  }
  else {
    const currentFilters = data.filters[0].values[0].path_from_root
    for(var i = 0; i < currentFilters.length; i++) {
      selectedCategory.push(currentFilters[i])
    }    
    return selectedCategory
  }
}

getAmount = function(price) {
  price = price.toString()
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

    const amount = getAmount(data.results[i].price)
    const decimals = getDecimals(data.results[i].price)

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
        let selectedCategory = []
        selectedCategory = getCategory(data)

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
    let amount = ''
    let decimals = ''
    selectedCategory = []

      externalApi.getProductById(id).then(function(data) {
        
      amount = getAmount(data.price)
      decimals = getDecimals(data.price)

        externalApi.getProductDescription(id).then(function(dataDescription) {
    
          if (dataDescription.plain_text != "") {
            description = dataDescription.plain_text
          } else {
            description = 'Item sin descripción'
          }

          let item = {     
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
              }
        
        externalApi.getProductCategories(data.category_id).then(function(dataCategories) {
          selectedCategory = dataCategories.path_from_root
          selectedCategory = dataCategories.path_from_root

        const response = {
          author: {
            name: author.name,
            lastname: author.lastname,
          },
            item: item,
            categories: selectedCategory,
            } 
        return res.json(response)
        }).catch(function(err){
          console.log(err)
        })
      }).catch(function(err) {
          console.log(err)
      })
    }).catch(function(err) {
        console.log(err)
    })
  }
  
module.exports = self
