import { Member } from "primitives";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type IFormProps = {
    onSubmit: (data: any) => void,
    headerText: string,
    actionText: string,
    member?: Member,
}
export const MemberForm = (props: IFormProps): React.JSX.Element => {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: props.member,
    });
    useEffect(() => {
        if (!props.member) return;
        setValue("_id", props.member._id);
        setValue("list", props.member.list);
        setValue("surname", props.member.surname);
        setValue("lastname", props.member.lastname);
        setValue("email", props.member.email);
        setValue("student_number", props.member.student_number);
        setValue("phone", props.member.phone);
        setValue("support", props.member.support);
        setValue("role", props.member.role);
    }, [props.member, setValue])
    return (
        <form onSubmit={handleSubmit((data: any) => props.onSubmit(data))} className="container">
            <div className="header">
                <div className="title">{props.headerText}</div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input {...register("surname")} placeholder="Prénom" />
                </div>
                <div className="input">
                    <input {...register("lastname")} placeholder="Nom" />
                </div>
                <div className="input">
                    <input {...register("email")} placeholder="Email" type="email" />
                </div>
                <div className="input">
                    <input {...register("student_number")} placeholder="Numéro étudiant" type="number" />
                </div>
                <div className="input">
                    <input {...register("phone")} placeholder="Téléphone" type="tel" />
                </div>
                <div className="input">
                    <label>Soutient :</label>
                    <input {...register("support")} placeholder="Soutiens" type="checkbox" />
                </div>
                <div className="input">
                    <select {...register("role")} >
                        <option value="RCorpo">RCorpo</option>
                        <option value="RDem">Respo démarchage</option>
                        <option value="Treso">Trésorier</option>
                        <option value="Hygiène">Hyigène</option>
                        <option value="Comm">Respo comm</option>
                        <option value="RSE">Respo RSE</option>
                        <option value="">Aucun</option>
                    </select>
                </div>
            </div>
            <div className="submit-container">
                <button>{props.actionText}</button>
            </div>
        </form >
    )
}