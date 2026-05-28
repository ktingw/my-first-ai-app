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
      <li className="flex justify-between items-center border border-gray-300 bg-white p-2 rounded transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900">
        <span className={done ? "line-through text-gray-400 dark:text-slate-500" : "text-slate-900 dark:text-slate-100"}>
          {text}
        </span>
  
        <div className="flex gap-2">
          <button className="text-green-600 dark:text-green-400" onClick={onToggle}>
            完成
          </button>
  
          <button className="text-red-500 dark:text-red-400" onClick={onDelete}>
            刪除
          </button>
        </div>
      </li>
    )
  }