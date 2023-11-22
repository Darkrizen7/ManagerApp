import { useForm } from 'react-hook-form';

const TestComponent = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.set("file", data.file[0]);
        const res = await fetch("http://localhost:3000/transactions", {
            method: "PUT",
            body: formData,
            credentials: 'include',
        }).then((res) => res.json());
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("_id")} />
            <input type="file" {...register("file")} />
            <button>Submit</button>
        </form>
    );
}
export { TestComponent }

