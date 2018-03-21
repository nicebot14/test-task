import React, { Component } from 'react';
import Table from './Components/Table/Table';
import axios from 'axios';
import { compare } from "./utils";
import './App.css';

const columnSettings = {
  'Countries': {
    className: 'center-ceil'
  },
  'LifeDuration': {
    className: 'center-ceil'
  },
  'Cities': {
    className: 'center-ceil'
  },
  'Languages': {
    className: 'center-ceil'
  },
};

class App extends Component {
  state = {
    regions: [],
    sort: 'Continent',
    direction: 'ASC',
    browserMode: false,
  };

  render() {
    return (
      <div className="app">
        <h1>World database test</h1>

        {!this.state.browserMode ?
          <button onClick={this.handleChangeMode}>SERVER MODE</button> :
          <button onClick={this.handleChangeMode}>BROWSER MODE</button>
        }

        {!this.state.regions.length ?
          'Loading...' :
          <Table
            fields={['Continent', 'Region', 'Countries', 'LifeDuration', 'Population', 'Cities', 'Languages']}
            sort={this.state.sort}
            direction={this.state.direction}
            rows={this.state.regions}
            columnSettings={columnSettings}
            onHeaderClick={this.handleHeaderClick} />
        }
      </div>
    );
  }

  componentDidMount() {
    this.updateRegions(this.state.sort, this.state.direction);
  }

  updateRegions() {
    if (!this.state.browserMode) {
      axios
        .get(`http://127.0.0.1/countries.php?sort=${this.state.sort}&direction=${this.state.direction}`)
        .then((result) => {
          this.setState({ regions: result.data });
        })
      ;
    } else {
      const newRegions = this.state.regions.slice();
      newRegions.sort(compare(this.state.sort, this.state.direction));

      this.setState({ regions: newRegions });
    }
  }

  handleChangeMode = () => {
    this.setState({
      browserMode: !this.state.browserMode
    }, this.updateRegions);
  };

  handleHeaderClick = (e, sort) => {
    e.preventDefault();

    let newDirection = this.state.direction;

    if (this.state.sort === sort) {
      newDirection = this.state.direction === 'ASC' ? 'DESC': 'ASC';
    }

    this.setState({
      sort: sort,
      direction: newDirection
    }, this.updateRegions);
  };
}

export default App;
