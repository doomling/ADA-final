import React, { Component } from 'react';
import ProductList from '../ProductList/ProductList'
import qs from 'query-string'
import Breadcrum from '../Breadcrum/Breadcrum';

class ResultsView extends Component {
  constructor(props) {
   super(props)
   this.state = {
    showError: false,
    }
  }

 async componentDidMount() {
    const search = qs.parse(this.props.location.search).search
    const getSearch = await fetch('http://localhost:3001/api/items?q=' + search)
      const getSearchJson = await getSearch.json()
    
      if (getSearch.status != 200) {
        this.setState({
          showError: true,
        })
      } else {
          this.setState({
            data: getSearchJson,
            search: search,
            showError: false,
          })
        }
      }

  async componentDidUpdate(prevProps, prevState) {
    const search = qs.parse(this.props.location.search).search

    if(prevState.search != search) {
      const getSearch = await fetch('http://localhost:3001/api/items?q=' + search)
      const getSearchJson = await getSearch.json()
    
      if (getSearch.status != 200) {
        this.setState({
          showError: true,
        })
      } else {
          this.setState({
            data: getSearchJson,
            search: search,
            showError: false,
          })
        }
      }
    }

 render() {
    return (
      <div className="home">
        {this.state.showError && <h1> No se encontraron resultados para tu búsqueda </h1>}
        {this.state.data &&
          <Breadcrum value={this.state.data.categories}/>}
          {this.state.data &&
          this.state.data.items.map((value, i) => {
              let free
                  if (value.free_shipping) {
                      free = true
                  } else {
                      free = false
                  }
            return (
              <ProductList key={i} 
                  img={value.picture} 
                  title={value.title} 
                  price={value.price.amount}
                  decimals={value.price.decimals}
                  location={value.location}
                  shipping={free}
                  id={value.id}
              />
          )}
       )}
      </div>
     );
   }
 }

 export default ResultsView; 
