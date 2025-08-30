export default function Offline() {
  return (
    <main className="container pt-10">
      <h1 className="text-2xl font-semibold">You’re offline</h1>
      <p className="mt-2 text-muted-foreground">
        This app works offline. Some external links (bible.com) require connection. Please reconnect to
        load those chapters.
      </p>
    </main>
  );
}