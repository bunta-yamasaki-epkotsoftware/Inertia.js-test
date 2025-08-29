import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import RegisterButton from '../Profile/Partials/RegisterButton';
import UpdateButton from '../Profile/Partials/UpdateButton';
import DeleteButton from '../Profile/Partials/DeleteButton';

export default function Dashboard({auth, todos, message}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Todo Page
                </h2>
            }
        >
            <Head title="Dashboard" />
            {message && <div className="mb-4 p-2 bg-green-100 text-green-800 text-center rounded">{message}</div>}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <RegisterButton />
                        <div>
                            <table className='w-full bg-gray-100 mt-2'>
                                <thead className='bg-blue-200'>
                                    <tr className='text-green-600'>
                                        <th className='border border-gray-400 p-2'>ID</th>
                                        <th className='border border-gray-400 p-2'>Title</th>
                                        <th className='border border-gray-400 p-2'>Content</th>
                                        <th className='border border-gray-400 p-2'>Category</th>
                                        <th className='border border-gray-400 p-2'></th>
                                        <th className='border border-gray-400 p-2'></th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white'>
                                    {todos.map((todos) => (
                                        <tr key={todos.id}>
                                            <td className='border border-gray-400 p-2 text-center'>{todos.id}</td>
                                            <td className='border border-gray-400 p-2'>{todos.title}</td>
                                            <td className='border border-gray-400 p-2'>{todos.content}</td>
                                            <td className='border border-gray-400 p-2'>{todos.category}</td>
                                            <td className='border border-gray-400 p-2 text-center'>
                                                <UpdateButton
                                                    id={todos.id}
                                                    title={todos.title}
                                                    content={todos.content}
                                                    category={todos.category}
                                                />
                                            </td>
                                            <td className='border border-gray-400 p-2 text-center'>
                                                <DeleteButton
                                                    id={todos.id}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
