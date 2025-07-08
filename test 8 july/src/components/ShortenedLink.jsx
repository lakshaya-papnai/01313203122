function ShortenedLink({ original, short }) {
  return (
    <div className="bg-white text-black p-3 m-2 rounded shadow-md">
      <p><strong>Original:</strong> {original}</p>
      <p><strong>Short:</strong> <a href={short} target="_blank" rel="noreferrer">{short}</a></p>
    </div>
  );
}

export default ShortenedLink;
