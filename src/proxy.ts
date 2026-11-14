import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Solo area /admin: refresh della sessione Supabase e redirect al login.
 * Il redirect al dominio canonico è in next.config.ts (redirects): così le pagine
 * pubbliche escono dalla cache CDN senza passare da una funzione.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return new NextResponse("Admin non configurato", { status: 503 });

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) response.cookies.set(name, value, options);
      },
    },
  });
  const { data } = await supabase.auth.getUser();
  const isLogin = pathname.startsWith("/admin/login");
  if (!data.user && !isLogin) {
    const login = request.nextUrl.clone();
    login.pathname = "/admin/login/";
    login.search = "";
    return NextResponse.redirect(login);
  }
  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
