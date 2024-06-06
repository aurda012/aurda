import Header from './header';

export default function MultiStepLayoutTwo({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[85vh] rounded-xl bg-gradient-to-r from-[#136A8A] to-[#267871] @container">
      <Header />
      {children}
    </div>
  );
}
