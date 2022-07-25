import React from "react";
import { Table } from "react-bootstrap";

function List(props) {
  const {header,data} = props;
  return (
    <div>
      <Table className="border">
        <thead>
          <tr>
            {header?.map(item =>(
                <th key={item.key}>
                    <h6 className="mb-0">{item.label}</h6>
                </th>
            ))}
          </tr>
        </thead>
        <tbody>
            {data?.map(dataItem =>(
             <tr key={dataItem.iban}>
                {header?.map(headerItem=>(
                  <td key={headerItem.key}>
                    {headerItem.view ? headerItem.view(dataItem) : dataItem[headerItem.key]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default List;
