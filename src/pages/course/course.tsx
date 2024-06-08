import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const data: Lessons[] = [
  {
    id: "1",
    name: "English",
    description: "lorem ipsum",
    lessons_count: 5,
    duration: 112,
  },
];

export type Lessons = {
  id: string;
  name: string;
  description: string;
  lessons_count: number;
  duration: number;
};

const columns: ColumnDef<Lessons>[] = [
  {
    accessorKey: "name",
    header: "Kurs nomi",
  },
  {
    accessorKey: "description",
    header: "Tavfsifi",
  },
  {
    accessorKey: "lessons_count",
    header: "Darslar soni",
  },
  {
    accessorKey: "duration",
    header: "Davomiyligi",
  },
  {
    id: "actions",
    header: "Taxrirlash",
    cell: () => {
      return (
        <div className="gap-2 flex">
          <Button className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
          <Button className="h-8 w-8 p-0">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="destructive" className="h-8 w-8 p-0">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

const Course = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Course;
