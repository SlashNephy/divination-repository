export const onRequest: PagesFunction<Env> = async (context) => {
  return Response.redirect("https://github.com/SlashNephy/Divination", 301)
}
