import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

const TransactionForm = (props) => {
    const { actionText } = props;
    const { name, desc, amount, list, _id } = props.transaction;
    const [apiError, setApiError] = useState()
    const { register, handleSubmit, watch, control, formState: { errors } } = useForm({
        defaultValues: {
            name, desc, amount, list, _id
        }
    });

    const onSubmit = (data) => {
        props.handleSubmit(data, setApiError);
    }
    const switchType = () => {
        switch (watch("type")) {
            case "BNP":
                return (
                    <div className="input">
                        <label>Justificatif ouverture compte</label>
                        <input type="file" {...register("proof")} />
                    </div>
                )
            case "Intérim":
                return (
                    <div className="input">
                        <label>Contrat d'intérim</label>
                        <input type="file" {...register("contract")} />
                    </div>
                )
            case "Sponsoring nature":
                return (
                    <div className="input">
                        <label>Contrat</label>
                        <input type="file" {...register("contract")} />
                    </div>
                )
            case "Sponsoring Financier":
                return (
                    <div className="input">
                        <label>Contrat</label>
                        <input type="file" {...register("contract")} />
                    </div>
                )
            case "Facture":
                return (
                    <>
                        <div className="input">
                            <label>Montant HT</label>
                            <input {...register("amount_ht")} placeholder="Montant HT" type="number" />
                        </div>
                        <div className="input">
                            <Controller
                                name="toreimburse"
                                control={control}
                                rules={{ required: 'Le nom du payeur est requis.' }}
                                render={({ field }) => (
                                    <>
                                        <label>Payeur (listeux)</label>
                                        <input style={{ backgroundColor: errors.toreimburse ? "red" : null }} type="text" {...field} placeholder='Personne à rembourser' />
                                    </>
                                )} />
                        </div>
                        <div className="input">
                            <label>RIB</label>
                            <input type="file" {...register("RIB")} />
                        </div>
                        <div className="input">
                            <label>Facture</label>
                            <input type="file" {...register("facture")} />
                        </div>
                        <div className="input">
                            <label>Note de frais</label>
                            <input type="file" {...register("frais")} />
                        </div>
                    </>
                )
            default: return <></>
        }
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
                    {errors && console.log(errors)
                    }
                </div>
                <div className="inputs">
                    {watch("type") === "Facture" &&
                        <strong>Les factures doivent être adressée au nom du "Conseil de corporation des étudiants d'emlyon" avec l'adresse postale de l'école</strong>
                    }
                    <div className="input">
                        <label>Type</label>
                        <select {...register("type")}>
                            <option value="">Sélectionner une option</option>
                            <option value="Facture">Facture</option>
                            <option value="Sponsoring financier">Sponsoring financier</option>
                            <option value="Sponsoring nature" >Sponsoring nature</option>
                            <option value="Intérim" >Intérim</option>
                            <option value="Apport perso" >Apport perso</option>
                            <option value="BNP" >BNP</option>
                            <option value="Autre" >Autre mettre en description</option>
                        </select>
                    </div>
                    <div className="input">
                        <label>Raison Social / {watch("type") === "Facture" ? "Destinataire" : "Apporteur"} </label>
                        <input {...register("name")} placeholder="Nom" />
                    </div>
                    <div className="input">
                        <label>{watch("type") === "Sponsoring nature" ? "Nature de l'apport" : "Description"}</label>
                        <input {...register("desc")} placeholder="Description" />
                    </div>
                    <div className="input">
                        <label>Montant TTC</label>
                        <input {...register("amount")} placeholder="Montant TTC" type="number" />
                    </div>
                    {switchType()}
                </div>
                <div className="submit-container">
                    <button>{actionText}</button>
                </div>
            </form>
        </>
    );
}
export { TransactionForm };