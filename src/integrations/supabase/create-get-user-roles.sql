
-- Function to get user roles without triggering RLS recursion
CREATE OR REPLACE FUNCTION public.get_user_roles(user_id UUID)
RETURNS app_role[]
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT array_agg(role)::app_role[]
  FROM public.user_roles
  WHERE user_id = get_user_roles.user_id;
$$;

-- Test the function:
-- SELECT * FROM get_user_roles('YOUR-USER-ID-HERE');
