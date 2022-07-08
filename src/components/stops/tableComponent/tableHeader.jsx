import React, { Component } from 'react'
class TableHeader extends Component {
  render() {
    return (
      <thead id="tableHeader">
        <tr>
          {this.props.columns.map((column) => (
            <th className="clickable" key={column.refId}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    )
  }
}
export default TableHeader
