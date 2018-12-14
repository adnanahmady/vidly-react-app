import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import _ from 'lodash';

class TableRow extends Component {
  getContent = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  }

  render() {
    const { item, column } = this.props;

    return (
      <td>{this.getContent(item, column)}</td>
    );
  }
}

export default TableRow;