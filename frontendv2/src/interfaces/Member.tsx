import { List } from "./List";

interface Member {
    _id: object;
    firstname: string;
    lastname: string;
    student_number: number;
    role: string;
    list: List;
}
export { Member };
