type Props = {
    text: string
    done: boolean
    onToggle: () => void
    onDelete: () => void
  }
  
  export default function TodoItem({
    text,
    done,
    onToggle,
    onDelete,
  }: Props) {
    return (
      <li className="flex justify-between items-center border border-gray-300 bg-white p-2 rounded transition-colors duration-200">
        <span className={done ? "line-through text-gray-400" : ""}>
          {text}
        </span>

        <div className="flex gap-2">
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