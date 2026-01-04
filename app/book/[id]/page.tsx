import Base from "@/screens/book/ui/Base";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <Base tableId={id} />

}
