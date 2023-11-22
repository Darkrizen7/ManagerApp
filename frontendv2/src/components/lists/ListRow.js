import { useHistory } from "react-router-dom";
const ListRow = (props) => {
    const history = useHistory();
    const { list, pending, handleAction } = props;
    const handleClick = (e) => {
        history.push("/lists/get/" + list._id)
    }
    return (
        <tr key={list._id} >
            <td onClick={handleClick}>{list.name}</td>
            <td onClick={handleClick}>{list.campagne}</td>
            <td onClick={handleClick} className="memberCount">{list.members.length}</td>
            <td>
                <button className="submit" type="submit" disabled={pending} onClick={() => { handleAction(list) }}>Retirer</button>
            </td>
        </tr>
    )
}
export { ListRow };