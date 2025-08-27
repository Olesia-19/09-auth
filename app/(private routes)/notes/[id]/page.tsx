import { getServerSingleNote } from "@/lib/api/serverApi";
import NoteDetailsPageClient from "./NoteDetails.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await getServerSingleNote(id);

  return {
    title: `${note.title}`,
    description: `${note.content.slice(0, 21)}`,
    openGraph: {
      title: `${note.title}`,
      description: `${note.content.slice(0, 21)}`,
      url: `https://08-zustand-two-xi.vercel.app/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${note.title}`,
        },
      ],
    },
  };
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getServerSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsPageClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
