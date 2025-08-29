import DangerButton from '@/Components/DangerButton';
import { useForm } from '@inertiajs/react';

export default function DeleteButton({ id, className = '' }) {
    const {
        delete: destroy,
        reset,
    } = useForm({
        id:''
    });

    const DeleteTodo = (id) => {
        if (!window.confirm('削除しますか？')) {
        return; // キャンセルなら何もせず戻る
    }
        destroy(route('todos.destroy', id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <DangerButton onClick={() => DeleteTodo(id)}>
                 削除
            </DangerButton>
        </section>
    );
}
