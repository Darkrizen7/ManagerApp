import { List } from "primitives";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type IFormProps = {
    onSubmit: (data: any) => void,
    headerText: string,
    actionText: string,
    list?: List,
}
export const ListForm = (props: IFormProps): React.JSX.Element => {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: props.list,
    });
    useEffect(() => {
        if (!props.list) return;
        setValue("_id", props.list._id);
        setValue("name", props.list.name);
        setValue("campagne", props.list.campagne);
    }, [props.list, setValue])
    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="container">
            <div className="header">
                <div className="title">{props.headerText}</div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input {...register("pre_name")} placeholder="Nom Préselec" />
                </div>
                <div className="input">
                    <input {...register("name")} placeholder="Nom" />
                </div>
                <div className="input">
                    <select {...register("campagne")}>
                        <option value="">Sélectionner une option</option>
                        <option value="Ski Club">Ski Club</option>
                        <option value="Petit Paumé">Petit Paumé</option>
                        <option value="BDE">BDE</option>
                        <option value="BDA">BDA</option>
                    </select>
                </div>
            </div>
            <div className="submit-container">
                <button>{props.actionText}</button>
            </div>
        </form >
    )
}