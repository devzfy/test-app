import { tableData } from "@/assets/data";
import useGetData from "@/components/hooks/getdata";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pen, Trash, Play } from "lucide-react";
const Course = () => {
    const [loading, data, error] = useGetData('courses/active')
    if(loading) return 'Loading'
    if(error) return alert(error)
    console.log(data.data, 'data');
        

    
  return (
    <div className="w-full  border-2 rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg">Kurs nomi</TableHead>
            <TableHead className="text-lg">Tavfsifi</TableHead>
            <TableHead className="text-lg">Dars soni</TableHead>
            <TableHead className="text-lg">Davomiyligi</TableHead>
            <TableHead className="text-lg">Taxrirlash</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((el, index) => (
            <TableRow key={index} className="border-b-2 border-t-2">
              <TableCell className="font-bold text-base py-2">
                {el.name}
              </TableCell>
              <TableCell className="font-medium text-base py-2">
                {el.about}
              </TableCell>
              <TableCell className="font-medium text-base py-2 flex gap-1 items-center">
                <Play className="w-4 h-4" /> {el.count}
              </TableCell>
              <TableCell className="font-medium text-base py-2">
                {el.time}
              </TableCell>
              <TableCell className="gap-2 flex py-2">
                <Button className="w-[40px] h-[40px] p-1">
                  <Eye className="w-4" />
                </Button>
                <Button className="w-[40px] h-[40px] p-1">
                  <Pen className="w-4" />
                </Button>
                <Button variant="destructive" className="w-[40px] h-[40px] p-1">
                  <Trash className="w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Course;
