import { notFound } from "next/navigation";
import Link from "next/link";
export const dynamicParams = true; // default val = true

export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/tickets");

  const tickets = await res.json();

  return tickets.map((ticket) => ({
    id: ticket.id,
  }));
}

async function getTicket(id) {
  // imitate delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  // check if the response is correct or no
  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function TicketDetails({params}) {
  // const id = params.id
  const ticket = await getTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details </h2>
        <Link href="/tickets">
          <button className="btn-primary">View Tickets</button>
        </Link>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
