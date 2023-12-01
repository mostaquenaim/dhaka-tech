import { Link } from 'react-router-dom'; // Make sure to import Link from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-primary">
            {/* Exciting 404 Image or GIF */}
            <img
                src="/notfound.gif" // Replace with your exciting image or GIF URL
                alt="404 Not Found"
                className="mb-8"
            />
            <h1 className="text-3xl font-semibold mb-4">Oops! Page not found</h1>
            <p className="text-base text-gray-500 mb-8">The page you are looking for might be under construction or does not exist.</p>
            <Link to="/" className="text-base text-base-200 hover:underline">Back to home</Link>
        </div>
    );
};

export default NotFoundPage;
