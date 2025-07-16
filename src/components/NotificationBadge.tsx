function NotificationBadge({
  icon,
  count,
}: {
  icon: React.ReactNode;
  count: number;
}) {
  return (
    <div>
      <button
        type="button"
        className="relative inline-flex justify-center items-center size-9 rounded-lg bg-white text-gray-800  hover:text-red-800 cursor-pointer"
      >
        {icon}
        {count > 0 && (
          <span
            className="absolute top-0 end-0 inline-flex items-center py-0.5 px-1.5 rounded-full 
        text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-red-500 text-white"
          >
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>
    </div>
  );
}

export default NotificationBadge;
