let self = {}
var restler = require('restler');
const externalApi = require('../services/productService')

const author = {
  name: 'Belén',
  lastname: 'Rey',
}

self.getProducts = function(req, res) {
    let search = req.query.q
      externalApi.getProductData(search).then(function(data) {
        
        let categoryPos = data.available_filters.map(function(e){
          return e.id;
        }).indexOf('category');

        //const itemsToRender = 4
        console.log(data.results.length)

        getItemsPerPage = function(data) {
          let items = []
          for(var i = 0; i < data.results.length; i++) {
            items[i] = {
              id: data.results[i].id,
              title: data.results[i].title,
              price: {
                currency: data.results[i].currency_id,
                amount: data.results[i].price,
                decimals: 'number',
              },
              picture: data.results[i].thumbnail,
              location: data.results[i].address.state_name,
              condition: data.results[i].condition,
              free_shipping: data.results[i].shipping.free_shipping
            }
          }
          return items
        }

        let items = getItemsPerPage(data);
        
        
        const response = {
          author: {
            name: author.name,
            lastname: author.lastname,
          },
          categories: data.available_filters[categoryPos].values,
          items: items
        }

        return res.json(response)
      }).catch(function(err) {
        console.log(err)
      })
  }

  self.getProductById = function(req, res) {
    let id = req.params.id
    console.log(req.params)
    console.log(id)
      externalApi.getProductById(id).then(function(data) {
        return res.json(data)
      }).catch(function(err) {
        console.log(err)
      })
  }

module.exports = self
