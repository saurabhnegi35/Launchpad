declare module "next-auth" {
  interface session {
    session: id;
  }
  interface jwt {
    session: id;
  }
}
