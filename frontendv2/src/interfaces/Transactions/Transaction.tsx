import { User } from 'interfaces/User';
import { List } from 'interfaces/List';
interface Transaction {
    _id: object;
    name: string;
    desc: string;
    amount_TTC: number;
    approved: boolean;
    type: string;
    list: List;
    created_at: Date;
    created_by: User;
    approved_by: User;
    approved_at: Date;
}
export { Transaction };
