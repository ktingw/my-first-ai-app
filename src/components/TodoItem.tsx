import { useState } from "react"

type Props = {
  text: string
  done: boolean
  onToggle: () => void
  onDelete: () => void
  onEdit: (newText: string) => void
}

export default function TodoItem({
  text,
  done,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(text)

  const handleSave = () => {
    if (editText.trim() === "") return
    onEdit(editText)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(text)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <li className="flex justify-between items-center border border-gray-300 bg-white p-2 rounded transition-colors duration-200">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 border border-blue-500 rounded px-2 py-1 outline-none"
          autoFocus
        />

        <div className="flex gap-2 ml-2">
          <button
            className="bg-green-600 text-white px-3 rounded disabled:opacity-50"
            onClick={handleSave}
            disabled={editText.trim() === ""}
          >
            儲存
          </button>

          <button className="bg-gray-400 text-white px-3 rounded" onClick={handleCancel}>
            取消
          </button>
        </div>
      </li>
    )
  }

  return (
    <li className="flex justify-between items-center border border-gray-300 bg-white p-2 rounded transition-colors duration-200">
      <span className={done ? "line-through text-gray-400" : ""}>{text}</span>

      <div className="flex gap-2">
        <button className="text-blue-600" onClick={() => setIsEditing(true)}>
          編輯
        </button>

        <button className="text-green-600" onClick={onToggle}>
          完成
        </button>

        <button className="text-red-500" onClick={onDelete}>
          刪除
        </button>
      </div>
    </li>
  )
}