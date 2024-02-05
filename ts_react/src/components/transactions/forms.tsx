import { Transaction } from "primitives"
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type IFormProps = {
    onSubmit: (data: any) => void,
    headerText: string,
    actionText: string,
    transaction?: Transaction,
}
export const TransactionForm = (props: IFormProps): React.JSX.Element => {
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: props.transaction,
    });
    useEffect(() => {
        if (!props.transaction) return;
        setValue("_id", props.transaction._id);
        setValue("type", props.transaction.type);
        setValue("name", props.transaction.name);
        setValue("desc", props.transaction.desc);
        setValue("amount_ht", props.transaction.amount_ht);
        setValue("toreimburse", props.transaction.toreimburse);
        setValue("amount", props.transaction.amount);
        setValue("date", props.transaction.date);
    }, [props.transaction, setValue])
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
            placeholder: "",
            opts: { required: true, }
        },
        facture: {
            label: "Facture",
            type: "file",
            placeholder: "",
            opts: { required: true, }
        },
        frais: {
            label: "Note de frais",
            type: "file",
            placeholder: "",
            opts: { required: true, }
        }
    }
    const switchType = () => {
        switch (watch("type")) {
            case "BNP":
                return (
                    <div className="input">
                        <label>Justificatif ouverture compte</label>
                        <input type="file" {...register("proof", { required: true })} />
                    </div>
                )
            case "Intérim":
                return (
                    <div className="input">
                        <label>Contrat d'intérim</label>
                        <input type="file" {...register("contract", { required: true })} />
                    </div>
                )
            case "Sponsoring nature":
                return (
                    <div className="input">
                        <label>Contrat de Sponsoring</label>
                        <input type="file" {...register("contract", { required: true })} />
                    </div>
                )
            case "Sponsoring Financier":
                return (
                    <div className="input">
                        <label>Contrat de Sponsoring</label>
                        <input type="file" {...register("contract", { required: true })} />
                    </div>
                )
            case "Facture":
                return (
                    <>
                        {Object.entries(invoiceInputs).map(([key, input]) => (
                            <div key={key} className="input">
                                <label>{input.label}</label>
                                <input {...register(key as ("toreimburse" | "frais" | "RIB" | "facture" | "amount_ht"), input.opts)} placeholder={input.placeholder} type={input.type}></input>
                            </div>
                        ))}
                    </>
                )
            default: return <></>
        }
    }
    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="container">
            <div className="header">
                <div className="title">{props.headerText}</div>
                {watch("type") === "Facture" &&
                    <div className="text">
                        Les factures doivent être adressée au nom du "Conseil de corporation des étudiants d'emlyon" avec l'adresse postale de l'école
                    </div>
                }
            </div>
            <div className="inputs">
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
                    <input {...register("name", { required: true })} placeholder="Nom" />
                </div>
                <div className="input">
                    <label>{watch("type") === "Sponsoring nature" ? "Nature de l'apport" : "Description"}</label>
                    <input {...register("desc")} placeholder="Description" />
                </div>
                <div className="input">
                    <label>Montant TTC</label>
                    <input {...register("amount", { required: true })} placeholder="Montant TTC" type="number" />
                </div>
                <div className="input">
                    <label>Date</label>
                    <input {...register("date", { required: true })} type="date" />
                </div>
                {switchType()}
            </div>

            <div className="submit-container">
                <button className="submit">{props.actionText}</button>
            </div>
        </form >
    )
}