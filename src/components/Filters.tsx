interface Props {
  current: "all" | "active" | "completed";
  onChange: (filter: "all" | "active" | "completed") => void;
}

export default function Filters({ current, onChange }: Props) {
  const buttons = [
    { label: "Все", value: "all" },
    { label: "Активные", value: "active" },
    { label: "Выполненные", value: "completed" },
  ] as const;

  return (
    <div className="flex gap-2">
      {buttons.map((b) => (
        <button
          key={b.value}
          className={`px-2 py-1 border rounded ${
            current === b.value ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => onChange(b.value)}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}
