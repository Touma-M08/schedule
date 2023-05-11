import { FC } from "react";
import { Link, usePage } from "@inertiajs/react";

type Props = {
    children: React.ReactNode,
}

const HeaderLayout: FC<Props> = ({children}) => {
    const { component } = usePage();
    return (
        <>
            <header>
                <ul className="flex">
                    <li>
                        <Link href={route("mentor.index")} className={component == "Mentor/index" ? "font-bold": ""}>
                            メンター
                        </Link>
                    </li>
                    <li className="ml-3">
                        <Link href={route("event.index")} className={component == "Event/index" ? "font-bold": ""}>
                            日程/担当メンター
                        </Link>
                    </li>
                    <li className="ml-3">
                        <Link href={route("student.index")} className={component == "Student/index" ? "font-bold": ""}>
                            生徒
                        </Link>
                    </li>
                    <li className="ml-3">
                        <Link href={route("decision.create")} className={component == "Student/decision" ? "font-bold": ""}>
                            部門/日程選択
                        </Link>
                    </li>
                    <li className="ml-3">
                        <Link href={route("top")} className={component == "top" ? "font-bold": ""}>
                            トップ
                        </Link>
                    </li>
                </ul>
            </header>

            <main>{children}</main>
        </>
    )
}

export default HeaderLayout;