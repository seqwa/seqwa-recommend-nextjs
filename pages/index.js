import Head from 'next/head';
import RecommendBox from '../components/RecommendBox';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-sky-400">
      <RecommendBox />
    </div>
  );
}
