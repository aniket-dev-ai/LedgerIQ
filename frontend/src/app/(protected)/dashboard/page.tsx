import { createClient } from '@/lib/supabase/server';
import React from 'react'

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);
  return <div>page</div>;
}
 