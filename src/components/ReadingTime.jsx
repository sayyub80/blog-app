export function ReadingTime({ content }) {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  
  return (
    <div className="flex items-center text-gray-500">
      <FaClock className="mr-2" />
      <span>{minutes} min read</span>
    </div>
  );
}