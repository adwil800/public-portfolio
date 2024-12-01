import {Link} from "@/navigation";
import {Metadata} from "next";
import {useTranslations} from "next-intl";

export const metadata: Metadata = {
  title: "Page not found - 404",
  description: "404",
  keywords: "404"
};

export default function NotFound() {

  const localeNotFound = useTranslations('notFound');

  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 ">404</h1>
        <h2 className="text-2xl  mb-6">{localeNotFound('title')}</h2>
        <p className="mb-6">
          {localeNotFound('subtitle')}
        </p>
        
        <Link href="/" className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
            {localeNotFound('buttonLabel').toUpperCase()}
        </Link>
        
      </div>
    </div> 
  )
}
