import { FC, useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import HeaderLayout from "../../Layouts/HeaderLayout";
import {formatDate, formatTime} from "../../Components/DateTimeFormat";

type Props = {
    events: [],
    mentors: []
}

type Event = {
    id: number,
    date: string,
    start: string,
    end: string
}

const Index: FC<Props> = ({events, mentors}) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        date: "",
        mentors_id: [0]
    })

    const handleInputChange = (e:any, index:any) => {
        const newInputs = [...data.mentors_id];
        newInputs[index] = Number(e.target.value);
        setData("mentors_id", newInputs);
    }

    const handleAddInput = () => {
        setData("mentors_id", [...data.mentors_id, 0]);
    }

    return (
        <HeaderLayout>
            <form onSubmit={(e) => {
                e.preventDefault();
                post(route("event.store"));
                reset();
            }}>
                <input type="datetime-local" onChange={(e) => setData("date", e.target.value)}/>

                {data.mentors_id.map((mentor_id:any, index) => (
                    <select onChange={(e) => handleInputChange(e, index)} key={index}>
                        <option value="0">メンターを選択</option>
                        {mentors.map((mentor: any) => (
                            <option value={mentor.id} key={mentor.id}>{mentor.name}</option>
                        ))}
                    </select>
                ))}
                <button type="button" onClick={handleAddInput}>メンター追加</button>

                <button type="submit" className="block">送信</button>
            </form>

            <h2>日程一覧</h2>
            {events.map((event: any) => (
                <div key={event.id} className="p-1">
                    <h2>{formatDate(event.date)} {formatTime(event.date)}</h2>
                    {event.mentors.map((mentor: any, index:number) => (
                        <div key={index}>
                            <p>{mentor.name}</p>
                        </div>
                    ))}
                </div>
            ))}
        </HeaderLayout>
    )
}

export default Index;