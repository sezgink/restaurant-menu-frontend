import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function CategoryItem({category,openCategoryEdit,showDeleteDialog,href}){
    return(
        // <div key={category.id} className="relative bg-white shadow-lg rounded-lg p-4 flex items-start space-x-4 w-full" href={href}>
        <div key={category.id} className="relative bg-white shadow-lg rounded-lg p-4 flex items-start space-x-4 w-full" href={href}>
                {/* <button
                className="absolute top-0 right-0 h-16 w-16 text-gray-500 hover:text-gray-700"
                onClick={() => openCategoryEdit(category)}
                >
                Edit<PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                className="absolute top-16 right-0 h-16 w-16 text-gray-500 hover:text-gray-700"
                onClick={() => showDeleteDialog(category)}
                >
                Delete<TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button> */}
                <Link href={href} className='relative flex items-start space-x-4 w-full'>
                <div className='flex flex-col'>
                  <img
                    // src={category.image}
                    src={process.env.NEXT_PUBLIC_API_URL+'/uploads/' +category.category_pic}
                    alt={category.name}
                    className="w-40 h-40 object-cover rounded-md shadow-md flex-start"
                    // className="w-40 h-40 object-cover mb-4 rounded-full shadow-md"
                  />
                </div>
                <div className='flex flex-col flex-1'>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.category_name}</h3>
                </div>
                <div className='flex flex-col flex-1'>
                  <p className="text-gray-600 text-center">{category.description}</p>
                </div>
                </Link>
                <div className="flex flex-col space-y-4 items-end">
                <button
                  className="text-gray-500 hover:text-gray-700 flex items-center"
                  onClick={() => openCategoryEdit(category)}
                >
                  Edit
                  <PencilSquareIcon className="h-5 w-5 inline" aria-hidden="true" />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700 flex items-center"
                  onClick={() => showDeleteDialog(category)}
                >
                  Delete
                  <TrashIcon className="h-5 w-5 inline" aria-hidden="true" />
                </button>
              </div>
              </div>
    );

}