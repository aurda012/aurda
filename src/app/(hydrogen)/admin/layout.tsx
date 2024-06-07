import AdminHeader from '@/components/admin/Header';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  if (user.username !== 'aurda') {
    redirect('/');
  }

  return (
    <>
      <AdminHeader />
      <div className="container mx-auto max-w-4xl">{children}</div>
    </>
  );
}
