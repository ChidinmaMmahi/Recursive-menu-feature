const Welcome = () => {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-semibold text-primary">
                    Welcome to the Project Playground
                </h1>
                <p className="text-sm md:text-base text-gray-500 max-w-md mx-auto">
                    Choose any project from the sidebar to explore its interactive demo here.
                </p>
            </div>
        </div>
    );
};

export default Welcome;


