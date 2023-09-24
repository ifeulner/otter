import { BookmarkForm } from '@/src/components/BookmarkForm';
import { Database } from '@/src/types/supabase';
import { getDbMetadata } from '@/src/utils/fetching/meta';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function NewPage({
  searchParams,
}: {
  searchParams: { url: string };
}) {
  const supabaseClient = createServerComponentClient<Database>({ cookies });
  const data = await getDbMetadata(supabaseClient);

  return (
    <BookmarkForm
      type="new"
      tags={data.tags}
      initialValues={{
        url: searchParams.url,
      }}
    />
  );
}
