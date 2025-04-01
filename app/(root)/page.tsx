// import

import { client } from "@/sanity/lib/client";
import SearchForm from "../../components/SearchForm";
import StartupCard from "../../components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/query";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     _id: 1,
  //     views: 55,
  //     author: { _id: 1, name: "Heroku" },
  //     description:
  //       "Unleashing the power of Generative AI to revolutionize content creation, design, and human-machine collaboration.",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYqAKZmufTUmYsrG0JCnRdEWGDqv5YUdcM6w&s",
  //     category: "AI",
  //     title: "GenAI",
  //   },
  //   {
  //     _createdAt: "Today",
  //     _id: 2,
  //     views: 120,
  //     author: { _id: 2, name: "Heroku" },
  //     description: "Exploring the future of finance with blockchain.",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8E7Uvjg3mcxofFhpqyDse_G66-Y4QwDolww&s",
  //     category: "Blockchain",
  //     title: "Decoding Web3",
  //   },
  //   {
  //     _createdAt: "2 days ago",
  //     _id: 3,
  //     views: 89,
  //     author: { _id: 3, name: "Heroku" },
  //     description: "How to build scalable applications with microservices.",
  //     image:
  //       "https://media.geeksforgeeks.org/wp-content/uploads/20240910120341/Microservices-lifecycle.webp",
  //     category: "Development",
  //     title: "Microservices Magic",
  //   },
  //   {
  //     _createdAt: "Last week",
  //     _id: 4,
  //     views: 210,
  //     author: { _id: 4, name: "Heroku" },
  //     description: "Tips to improve your UI/UX design process.",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP-DihLwh53DmJpM7oqeHuq1DeG1YUaK8Hfg&s",
  //     category: "Design",
  //     title: "Design that Converts",
  //   },
  //   {
  //     _createdAt: "Today",
  //     _id: 5,
  //     views: 77,
  //     author: { _id: 5, name: "Heroku" },
  //     description: "How LLMs are transforming industries.",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkUFmp5jSF-DhrD5102bzHU7RbidetfqYfA&s",
  //     category: "AI",
  //     title: "LLMs in the Wild",
  //   },
  //   {
  //     _createdAt: "3 days ago",
  //     _id: 6,
  //     views: 132,
  //     author: { _id: 6, name: "Heroku" },
  //     description: "Intro to serverless architecture and AWS Lambda.",
  //     image:
  //       "https://acropolium.com/img/articles/guide-to-serverless-architecture/img01.jpg",
  //     category: "Cloud",
  //     title: "Serverless 101",
  //   },
  //   {
  //     _createdAt: "Yesterday",
  //     _id: 7,
  //     views: 98,
  //     author: { _id: 7, name: "Heroku" },
  //     description: "The psychology behind great marketing campaigns.",
  //     image:
  //       "https://builtin.com/sites/www.builtin.com/files/styles/og/public/2022-09/marketing.png",
  //     category: "Marketing",
  //     title: "Growth Hacking Secrets",
  //   },
  //   {
  //     _createdAt: "5 days ago",
  //     _id: 8,
  //     views: 66,
  //     author: { _id: 8, name: "Heroku" },
  //     description: "The ethical concerns of facial recognition AI.",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd-M_r7bEyuBQzUODeKwobumjZ2bnoB_uelw&s",
  //     category: "AI",
  //     title: "Facing the Future",
  //   },
  //   {
  //     _createdAt: "Today",
  //     _id: 9,
  //     views: 44,
  //     author: { _id: 9, name: "Heroku" },
  //     description: "Understanding state management in React.",
  //     image:
  //       "https://www.driehaus.com/system/uploads/fae/image/asset/551/Micro-Small_1020_copy.jpg",
  //     category: "Development",
  //     title: "State of the Art",
  //   },
  //   {
  //     _createdAt: "1 week ago",
  //     _id: 10,
  //     views: 200,
  //     author: { _id: 10, name: "Heroku" },
  //     description: "Inside the startup that’s changing how we shop online.",
  //     image:
  //       "https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/content/fi/art/59ddbdc6ef95e.jpg",
  //     category: "Business",
  //     title: "The Future of Shopping",
  //   },
  //   {
  //     _createdAt: "2 weeks ago",
  //     _id: 11,
  //     views: 180,
  //     author: { _id: 11, name: "Heroku" },
  //     description: "Journey through the history of AI breakthroughs.",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCeNig8gHgnRK-WsJICSsMzZq9GDj90eARxQ&s",
  //     category: "AI",
  //     title: "From ELIZA to GPT",
  //   },
  // ];
  const posts = await client.fetch(STARTUPS_QUERY);

  return (
    <>
      <section className="pattern pink_container">
        <h1 className="heading font-work-sans">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Startups Found</p>
          )}
        </ul>
      </section>
    </>
  );
}
