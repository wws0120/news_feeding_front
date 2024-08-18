interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
}

export default function LoadMore({ onClick, loading }: LoadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="px-16 py-2 bg-slate-700 text-gray-200 rounded-lg hover:bg-slate-400 hover:text-gray-700"
    >
      {loading ? 'Loading...' : '加載更多'}
    </button>
  );
}
