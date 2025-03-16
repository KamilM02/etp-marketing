import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-white text-black p-4">
      <h1 className="mb-4 text-2xl font-bold">
        Home page – Event Ticket Platfrom
      </h1>
      <Link href="/marketing" passHref>
        <button className="px-4 py-2 bg-blue-800 text-white rounded">
          Go To Marketing Section
        </button>
      </Link>
    </div>
  );
}
