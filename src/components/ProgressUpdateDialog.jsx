import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

export default function ProgressUpdateDialog({
  selectedClient,
  handleSubmitUpdate,
  setClients, // Pass setClients function to update clients immediately after submission
}) {
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false); // Dialog open/close state

  const handleFormSubmit = async () => {
    if (!selectedClient) return;

    // Call the external handleSubmitUpdate function to handle the actual update logic
    const newUpdate = await handleSubmitUpdate({
      selectedClient,
      date,
      summary,
      details,
      images,
    });

    // If new update is successful, update the parent component's state (clients)
    if (newUpdate) {
      setClients((prevClients) => {
        return prevClients.map((client) =>
          client.id === selectedClient.id
            ? { ...client, progress: [...client.progress, newUpdate] }
            : client
        );
      });

      // Close the dialog on successful submission
      setOpen(false);
    }

    // Reset form values after submission
    setDate("");
    setSummary("");
    setDetails("");
    setImages([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex justify-center items-center my-6">
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="border-zinc-600 text-white hover:bg-zinc-800 hover:border-zinc-400 transition-all"
            onClick={() => setOpen(true)} // Open the dialog when the button is clicked
          >
            Submit Update
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="bg-zinc-900 border border-zinc-700 shadow-xl rounded-xl text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl mb-1">
            Submit Progress Update
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-zinc-400">Date</label>
            <input
              type="date"
              className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-zinc-400">Summary</label>
            <input
              type="text"
              placeholder="Brief update summary"
              className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-zinc-400">Work Details</label>
            <textarea
              placeholder="Full work description..."
              rows={4}
              className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-zinc-400">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md"
              onChange={(e) => setImages([...e.target.files])}
            />
          </div>
          <div className="pt-2">
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleFormSubmit}
            >
              Submit Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
