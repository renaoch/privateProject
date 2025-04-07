"use client";

import { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import ClientCard from "./ClientCard";
import ClientInfoCard from "./ClientInfoCard";
import ProgressUpdateDialog from "./ProgressUpdateDialog";
import ProgressCard from "./ProgressCard";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchClients = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      const currentUser = userData?.user;

      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }

      if (!currentUser) {
        console.warn("No user is logged in.");
        return;
      }

      const { data, error } = await supabase
        .from("client")
        .select("*, progress(*)")
        .eq("contractor_id", currentUser.id);

      if (error) {
        console.error("Error fetching clients:", error);
      } else {
        setClients(data);
      }

      setLoading(false); // Set loading to false after fetching data
    };

    fetchClients();
  }, []);

  // Handle progress update submission
  const handleSubmitUpdate = async (progressData) => {
    if (!selectedClient) return;
    const { summary, details, image } = progressData;
    const date = new Date().toISOString().split("T")[0];
    const { error } = await supabase.from("progress").insert([
      {
        client_id: selectedClient.client_id, // Assuming 'client_id' is the field in the selectedClient
        date: date,
        summary: summary,
        details: details,
        image: image, // Assuming the image is a URL (from Cloudinary, for example)
      },
    ]);

    if (error) {
      console.error("Error adding progress update:", error);
    } else {
      // Optionally, refetch the client's progress updates
      const { data, error: fetchError } = await supabase
        .from("client")
        .select("*, progress(*)")
        .eq("id", selectedClient.id);

      if (fetchError) {
        console.error("Error fetching updated progress:", fetchError);
      } else {
        setSelectedClient(data[0]); // Update the selected client with the new progress
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 text-white">
        {/* Loading Spinner */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 border-4 border-t-4 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-zinc-300 text-xl">Loading clients...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 text-white">
      <Navbar user={{ name: "Renao" }} />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/4 border-r border-zinc-800 p-4">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Clients</h2>
          <div className="space-y-3">
            {clients.map((client, idx) => (
              <ClientCard
                key={idx}
                client={client}
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
              />
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {selectedClient ? (
            <>
              <ClientInfoCard selectedClient={selectedClient} />
              <ProgressUpdateDialog
                selectedClient={selectedClient}
                handleSubmitUpdate={handleSubmitUpdate} // Pass the handler here
              />
              <h2 className="text-2xl font-semibold mb-4">Progress Timeline</h2>
              <div className="space-y-5">
                {selectedClient.progress?.map((update, idx) => (
                  <ProgressCard key={idx} update={update} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-zinc-400 text-lg mt-20">
              Select a client to view their details.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
