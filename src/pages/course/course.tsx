import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Pencil, Trash2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useGet from '@/components/hooks/useGet';
import { useEffect, useState } from 'react';

export type Lessons = {
  id: string;
  name: string;
  description: string;
  lessons_count: number;
  duration: number;
};

interface errRes  {
  error: boolean;
  message: string
}

interface resData {
  data: any;
  error: boolean;
  message: string
}

const columns: ColumnDef<Lessons>[] = [
  {
    accessorKey: 'name',
    header: 'Kurs nomi',
  },
  {
    accessorKey: 'description',
    header: 'Tavfsifi',
  },
  {
    accessorKey: 'lessons_count',
    header: 'Darslar soni',
    cell: () => (
      <div className="flex items-center gap-1">
        <Play className="w-4 h-4" />
        <span>60</span>
      </div>
    ),
  },
  {
    accessorKey: 'duration',
    header: 'Davomiyligi',
  },
  {
    id: 'actions',
    header: 'Taxrirlash',
    cell: () => (
      <div className="flex gap-2">
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
    ),
  },
];

const Course = () => {
  const { data: result, error, isLoading } = useGet({ url: 'courses/active', name: 'courses' });
  const [data, setData] = useState<Lessons[]>([]);

  useEffect(() => {
    if (result) {
      const resultData = result as resData
      setData([resultData.data]);
    }
  }, [result]);
  console.log(data, 'data');
  

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)  {
    const err = error as errRes 
    return <div>{err.message}</div>;
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
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