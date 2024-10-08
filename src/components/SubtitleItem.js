import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/solid';

export default function SubtitleItem({ product, openProductEdit, showDeleteDialog }) {
  return (
    <div
      key={product.id}
      className="relative bg-white shadow-lg rounded-lg p-4 flex items-start space-x-4 w-full"
    >

      <div className="flex flex-col flex-1">
        <h3 className="text-lg text-gray-800">Subcategory Name:</h3>

        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        {/* <h4 className="text-md font-bold text-gray-800">Price: {product.price}</h4> */}
        {/* {product.is_dumping == 1 && (
          <>
            <h4 className="text-md font-bold text-gray-800">In dumping</h4>
            <h4 className="text-md font-bold text-gray-800">Old Price: {product.old_price}</h4>
          </>
        )} */}
        {/* <p className="text-gray-600">{product.description}</p> */}
      </div>

      <div className="flex flex-col space-y-4 items-end">
        <button
          className="text-gray-500 hover:text-gray-700 flex items-center"
          onClick={() => openProductEdit(product)}
        >
          Edit
          <PencilSquareIcon className="h-5 w-5 inline" aria-hidden="true" />
        </button>
        <button
          className="text-gray-500 hover:text-gray-700 flex items-center"
          onClick={() => showDeleteDialog(product)}
        >
          Delete
          <TrashIcon className="h-5 w-5 inline" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

