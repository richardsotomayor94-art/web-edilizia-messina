import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * 1) Dominio canonico: in produzione, se il sito è indicizzabile e la
 *    richiesta arriva da un host diverso da SITE_URL (es. *.vercel.app),
 *    redirect 308 al dominio definitivo (evita contenuti duplicati).
 * 2) Area /admin: refresh della sessione Supabase e redirect al login.
 */
export async function proxy(request: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const indexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true" && process.env.VERCEL_ENV === "production";
  if (indexable && siteUrl) {
    const canonical = new URL(siteUrl);
    const host = request.headers.get("host") ?? "";
    if (host && host !== canonical.host && !host.startsWith("localhost")) {
      const url = new URL(request.nextUrl.pathname + request.nextUrl.search, canonical);
      return NextResponse.redirect(url, 308);
    }
  }

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
  matcher: ["/((?!_next/static|_next/image|icon.svg|favicon.ico|og.png).*)"],
};
