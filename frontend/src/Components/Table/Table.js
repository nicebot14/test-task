import React from 'react';
import Th from './Th';

import './Table.css';

const Table = props => (
  <table>
    <thead>
      <tr>
        {props.fields.map(field => <Th
          key={field}
          field={field}
          onHeaderClick={props.onHeaderClick}
          sort={props.sort}
          direction={props.direction} />)}
      </tr>
    </thead>
    <tbody>
      {props.rows.map(row => {
        return (
          <tr key={row.Region}>
            {props.fields.map(field => <td {...props.columnSettings[field]} key={field}>{row[field]}</td>)}
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default Table;
