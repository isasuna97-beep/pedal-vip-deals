CREATE TYPE public.app_role AS ENUM ('admin','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.whatsapp_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  url text NOT NULL,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.whatsapp_links TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.whatsapp_links TO authenticated;
GRANT ALL ON public.whatsapp_links TO service_role;
ALTER TABLE public.whatsapp_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view the active link" ON public.whatsapp_links FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Admins can view all links" ON public.whatsapp_links FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert links" ON public.whatsapp_links FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update links" ON public.whatsapp_links FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete links" ON public.whatsapp_links FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Garante apenas um link ativo por vez
CREATE OR REPLACE FUNCTION public.ensure_single_active_link()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.is_active THEN
    UPDATE public.whatsapp_links SET is_active = false WHERE id <> NEW.id AND is_active = true;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_single_active_link
AFTER INSERT OR UPDATE OF is_active ON public.whatsapp_links
FOR EACH ROW WHEN (NEW.is_active) EXECUTE FUNCTION public.ensure_single_active_link();

INSERT INTO public.whatsapp_links (label, url, is_active)
VALUES ('Grupo VIP principal', 'https://chat.whatsapp.com/KnyYvtoZ0dcEjOWeRlUAcv', true);