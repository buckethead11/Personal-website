import Image from "next/image";
import { client } from "../lib/sanity";
import exp from "constants";

interface Data {
    title: string,
    overview: string,
    link: string,
    _id: string,
    imageURL: string
}
async function getExperience() {
    const query = `*[_type == "experiences"] {
        title, 
        overview, 
        link, 
        _id,
        "imageURL": image.asset->url
    }`;

    const data = await client.fetch(query);

    return data;
}

export const revalidate = 60;

export default async function Experience() {
    const data: Data[] = await getExperience();
    console.log('data', data)
    return (
    <div className="divide-y divide-gray-200 dark:divide-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                Experience
            </h1>
        </div>

        <div className="grid gap-y-8 sm:gap-6 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-10 pt-8">
            {data.map((experience) => (
                <article key={experience._id} className="overflow-hidden dark:border:zinc-600 rounded-lg-border border-gray-100 bg-white
                shadow-lg dark:bg-black dark:shadow-gray-700 shadow-sky-200">
                    <div className="h-40 w-full relative">
                        <Image fill src={experience.imageURL} alt="Image of the project" className="w-full h-full object-cover"/>
                    </div>

                    <div className="p-4 sm:p-6">
                        <a href={experience.link} target="_blank">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                {experience.title}
                            </h3>
                        </a>

                        <p className="line-clamp-8 mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                            {experience.overview}
                        </p>
                    </div>
                </article>
            ))}
        </div>
    </div>
    )
}