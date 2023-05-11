import { FC } from "react";
import { useForm } from "@inertiajs/react";
import HeaderLayout from "../../Layouts/HeaderLayout";

type Mentor = {
    id: number,
    name: string
}

type Props = {
    mentors: []
}

const Index: FC<Props> = ({mentors}) => {
    const { data, setData, post, processing, errors, reset } = useForm();


    return (
        <HeaderLayout>
            <form onSubmit={(e) => {
                e.preventDefault();
                post(route("mentor.store"));
                reset();
            }}>
                <label htmlFor="name" className="block">名前</label>
                <input type="text" name="name[]" onChange={(e) => setData("name", e.target.value)} />

                <button type="submit" className="block">送信</button>
            </form>

            <h2 className="pt-5">メンター一覧</h2>
            {mentors.map((mentor: Mentor) => (
                <div key={mentor.id} className="p-1">
                    <p>{mentor.name}</p>
                </div>
            ))}
        </HeaderLayout>
    )
}

export default Index;