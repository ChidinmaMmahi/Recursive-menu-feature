import notFound from "../assets/404.jpg";

const NotFoundPage = () => {
  return (
    <div className="mx-auto max-w-md text-center">
      <img src={notFound} alt="404" className="mb-4" />
      <p className="text-2xl text-green-700 font-bold">Ooops! Page Not Found</p>
      <p className="text-sm text-gray-500 mb-4">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
