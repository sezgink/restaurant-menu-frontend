import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function CategoryItem({category,openCategoryEdit,showDeleteDialog,href}){
    return(
        <div key={category.id} className="relative bg-white shadow-lg rounded-lg p-4 flex flex-col items-center" href={href}>
                <button
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
                </button>
                <Link href={href}>
                <img
                  // src={category.image}
                  src={process.env.NEXT_PUBLIC_API_URL+'/uploads/' +category.category_pic}
                  alt={category.name}
                  className="w-40 h-40 object-cover mb-4 rounded-md shadow-md"
                  // className="w-40 h-40 object-cover mb-4 rounded-full shadow-md"
                />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.category_name}</h3>
                
                <p className="text-gray-600 text-center">{category.description}</p>
                </Link>
              </div>
    );

}