
import { redirect } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default function ProductIdRedirect({ params }: Props) {
  // Redirect to the consolidated [slug] route to avoid conflict
  redirect(`/products/${params.id}`);
}
