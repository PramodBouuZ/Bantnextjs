
'use server';

import { getAdminClient } from '@/lib/supabase';
import { analyzeLeadWithAI } from '@/lib/gemini';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: any) {
  const supabase = getAdminClient();
  
  const { data, error } = await supabase
    .from('products')
    .insert([formData])
    .select();

  if (error) throw error;
  
  revalidatePath('/products');
  return data;
}

export async function submitLead(description: string, contactInfo: any) {
  const supabase = getAdminClient();
  
  // 1. Analyze with AI
  const analysis = await analyzeLeadWithAI(description);
  
  // 2. Save to DB
  const { data, error } = await supabase
    .from('leads')
    .insert([{
      description,
      ...analysis,
      user_email: contactInfo.email,
      user_mobile: contactInfo.mobile,
      status: 'QUALIFIED'
    }]);

  if (error) throw error;
  return data;
}
