"use client"

import { useEffect, useState } from "react"
import TodoItem from "@/components/TodoItem"
import type { Todo } from "@/types/todo"

export default function Home() {
  const [input, setInput] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])

  const totalTodos = todos.length
  const completedTodos = todos.filter((todo) => todo.done).length
  const remainingTodos = totalTodos - completedTodos
  const completionRate = totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100)

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (!input.trim()) return
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input,
        done: false,
      },
    ])
    setInput("")
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      <div className="grid grid-cols-2 gap-3 mb-6 rounded border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
        <div>
          <div className="text-gray-500">總數</div>
          <div className="text-xl font-semibold">{totalTodos}</div>
        </div>
        <div>
          <div className="text-gray-500">已完成</div>
          <div className="text-xl font-semibold">{completedTodos}</div>
        </div>
        <div>
          <div className="text-gray-500">剩餘</div>
          <div className="text-xl font-semibold">{remainingTodos}</div>
        </div>
        <div>
          <div className="text-gray-500">完成率</div>
          <div className="text-xl font-semibold">{completionRate}%</div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded border-slate-300 bg-white text-slate-900 outline-none transition focus:border-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="輸入待辦"
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo()
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded transition hover:bg-blue-600"
          onClick={addTodo}
        >
          新增
        </button>
      </div>

      <ul className="space-y-2">
        {todos.length === 0 && (
          <p className="text-gray-400 text-center mt-6">還沒有待辦事項 ✨</p>
        )}
        {todos.map((todo, i) => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            done={todo.done}
            onToggle={() => {
              setTodos(
                todos.map((todo, index) =>
                  index === i ? { ...todo, done: !todo.done } : todo
                ) as typeof todos
              )
            }}
            onDelete={() => {
              setTodos(todos.filter((_, index) => index !== i))
            }}
          />
        ))}
      </ul>
    </main>
  )
}