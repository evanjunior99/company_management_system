import UserDashboard from "./UserDashBoard";

// This function generates all possible user IDs at build time
export async function generateStaticParams() {
  try {
    // Since this is a demo, we'll pre-render routes for users 1-10
    // In a real application, you would fetch this from your API
    return Array.from({ length: 100 }, (_, i) => ({
      userId: String(i + 1),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default function Page({ params }: { params: { userId: string } }) {
  return <UserDashboard userId={params.userId} />;
}