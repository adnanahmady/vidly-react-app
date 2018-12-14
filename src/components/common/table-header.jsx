import React, { Component } from 'react';

class TableHeader extends Component {
  pointer = {
    cursor: 'pointer'
  };

  checkSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }

    this.props.onSort(sortColumn);
  }

  renderSortColumn = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>
  }

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {
            columns.map((column, index) =>
              <th
                style={this.pointer}
                scope="col"
                key={index}
                onClick={() => this.checkSort(column.path)}
              >
                {column.label} {this.renderSortColumn(column)}
              </th>)
          }
        </tr>
      </thead>);
  }
}

export default TableHeader;