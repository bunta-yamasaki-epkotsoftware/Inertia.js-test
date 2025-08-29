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
import BlueButton from '@/Components/BlueButton';

export default function RegisterButton({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();
    const titleInput = useRef();
    const contentInput = useRef();
    const categoryInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        post,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        title: '',content: '',category: ''
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const RegisterTodo = (e) => {
        e.preventDefault();

        post(route('todos.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <BlueButton onClick={confirmUserDeletion}>
                登録
            </BlueButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={RegisterTodo} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Todoリストに登録しますか?
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
                            登録
                        </BlueButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
