import { json, type ActionFunctionArgs } from "@remix-run/node";

import { getI18nSession } from "~/services/sessions.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const locale = formData.get("locale");

  if (typeof locale !== "string") {
    return json({ success: false }, { status: 400 });
  }

  const i18nSession = await getI18nSession(request);
  i18nSession.setLocale(locale);

  return json(
    { success: true, locale },
    {
      headers: {
        "Set-Cookie": await i18nSession.commitI18nSession(),
      },
    }
  );
}
