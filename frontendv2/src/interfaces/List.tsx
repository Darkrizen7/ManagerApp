import { IMember } from 'interfaces/Member';
class IList {
    _id: object;
    name: string;
    campagne: string;
    members: Array<IMember>;
}
export { IList };
