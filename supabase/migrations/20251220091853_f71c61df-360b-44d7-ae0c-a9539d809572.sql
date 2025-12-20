-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for avatar uploads
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add more Nigerian campus providers
INSERT INTO public.providers (name, avatar_url, rating, reviews_count, experience, specialties, is_verified, is_available) VALUES
('Chidinma Okonkwo', 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150', 4.9, 87, '4 years', ARRAY['Bubu Gown', 'Ankara Styles', 'Traditional Wear'], true, true),
('Emeka Nwosu', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 4.7, 65, '3 years', ARRAY['Laptop Repair', 'Phone Repair', 'Tech Support'], true, true),
('Adaeze Ibe', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 4.8, 112, '5 years', ARRAY['Lash Fixing', 'Makeup Services', 'Bridal Glam'], true, true),
('Chukwuemeka Obi', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 4.6, 43, '2 years', ARRAY['Shoes & Sneakers', 'Clothes Selling'], true, true),
('Ngozi Adeyemi', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', 4.9, 156, '6 years', ARRAY['Hair Styling', 'Braiding', 'Hair Treatment'], true, true),
('Tochukwu Eze', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', 4.5, 38, '2 years', ARRAY['Phone Repair', 'Laptop Repair', 'Screen Fixing'], true, true),
('Chiamaka Ugwu', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 4.8, 94, '4 years', ARRAY['Makeup Services', 'Lash Fixing', 'Nail Art'], true, true),
('Obiora Nnamdi', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150', 4.7, 71, '3 years', ARRAY['Clothes Selling', 'Vintage Fashion', 'Thrift Finds'], true, true),
('Adanna Okoro', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150', 4.9, 128, '5 years', ARRAY['Bubu Gown', 'Ankara', 'Custom Tailoring'], true, true),
('Kenechukwu Arinze', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150', 4.6, 52, '3 years', ARRAY['Laptop Repair', 'Software Installation', 'Data Recovery'], true, true),
('Oluchi Mbah', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', 4.8, 89, '4 years', ARRAY['Hair Styling', 'Lash Fixing', 'Makeup'], true, true),
('Ikenna Okafor', 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=150', 4.5, 34, '2 years', ARRAY['Shoes & Sneakers', 'Sneaker Cleaning', 'Shoe Repairs'], true, true);
