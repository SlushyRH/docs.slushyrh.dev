import { Helmet } from "react-helmet-async";

export function NotFoundPage() {
  return (
    <>
      <Helmet>
      <title>404 | Snowcap Docs</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-bg px-4 font-sans">
        <div className="text-center max-w-lg">
          <h1 className="text-[clamp(5rem,15vw,8rem)] font-extrabold text-primary leading-none m-0">
            404
          </h1>
          
          <h2 className="text-[clamp(1.5rem,5vw,2rem)] font-semibold text-text mt-4 mb-4">
            Documentation Site Not Found
          </h2>
          
          <p className="text-base text-text/60 mb-8 leading-relaxed">
            The page you are looking for might have been removed, had its name
            changed, or is currently unavailable.
          </p>

        </div>
      </div>
    </>
  );
}