<?php

namespace App\Http\Controllers;

use App\Models\Todos;
use Illuminate\Http\Request;
use Inertia\Inertia; // 追加

class TodosController extends Controller
{
    public function index()
    {
        //すべてのTodoを取得
        $todos = Todos::all();
        // Inertiaを使ってビューにデータを渡す
        return Inertia::render('Todos/index',['todos'=>$todos,'message' => session('message')]);
    }

    public function store(Request $request)
    {
        //バリデーション
        $request->validate([
            'title' => 'required|max:12',
            'content' => 'required|max:20',
            'category' => 'required|max:10',
        ]);

        //登録処理
        $todos = new Todos($request->input());
        $todos->save();
        return redirect('todos')->with('message','登録しました');
    }

    public function update(Request $request, $id)
    {
        //バリデーション
        $request->validate([
            'title' => 'required|max:12',
            'content' => 'required|max:20',
            'category' => 'required|max:10',
        ]);

        //更新処理
        $todos = Todos::find($id);
        $todos->fill($request->input())->saveOrFail();
        return redirect('todos')->with('message','更新しました');
    }

    public function destroy($id)
    {
        //削除処理
        $todos = Todos::find($id);
        $todos->delete();
        return redirect('todos')->with('message','削除しました');
    }
}
