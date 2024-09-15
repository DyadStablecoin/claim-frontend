import {
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
  Table,
} from "@nextui-org/table";
import React, { useState } from "react";

type Alignment = "left" | "center" | "right";

interface TableComponentProps {
  columns: any;
  rows: any;
  size?: "default" | "compact";
  onRowClick?: (key: string) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  rows,
  onRowClick,
  size = "default",
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  const parseValue = (value: string) => {
    if (value === undefined || value === "") return 0;
    value = String(value);
    // Remove any non-numeric characters except for '.' and '-'
    const numericValue = value.replace(/[^\d.-]/g, "");
    return parseFloat(numericValue);
  };

  const sortedRows = React.useMemo(() => {
    let sortableRows = [...rows];
    if (sortConfig !== null) {
      sortableRows.sort((a, b) => {
        const aValue = parseValue(getKeyValue(a, sortConfig.key));
        const bValue = parseValue(getKeyValue(b, sortConfig.key));

        if (!aValue) return 1;
        if (!bValue) return -1;

        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableRows;
  }, [rows, sortConfig]);

  const requestSort = (key: string) => {
    setSortConfig((oldValue) => {
      let direction = "ascending";
      if (
        oldValue 
        && oldValue.key === key 
        && oldValue.direction === "ascending") {
        direction = "descending";
      }
      return { key, direction };
    })
  };

  const classAlignment = {
    right: "text-right",
    center: "text-center",
    left: "text-left",
  }

  const getAlignment = (columnKey: any, columns: any) => {  
    const column = columns.find((col: any) => col.key === columnKey);
    if (column?.align) {
      return classAlignment[column.align as Alignment];
    }
  }

  return (
    <div className="h-full overflow-scroll">
      <Table
        aria-label="Table"
        removeWrapper
        shadow="none"
        classNames={{
          th: " table-header text-center",
          tbody: "px-2 h-full ",
          tr: `${onRowClick ? "cursor-pointer hover:text-[#a1a1aa]" : ""} ${
            size === "compact" ? "h-[35px]" : "h-[50px]"
          } table-row `,
          td: "px-0 pl-2 pr-2",
        }}
      >
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.key}
              onClick={() => requestSort(column.sortKey || column.key)}
              style={{ cursor: "pointer" }}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sortedRows}>
          {(item: any) => (
            <TableRow
              key={item.key}
              onClick={onRowClick ? () => onRowClick(item.key) : () => {}}
            >
              {(columnKey) => (
                <TableCell className={getAlignment(columnKey, columns)}>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default TableComponent;
