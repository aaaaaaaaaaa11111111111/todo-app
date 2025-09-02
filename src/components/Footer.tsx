interface Props {
  remaining: number;
  onClearCompleted: () => void;
}

export default function Footer({ remaining, onClearCompleted }: Props) {
  return (
    <div className="flex justify-between items-center mt-2">
      <span>Осталось: {remaining}</span>
      <button
        onClick={onClearCompleted}
        className="px-2 py-1 border rounded bg-blue-500 text-white"
      >
        Очистить выполненные
      </button>
    </div>
  );
}
