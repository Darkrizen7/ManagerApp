import { useState } from 'react';
import { useForm } from 'react-hook-form';

const TransactionForm = (props) => {
    const { actionText } = props;
    const { name, desc, amount, list, _id } = props.transaction;
    const [apiError, setApiError] = useState()
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name, desc, amount, list, _id
        }
    });

    const onSubmit = (data) => {
        props.handleSubmit(data, setApiError);
    }
    return (
        <>
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
                        <label>Nom</label>
                        <input {...register("name")} placeholder="Nom" />
                    </div>
                    <div className="input">
                        <label>Description</label>
                        <input {...register("desc")} placeholder="Description" />
                    </div>
                    <div className="input">
                        <label>Montant</label>
                        <input {...register("amount")} placeholder="Montant" type="number" />
                    </div>
                    <div className="input">
                        <label>Type</label>
                        <select {...register("type")}>
                            <option value="">Sélectionner une option</option>
                            <option value="Interim">Interim</option>
                            <option value="Démarchage financier">Démarchage financier</option>
                            <option value="Nourriture" >Nourriture</option>
                            <option value="Alcool" >Alcool</option>
                        </select>
                    </div>
                    <div className="input">
                        <label>Preuve</label>
                        <input type="file" {...register("file")} placeholder="Preuve" />
                    </div>
                </div>
                <div className="submit-container">
                    <button>{actionText}</button>
                </div>
            </form>
        </>
    );
}
export { TransactionForm };