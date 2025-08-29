import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import Content from '@/Components/content';
import Category from '@/Components/Category';
import GreenButton from '@/Components/GreenButton';
import BlueButton from '@/Components/BlueButton';

export default function UpdateButton({ id, title, content, category, className = '' }) {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const titleInput = useRef();
    const contentInput = useRef();
    const categoryInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        post,
        put,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        id:'', title: '',content: '',category: ''
    });

    const openEditModal = (id, title, content, category) => {
        console.log('受け取ったid:', id); // ここで確認
        setData({
            id: id,
            title: title,
            content: content,
            category: category
        });
        setEditModalOpen(true);
    };

    const UpdateTodo = (e) => {
        e.preventDefault();
        console.log('data.id:', data.id); // RegisterTodo内

        put(route('todos.update', data.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setEditModalOpen(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <GreenButton onClick={() => openEditModal(id, title, content, category)}>
                編集
            </GreenButton>

            <Modal show={editModalOpen} onClose={closeModal}>
                <form onSubmit={UpdateTodo} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Todoリストを変更しますか?
                    </h2>

                    <div className="mt-6">
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            ref={titleInput}
                            value={data.title}
                            onChange={(e) =>
                                setData('title', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="title"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-6">
                        <Content
                            id="content"
                            type="text"
                            name="content"
                            ref={contentInput}
                            value={data.content}
                            onChange={(e) =>
                                setData('content', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="content"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-6">
                        <Category
                            id="category"
                            name="category"
                            ref={categoryInput}
                            value={data.category}
                            onChange={(e) =>
                                setData('category', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="category"
                            options={['','React', 'Laravel', 'Inertia']}
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            戻る
                        </SecondaryButton>

                        <BlueButton className="ms-3" disabled={processing}>
                            更新
                        </BlueButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
