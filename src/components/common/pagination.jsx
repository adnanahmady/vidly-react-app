import React, { Component } from 'react';
import _ from 'lodash';
import propTypes from 'prop-types';

class Pagination extends Component {
  pages = () => {
    const {
      itemsInPage,
      currentPage,
      onPaginate,
      moviesItemsCount
    } = this.props;
    const count = _.range(1, _.ceil(moviesItemsCount / itemsInPage) + 1);
    if (count.length < 2) return null;

    return count.map(index => {
      let itemClass = 'page-item';
      itemClass += (currentPage === index) ? ' active' : '';

      return (
        <li key={index} className={itemClass}>
          <button className="page-link" onClick={() => onPaginate(index)}>
            {index}
          </button>
        </li>
      );
    });
  }

  render() {
    return (
      <nav aria-label="pagination">
        <ul className="pagination justify-content-center">
          {this.pages()}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsInPage: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPaginate: propTypes.func.isRequired,
  moviesItemsCount: propTypes.number.isRequired
};

export default Pagination;