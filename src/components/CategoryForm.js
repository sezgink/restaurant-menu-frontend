// /components/CategoryForm.js
import { useForm } from "react-hook-form";

export default function CategoryForm({ onCreate }) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    onCreate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        placeholder="Category Name"
        {...register('name', { required: "Name is required" })}
      />
      <textarea
        name="description"
        placeholder="Category Description"
        {...register('description', { required: "Description is required" })}
      />
      <input name="image" type="file" {...register('image')} />
      <button type="submit">Create Category</button>
    </form>
  );
}
