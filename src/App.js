import React, { Component } from 'react';
import './App.css';
import ReactModal from './Modal/ReactModal'
import { SEARCH_API, postData } from './API/API'
import Loader from './Loader/Loader'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alldata: null,
      data: null,
      openModal: false,
      searchBarData: '',
      isData: false,
    }
  }


  openModal = (data) => {
    this.setState({ data: data, openModal: true })
  }

  getJson = (bool) => {
    if (!this.state.openModal) {
      let data = JSON.parse(this.state.alldata)
      if (bool) {
        return (
          data.map((data, i) => {
            return <li key={i} onClick={this.openModal.bind(this, data)}> {data.business_name} </li>
          })
        )
      }
    }
  }

  onclose = () => {
    this.setState({ openModal: false })
  }

  closeSearch = () => {
    this.setState({ hideSearchBar: true })
  }

  getData = () => {
    this.setState({ isLoading: true })
    postData(SEARCH_API, { title: this.state.searchBarData })
      .then(data => this.setState({ alldata: JSON.stringify(data), isData: true, isLoading: false })) // JSON-string from `response.json()` call
      .catch(error => this.setState({ alldata: null, isLoading: false }));
  }

  handleChange = (event) => {
    this.setState({
      searchBarData: event.target.value,
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <div className="maindisplay">
              <div id="myOverlay" className="overlay">
                <div className="overlay-content">
                  <input type="text" placeholder="Search.." onChange={this.handleChange.bind(this)} name="search" />
                  <button onClick={this.getData}><i className="fa fa-search"></i>Seacrh</button>
                </div>
              </div>
              {
                <div className="jsongrid">
                  {this.getJson(this.state.isData)}
                </div>
              }
              {
                this.state.isLoading ? <div className="loader"><Loader /> </div> : null
              }
            </div>
            {
              this.state.openModal ?
                <ReactModal data={this.state.data} open={this.state.openModal} close={this.onclose} /> : null
            }
          </header>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
