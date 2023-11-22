import { useForm } from 'react-hook-form';

const TransactionForm = (props) => {
    const { name, desc, amount, list, _id } = props.transaction;
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name, desc, amount, list, _id
        }
    });
    const { actionText } = props;

    const onSubmit = (data) => {
        props.handleSubmit(data);
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name")} placeholder="Nom" />
                <input {...register("desc")} placeholder="Description" />
                <input {...register("amount")} placeholder="Montant" type="number" />
                <input type="file" {...register("file")} placeholder="Preuve" />
                <button>{actionText}</button>
            </form>
        </>
    );
}
export { TransactionForm };