import Link from "next/link";
import React from "react";

export default function notFound() {
  return (
    <main className="text center">
      <h2 className="text-3xl">No Tickets Found</h2>
      <p>We could not find the page you wew asking for.</p>
      <p>
        Go back to the <Link href="/tickets">Tickets</Link>
      </p>
    </main>
  );
}
    