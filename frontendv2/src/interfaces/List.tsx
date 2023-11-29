import { Member } from 'interfaces/Member';
interface List {
    _id: object;
    name: string;
    campagne: string;
    members: Array<Member>;
}
export { List };
