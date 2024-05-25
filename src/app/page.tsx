import { redirect } from "next/navigation";

interface PageProps {}

const Page = (props: PageProps) => {
  redirect("/tasks");
  return null;
};

export default Page;
