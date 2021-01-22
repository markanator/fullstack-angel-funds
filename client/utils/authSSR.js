export const requirePageAuth = (inner) =>{
  return async (context) => {
    const session = await getSession(context.req);

    if (!session) {
      context.res.writeHead(307, { Location: '/api/auth/login'});
      context.res.end();

      return { props: {}};
    }

    return inner ? inner(context, auth) : { props: {session }}
  }
}