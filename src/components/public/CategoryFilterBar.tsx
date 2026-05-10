'use client';

export default function CategoryFilterBar({
  categories,
  selected,
  onChange,
}: {
  categories: any[];
  selected: string;
  onChange: (cat: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          selected === 'all'
            ? 'bg-brand-500 text-white'
            : 'bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600'
        }`}
      >
        All
      </button>
      {categories.map((cat) => {
        const isImage = cat.icon && (cat.icon.startsWith('http://') || cat.icon.startsWith('https://'));
        return (
          <button
            key={cat._id}
            onClick={() => onChange(cat._id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selected === cat._id
                ? 'bg-brand-500 text-white'
                : 'bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600'
            }`}
          >
            {isImage ? (
              <img src={cat.icon} alt={cat.name} className="w-5 h-5 rounded object-cover" />
            ) : (
              <span>{cat.icon}</span>
            )}
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}