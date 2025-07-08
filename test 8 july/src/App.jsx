import ShortenerForm from './components/ShortenerForm';
import ShortenedLink from './components/ShortenedLink';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-6">🔗 React URL Shortener</h1>
      <ShortenerForm />
    </div>
  );
}

export default App;
