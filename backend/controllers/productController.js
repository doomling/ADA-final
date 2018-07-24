let self = {}
const externalApi = require('../services/productService')

// author, required harcoded data

const author = {
  name: 'Belén',
  lastname: 'Rey',
}

getCategory = (data) => {
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

    // get the category with most results as required on the specs

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

getPriceDetails = (amount) => {
  console.log('juani')
  amount = amount.toString()
  let priceDetails = {
    price: '',
    decimals: '',
  }
  console.log(amount)
    if (amount.indexOf('.') == -1 ) {
      priceDetails.price = parseInt(amount)
      priceDetails.decimals = 0
      return priceDetails
    } else {
      priceDetails.price = parseInt(amount.slice(0, amount.indexOf('.')))
      priceDetails.decimals = parseInt(amount.slice(amount.indexOf('.')+ 1))
      if (priceDetails.decimals.length < 2) {
        priceDetails.decimals = priceDetails.decimals + '0'
        priceDetails.decimals = parseInt(priceDetails.decimals)
      }
      console.log(priceDetails)
      return priceDetails
    }
}

// get items per page

getItemsPerPage = (data) => {
  let items = []

  for(var i = 0; i < data.results.length; i++) {

    //const amount = getAmount(data.results[i].price)
    //const decimals = getDecimals(data.results[i].price)
    const price = getPriceDetails(data.results[i].price)
    console.log(price)

    items[i] = {
      id: data.results[i].id,
      title: data.results[i].title,
      price: {
        currency: data.results[i].currency_id,
        amount: price.price,
        decimals: price.decimals,
      },
      picture: data.results[i].thumbnail,
      location: data.results[i].address.state_name,
      condition: data.results[i].condition,
      free_shipping: data.results[i].shipping.free_shipping
    }
  }
  return items
}

// finally getting the products with all required fields.

self.getProducts = (req, res) => {
    let search = req.query.q
      externalApi.getProductData(search).then((data) => {
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
        return res.sendStatus(500);
      })
  }

  // getting products by id
  // it's currently way slower than what I'd like - TODO: Make it better somehow

  self.getProductById = (req, res) => {
    
    const id = req.params.id
    let description = ''
    selectedCategory = []

      externalApi.getProductById(id).then((data) => {
      
      // saving amount and decimals for later
      const price = getPriceDetails(data.price)

        externalApi.getProductDescription(id).then((dataDescription) => {
    
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
              amount: price.price,
              decimals: price.decimals,   
            },     
              picture: data.pictures[0].url,     
              condition: data.condition,     
              free_shipping: data.free_shipping,     
              sold_quantity: data.sold_quantity,     
              description: description,   
          }
        
        // another API call to get the product category

        externalApi.getProductCategories(data.category_id).then((dataCategories) => {
          selectedCategory = dataCategories.path_from_root
          
        // response model
        const response = {
          author: {
            name: author.name,
            lastname: author.lastname,
          },
            item: item,
            categories: selectedCategory,
          }

          return res.json(response)
        
        // gotta catch 'em all
        
        }).catch(function(err){
          return res.sendStatus(500);
        })
      }).catch(function(err) {
        return res.sendStatus(500);
      })
    }).catch(function(err) {
      return res.sendStatus(500);
  })
}
  
module.exports = self
