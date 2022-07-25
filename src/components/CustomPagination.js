import React from 'react';
import { Pagination } from 'react-bootstrap';

function CustomPagination(props) {
    const {currentPage, maxPage ,onPageGoTo} = props
    let items = [];
    for (let number = 1; number <= maxPage; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => onPageGoTo(number)}>
            {number}
            </Pagination.Item>,
        );
    }
    return (
        <div>
           <Pagination>{items}</Pagination>
        </div>
    );
}

export default CustomPagination;