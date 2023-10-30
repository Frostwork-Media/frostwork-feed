export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Admin</h1>
      <main>{children}</main>
    </div>
  );
}
