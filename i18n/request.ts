import { getRequestConfig } from "next-intl/server";

import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieData = cookies().get("locale");
  const locale = cookieData?.value || "de";
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
