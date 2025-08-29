export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4">
      {children}
    </div>
  );
}
