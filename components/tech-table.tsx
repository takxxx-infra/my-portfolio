import type { TechTableItem } from "@/types/content";

type TechTableProps = {
  items: TechTableItem[];
};

export function TechTable({ items }: TechTableProps): JSX.Element {
  if (items.length === 0) {
    return <div className="site-chip rounded-2xl p-4 text-sm text-[var(--muted)]">技術スタック情報は未登録です。</div>;
  }

  return (
    <div className="site-panel-inset overflow-hidden rounded-2xl">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {items.map((item) => (
            <tr key={item.label} className="border-b border-[var(--border-soft)] last:border-b-0">
              <th className="w-1/3 bg-white/5 px-3 py-3 text-left font-semibold text-[var(--text-0)]">{item.label}</th>
              <td className="px-3 py-3 text-[var(--text-1)]">{item.values.join(" / ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
