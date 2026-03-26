import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import GenerateForm from "./GenerateForm";
import PaymentSuccess from "./PaymentSuccess";

interface Props {
  searchParams: { payment?: string };
}

export default async function GeneratePage({ searchParams }: Props) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirect=/generate");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (searchParams.payment === "success") {
    const { data: latest } = await supabase
      .from("generations")
      .select("id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    return <PaymentSuccess latestId={latest?.id} />;
  }

  if (searchParams.payment === "cancelled") {
    return <GenerateForm profile={profile} userId={user.id} cancelled />;
  }

  return <GenerateForm profile={profile} userId={user.id} />;
}
