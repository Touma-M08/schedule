import { FC, useEffect } from "react";
import HeaderLayout from "@/Layouts/HeaderLayout";
import { useForm } from "@inertiajs/react";
import {formatDate, formatTime} from "../../Components/DateTimeFormat";

type Props = {
    students: [],
    entries: []
}

type Entry = {
    id: number,
    time: string
}

type Student = {
    id: number,
    name: string,
    entry: Entry
}

const Index = ({students, entries, events}:any) => {
    const {data, setData, processing, errors, post, reset} = useForm<any>({
        name: "",
        entry_id: 0,
        possible_days: [],
    })

    useEffect(() => {
        const count = events.length;
        const array = Array(count).fill(null).map(() => false);
        setData("possible_days", array);
    },[]);

    useEffect(()=>{
        console.log(data.possible_days)
    }, [data]);

    const toggleButton = (index:number) => {
        const newArray = data.possible_days;
        newArray[index] = !newArray[index];
        setData("possible_days", newArray);
    }

    return (
        <HeaderLayout>
            <form onSubmit={(e) => {
                    e.preventDefault(),
                    post(route("student.store")),
                    reset()
                }
            }>
                <input type="text"  onChange={(e) => setData("name", e.target.value)} value={data.name}/>
                <select onChange={(e) => setData("entry_id", Number(e.target.value))}>
                    <option value="0">入学月</option>
                    {entries.map((entry: Entry) => (
                        <option value={entry.id} key={entry.id}>{entry.time}</option>
                    ))}
                </select>

                {events.map((event:any, index:number) => (
                    <div key={event.id}>
                        <label htmlFor={event.date}>{formatDate(event.date)} {formatTime(event.date)}</label>
                        <input type="checkbox" id={event.date} onClick={() => toggleButton(index)}/>
                    </div>
                ))}

                <button type="submit">送信</button>
            </form>

            {students.map((student: Student) => (
                <div key={student.id}>
                    <p>{student.name}</p>
                    <p>{student.entry.time}</p>
                </div>
            ))}
        </HeaderLayout>
    )
}

export default Index;