import React, { Component } from 'react'
import renderCell from '../../../utilts/calUtils'

class TableBody extends Component {
  render() {
    const { data, columns } = this.props
    return (
      <tbody id="tableBody">
        {data.map((stopInfo, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={index + column.refId}>
                {column.refId === 'delay' &&
                renderCell(stopInfo, column).toString().includes('Delayed') ? (
                  <span id="delay">{renderCell(stopInfo, column)}</span>
                ) : (
                  <div>{renderCell(stopInfo, column)}</div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    )
  }
}
export default TableBody
