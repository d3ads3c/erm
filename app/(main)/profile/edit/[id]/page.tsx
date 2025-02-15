import ProfileComp from "@/components/profile/Profile";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const {id} = await params;
  return <ProfileComp UserID={id} />;
}
