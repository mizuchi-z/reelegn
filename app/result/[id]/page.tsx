import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ResultClient from "./ResultClient";

interface Props {
  params: { id: string };
}

export default async function ResultPage({ params }: Props) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: generation } = await supabase
    .from("generations")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (!generation) {
    notFound();
  }

  return <ResultClient generation={generation} />;
}
