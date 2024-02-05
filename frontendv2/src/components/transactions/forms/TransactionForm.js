import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

const TransactionForm = (props) => {
    const { actionText } = props;
    const [apiError, setApiError] = useState()

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm({
        defaultValues: {
            ...props.transaction,
            date: props.transaction?.date ? new Date(props.transaction.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        }
    });

    const invoiceInputs = {
        amount_ht: {
            label: "Montant HT",
            type: "number",
            placeholder: "Montant HT",
            opts: { required: true, }
        },
        toreimburse: {
            label: "Payer (listeux)",
            type: "text",
            placeholder: "Personne à rembourser",
            opts: { required: true, }
        },
        RIB: {
            label: "RIB",
            type: "file",
            opts: { required: true, }
        },
        facture: {
            label: "Facture",
            type: "file",
            opts: { required: true, }
        },
        frais: {
            label: "Note de frais",
            type: "file",
            opts: { required: true, }
        }
    }

    const onSubmit = (data) => {
        props.handleSubmit(data, setApiError);
    }
    const switchType = () => {
        switch (watch("type")) {
            case "BNP":
                return (
                    <div className="input">
                        <label>Justificatif ouverture compte</label>
                        <input type="file" {...register("proof", { required: true })} style={{ backgroundColor: errors.proof ? "red" : null }} />
                    </div>
                )
            case "Intérim":
                return (
                    <div className="input">
                        <label>Contrat d'intérim</label>
                        <input type="file" {...register("contract", { required: true })} style={{ backgroundColor: errors.contract ? "red" : null }} />
                    </div>
                )
            case "Sponsoring nature":
                return (
                    <div className="input">
                        <label>Contrat de Sponsoring</label>
                        <input type="file" {...register("contract", { required: true })} style={{ backgroundColor: errors.contract ? "red" : null }} />
                    </div>
                )
            case "Sponsoring Financier":
                return (
                    <div className="input">
                        <label>Contrat de Sponsoring</label>
                        <input type="file" {...register("contract", { required: true })} style={{ backgroundColor: errors.contract ? "red" : null }} />
                    </div>
                )
            case "Facture":
                return (
                    <>
                        {Object.entries(invoiceInputs).map(([key, input]) => (
                            <div key={key} className="input">
                                <label>{input.label}</label>
                                <input {...register(key, input.opts)} placeholder={input.placeholder} type={input.type} style={{ backgroundColor: errors[key] ? "red" : null }}></input>
                            </div>
                        ))}
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
                        <input {...register("name", { required: true })} placeholder="Nom" style={{ backgroundColor: errors.name ? "red" : null }} />
                    </div>
                    <div className="input">
                        <label>{watch("type") === "Sponsoring nature" ? "Nature de l'apport" : "Description"}</label>
                        <input {...register("desc")} placeholder="Description" />
                    </div>
                    <div className="input">
                        <label>Montant TTC</label>
                        <input {...register("amount", { required: true })} placeholder="Montant TTC" type="number" style={{ backgroundColor: errors.amount ? "red" : null }} />
                    </div>
                    <div className="input">
                        <label>Date</label>
                        <input {...register("date", { required: true })} type="date" style={{ backgroundColor: errors.amount ? "red" : null }} />
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