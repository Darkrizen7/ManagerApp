import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateListForm = (props) => {
    const { handleAddList } = props;

    const [apiError, setApiError] = useState()
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        handleAddList(data, setApiError);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container">
            <div className="header">
                <div className="text">Créer une liste</div>
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
                    <input {...register("name")} placeholder="Nom" />
                </div>
            </div>
            <div className="inputs">
                <div className="input">
                    <select {...register("campagne")} placeholder="Campagne">
                        <option value="">Sélectionner une option</option>
                        <option value="Ski Club">Ski Club</option>
                        <option value="Petit Paumé">Petit Paumé</option>
                        <option value="BDE">BDE</option>
                        <option value="BDA">BDA</option>
                    </select>
                </div>
            </div>
            <div className="submit-container">
                <button>Créer</button>
            </div>
        </form >
    )
}
export { CreateListForm }