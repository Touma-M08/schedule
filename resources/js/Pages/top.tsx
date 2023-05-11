import { FC, useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import HeaderLayout from "../Layouts/HeaderLayout";
import {formatDate, formatTime} from "../Components/DateTimeFormat";

const Welcome = ({events, categories}:any, props: any ) => {
    const [array, setArray] = useState<any>([]);
    const {data, setData, post} = useForm<any>({
        array: []
    });


    useEffect(() => {
        const rows = events.length;
        const newArray:any = Array(rows).fill(null).map(() => Array(5).fill(null).map(()=>[]));
        events.map((event:any, eveIn:number) => (
            event.categories.map((category:any) => (
                newArray[eveIn][category.id-1].push({id:category.pivot.student.id,name:category.pivot.student.name})
            ))
        ));

        setArray(newArray);

        setData("array", Array(rows).fill(null).map(() => Array(1).fill(null).map(()=>[0,0,[0]])));
    },[]);

    const handleChange = (eveIn:number, index:number, e:number, num:number, stuNum?:number) => {
        const newArray = data.array;
        stuNum != undefined ? newArray[eveIn][index][num][stuNum] = e : newArray[eveIn][index][num] = e;
        console.log(newArray);
        setData("array", newArray);
    }

    const selectCategory = (event:any) => {
        const map = new Map(event.categories.map((eveCat:any) => [eveCat.id, eveCat.name]))
        const selectCat:any = [];

        map.forEach((value:any,key:any) => {
            selectCat.push({id:key, name:value});
        })
        
        return (
            <>
                <option value="0">部門を選択</option>
                {selectCat.map((cat:any) => (
                    <option value={cat.id}>{cat.name}</option>
                ))}
            </>
        )
    }

    const addMentor = (eveIn:number) => {
        const newArray = data.array;
        newArray[eveIn].push([0,0,[0]]);
        console.log(newArray);
        setData("array", newArray);
    }

    const selectStudent = (eveIn:number, index:number) => {
        let a = data.array[eveIn][index][1]-1;
        if(a == -1) {
            a = 0
        }

        return (
            <>
                <option value="0">生徒を選択</option>
                {array[eveIn][a].map((value:any,index:number) => (
                    <option key={index} value={value.id}>{value.name}</option>
                ))}
            </>
        )
    }

    const addStudent = (eveIn:number, index:number) => {
        const newArray = data.array;
        newArray[eveIn][index][2].push(0);
        setData("array", newArray);
        console.log(data.array);
    }

    if(array.length === 0 || data.array.length == 0) {
        return (
            <HeaderLayout>
                <p>Loading...</p>
            </HeaderLayout>
        )
    }

    return (
        <HeaderLayout>
            {events.map((event:any, eveIn:number) => (
                <div key={event.id} className="mb-3 ml-3">
                    <h2>{formatDate(event.date)} {formatTime(event.date)}</h2>

                    <div className="flex">
                        {categories.map((category:any, catIn:number) => (
                            <div key={event.id/category.id} className="ml-3">
                                <h3 >{category.name}</h3>
                                
                                {array[eveIn][category.id-1].map((value:any,index:number) => (
                                    <p key={index} className="text-center">{value.name}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                    
                    {data.array[eveIn].map((value:any, index:number) => (
                        <div>
                            <select onChange={(e) => handleChange(eveIn, index, Number(e.target.value), 0)}>
                                <option value="0">メンターを選択</option>
                                {event.mentors.map((mentor:any) => (
                                    <option value={mentor.id}>{mentor.name}</option>
                                ))}
                            </select>
                            
                            <select onChange={(e) => handleChange(eveIn, index, Number(e.target.value), 1)}>
                                {selectCategory(event)}
                            </select>
                            
                            {data.array[eveIn][index][2].map((val:any, stuNum:number) => (
                                <select onChange={(e) => handleChange(eveIn, index, Number(e.target.value), 2, stuNum)}>
                                    {selectStudent(eveIn, index)}
                                </select>
                            ))}
                            <button onClick={() => addStudent(eveIn, index)}>生徒追加</button>
                        </div>
                    ))}

                    <button onClick={() => addMentor(eveIn)}>メンター追加</button>

                </div>
            ))}
        </HeaderLayout>
    );
}

export default Welcome;
