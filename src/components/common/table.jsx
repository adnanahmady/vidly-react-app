import React, { Component } from 'react';
import TableHeader from './table-header';
import TableBody from './table-body';

class Table extends Component {
  render() {
    const {
      sortColumn,
      onSort,
      columns,
      data,
    } = this.props;

    return (
      <table className="table table-light table-hover">
        <TableHeader
          onSort={onSort}
          columns={columns}
          sortColumn={sortColumn}
        />
        <TableBody
          columns={columns}
          data={data}
        />
      </table>);
  }
}

export default Table;