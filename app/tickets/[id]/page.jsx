import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamicParams = true; // Keep dynamic routing enabled

// Generates static paths by fetching tickets data
export async function generateStaticParams() {
  try {
    const response = await fetch("http://localhost:4000/tickets");
    if (!response.ok) throw new Error("Failed to fetch tickets data");

    const tickets = await response.json();
    return tickets.map((ticket) => ({ id: ticket.id }));
  } catch (error) {
    console.error("Error fetching tickets in generateStaticParams:", error);
    return []; // Return an empty array if fetch fails to avoid breaking the build
  }
}

// Fetches individual ticket data by ID
async function getTicket(id) {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const res = await fetch(`http://localhost:4000/tickets/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      notFound(); // Redirect to 404 if the ticket is not found
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching ticket data:", error);
    notFound(); // Redirect to 404 in case of a fetch error
  }
}

// Renders ticket details page
export default async function TicketDetails({ params }) {
  const { id } = params;
  const ticket = await getTicket(id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <Link href="/tickets">
          <button className="btn-primary">View Tickets</button>
        </Link>
      </nav>
      {ticket ? (
        <div className="card">
          <h3>{ticket.title}</h3>
          <small>Created by {ticket.user_email}</small>
          <p>{ticket.body}</p>
          <div className={`pill ${ticket.priority}`}>
            {ticket.priority} priority
          </div>
        </div>
      ) : (
        <p>Loading ticket data...</p>
      )}
    </main>
  );
}
