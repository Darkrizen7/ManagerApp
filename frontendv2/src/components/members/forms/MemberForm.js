import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const MemberForm = (props) => {
    const { _id, surname, lastname, student_number, email, support, role, list } = props.member;
    const { handleAction, actionText } = props;

    const [apiError, setApiError] = useState()
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            _id, surname, lastname, student_number, email, support, role, list
        }
    });

    useEffect(() => {
        Object.entries(props.member).forEach(([key, value]) => {
            setValue(key, value);
        });
    }, [props.member, setValue])

    const onSubmit = (data) => {
        handleAction(data, setApiError);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container">
            <div className="header">
                <div className="text">{actionText}</div>
                {apiError && apiError.errors && Object.keys(apiError.errors).map((path, error) => (
                    <li key={path}>
                        <span>Erreur sur {path} : {apiError.errors[path].kind}</span>
                    </li>
                ))}
                {apiError && !apiError.errors && apiError.message &&
                    apiError.message
                }
            </div>

            <div className="inputs">
                <div className="input">
                    <input {...register("surname")} placeholder="Prénom" />
                </div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input {...register("lastname")} placeholder="Nom" />
                </div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input {...register("student_number")} placeholder="Numéro étudiant" type="number" />
                </div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input {...register("email")} placeholder="Email" type="email" />
                </div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input {...register("support")} placeholder="Email" type="checkbox" />
                </div>
            </div>
            <div className="submit-container">
                <button>{actionText}</button>
            </div>
        </form >
    )
}
export { MemberForm }