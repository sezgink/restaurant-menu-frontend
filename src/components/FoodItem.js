import { PencilSquareIcon } from '@heroicons/react/24/solid';

export default function FoodItem({product,openProductEdit}){
    return(
        <div key={product.id} className="relative bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                <button
                className="absolute top-0 right-0 h-16 w-16 text-gray-500 hover:text-gray-700"
                onClick={() => openProductEdit(product)}
                >
                Edit<PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <img
                  // src={category.image}
                  src={process.env.NEXT_PUBLIC_API_URL+'/uploads/' +product.product_pic}
                  alt={product.name}
                  className="w-40 h-40 object-cover mb-4 rounded-md shadow-md"
                  // className="w-40 h-40 object-cover mb-4 rounded-full shadow-md"
                />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.product_name}</h3>
                <p className="text-gray-600 text-center">{product.description}</p>
              </div>
    );

}