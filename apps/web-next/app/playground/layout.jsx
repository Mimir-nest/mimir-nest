export const metadata = {
  title: "Interactive System Design Playground | Mimir Nest",
  description: "Construct, model, and validate system design architectures interactively with drag-and-drop components, constraints validation, and reference solution workflows.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/playground",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PlaygroundLayout({ children }) {
  return <>{children}</>;
}
