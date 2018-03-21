import React from 'react';

const Th = props => (
  <th>
    <a href="" onClick={(e) => props.onHeaderClick(e, props.field)}>
      {props.field}
      {props.sort === props.field && props.direction === 'ASC' && <span>&#8593;</span>}
      {props.sort === props.field && props.direction === 'DESC' && <span>&#8595;</span>}
    </a>
  </th>
);

export default Th;
