import React, { Component } from 'react';
import TableRow from './table-row';

class TableBody extends Component {
  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>{
              columns.map((column, index) => (
                <TableRow
                  key={index}
                  item={item}
                  column={column}
                />
              ))
            }
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;