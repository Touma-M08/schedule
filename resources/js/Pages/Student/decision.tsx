import { useState, useEffect, FormEvent } from "react";
import { useForm } from "@inertiajs/react";
import HeaderLayout from "../../Layouts/HeaderLayout";
import {formatDate, formatTime} from "../../Components/DateTimeFormat";


const Decision = ({events, students, categories}:any, props:any) => {
  const { data, setData, post, processing, errors, reset } = useForm<any>({
    array: []
  })

  const [eveArray, setEveArray] = useState<any>([]);

  useEffect(() => {
    const rows = students.length;
    const cols = events.length;

    const initialArrays = Array(rows).fill(null).map(() => Array(cols).fill([0,0]));
    initialArrays.map((initialArray, index) => (
      initialArray.unshift(students[index].id)
    ))
    setData("array", initialArrays);

    const arrays:any = Array(rows).fill(null).map(() => []);
    students.map((student:any, stuIn:number) => (
      student.events.map((event:any) => (
        arrays[stuIn].push(event.id)
      ))
    ));

    setEveArray(arrays);
  }, [])
  
  const handleChange = (stuIn:number, eveId:number, cateId:number) => {
    const newArray = data.array;
    newArray[stuIn][eveId] = [eveId, cateId];
    setData("array", newArray);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route("decision.store"));
  }
  if(eveArray.length === 0) {
    return (
      <p>Loading...</p>
    )
  }
  
  return (
    <HeaderLayout>
      <table style={{border: "solid red 1px"}}>
        <tbody>
        <tr>
          <th></th>
          {events.map((event:any) => (
            <th key={event.id}>
              {formatDate(event.date)}<br/> {formatTime(event.date)}
            </th>
          ))}
        </tr>
        

        {students.map((student:any, stuIndex:number) => (
          <tr key={student.id}>
            <td>{student.name}/{student.entry.time}</td>
            {events.map((event:any) => (
              <td key={student.id/event.id}>
                {eveArray[stuIndex].includes(event.id) ?
                <select onChange={(e) => handleChange(stuIndex, event.id, Number(e.target.value))} form="data">
                  <option value="0">部門を選択</option>
                  {categories.map((category:any) => (
                    <option value={category.id} key={student.id/event.id/category.id}>{category.name}</option>
                  ))}
                </select>
                :""}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit} id="data">
        <button type="submit">登録</button>
      </form>
    </HeaderLayout>
  );
}

export default Decision;