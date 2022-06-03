/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useRef } from 'react';

function SubRows({ row, rowProps, visibleColumns, data, loading }) {
  if (loading) {
    return (
      <tr>
        <td />
        <td colSpan={visibleColumns.length - 1}>Loading...</td>
      </tr>
    );
  }

  return (
    <>
      {data && (
        <>
          {data.map((x, i) => {
            return (
              <tr
                {...rowProps}
                key={`${rowProps.key}-expanded-${i}`}
                className="border-bottom-1 row_sub_component"
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="px-2 py-3">
                      {cell.render(cell.column.SubCell ? 'SubCell' : 'Cell', {
                        value: cell.column.accessor && cell.column.accessor(x, i),
                        row: { ...row, original: x },
                      })}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </>
      )}
    </>
  );
}

const SubRowAsync = ({ row, rowProps, visibleColumns, listViewModel, idKey }) => {
  const [loading, setLoading] = React.useState(true);

  let data = useRef([]);

  React.useEffect(() => {
    (async function () {
      try {
        if (idKey) {
          data.current = await listViewModel?.getContentByIdExpanded(row.original[idKey]);
        }

        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [listViewModel, row, idKey]);

  return (
    <SubRows
      row={row}
      rowProps={rowProps}
      visibleColumns={visibleColumns}
      data={data.current}
      loading={loading}
    />
  );
};

export default SubRowAsync;
