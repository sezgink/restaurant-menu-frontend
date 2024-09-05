// src/components/RestaurantForm.js

import { useForm } from "react-hook-form";

export default function RestaurantForm({ onCreate }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    onCreate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Restaurant Name</label>
        <input
          type="text"
          placeholder="Enter restaurant name"
          {...register('name', { required: 'Restaurant name is required' })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <button type="submit">Create Restaurant</button>
      </div>
    </form>
  );
}
