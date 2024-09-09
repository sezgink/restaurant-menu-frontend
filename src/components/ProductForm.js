// src/components/ProductForm.js
import { useForm } from 'react-hook-form';

export default function ProductForm({ onCreate }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const newProduct = {
      id: Date.now(), // Temporary ID until you integrate with the backend
      ...data,
      image: URL.createObjectURL(data.image[0]) // Temporarily render the image
    };
    onCreate(newProduct); // Callback to pass the new product up to the parent component
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          {...register('name', { required: 'Product name is required' })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Product Description</label>
        <textarea
          name="description"
          {...register('description', { required: 'Description is required' })}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <label>Product Image</label>
        <input
          type="file"
          name="image"
          {...register('image', { required: 'Image is required' })}
        />
        {errors.image && <p>{errors.image.message}</p>}
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
}
