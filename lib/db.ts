
import { supabase } from './supabase';

export async function getProducts(categorySlug?: string) {
  let query = supabase
    .from('products')
    .select(`
      *,
      categories (name, slug),
      vendors:product_vendors (vendors (*))
    `)
    .eq('status', 'published');

  if (categorySlug && categorySlug !== 'All') {
    query = query.eq('categories.slug', categorySlug);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (*),
      vendors:product_vendors (vendors (*))
    `)
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
}

export async function getCategories(type: string = 'product') {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('type', type)
    .eq('status', 'published');

  if (error) throw error;
  return data;
}
