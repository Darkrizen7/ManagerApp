import { IUser } from 'interfaces/User';
import { IList } from 'interfaces/List';
class ITransaction {
    _id: string;
    name: string;
    desc: string;
    amount: number;
    approved: boolean;
    type: string;
    list: IList;
    created_at: Date;
    created_by: IUser;
    approved_by: IUser;
    approved_at: Date;
}
export { ITransaction };
