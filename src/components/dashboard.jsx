"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { CalendarDays } from "lucide-react";
import Navbar from "./Navbar"; // ✅ import Navbar

const mockClients = [
  {
    id: "CL-1024",
    name: "Rohan Saikia",
    email: "rohan@example.com",
    workType: "Construction",
    fileName: "rohan_blueprint.pdf",
    progress: [
      {
        date: "2025-04-01",
        summary: "Foundation completed",
        details:
          "Excavation completed. Concrete poured for foundation. Rebar installed properly with waterproof membrane.",
      },
      {
        date: "2025-04-02",
        summary: "Basement walls started",
        details:
          "Wooden frames and reinforcement prepared. Cement poured for lower-level walls. Work paused due to rain forecast.",
      },
    ],
  },
  {
    id: "CL-1025",
    name: "Babu Patel",
    email: "babu@example.com",
    workType: "Interior Design",
    fileName: "babu_interior_plan.pdf",
    progress: [
      {
        date: "2025-04-03",
        summary: "Concept finalized",
        details:
          "Client approved a modern interior with walnut wood finish and warm LED lighting. Material orders placed.",
      },
    ],
  },
];

export default function Dashboard() {
  const [selectedClient, setSelectedClient] = useState(mockClients[0]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 text-white">
      {/* ✅ Navbar on top */}
      <Navbar user={{ name: "Renao" }} />

      {/* Main body - flex row for sidebar + content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/4 border-r border-zinc-800 p-4">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Clients</h2>
          <ScrollArea className="h-[85vh] pr-2">
            <div className="p-3 space-y-3">
              {mockClients.map((client, idx) => (
                <Card
                  key={idx}
                  className={`cursor-pointer bg-zinc-800 hover:bg-zinc-700 transition-all ${
                    selectedClient.id === client.id
                      ? "border-2 border-indigo-400 shadow-md shadow-indigo-500/30 scale-[1.01]"
                      : ""
                  }`}
                  onClick={() => setSelectedClient(client)}
                >
                  <CardContent className="p-4">
                    <p className="font-semibold text-lg">{client.name}</p>
                    <p className="text-sm text-zinc-400">{client.email}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Client Info */}
          <Card className="bg-zinc-800/80 backdrop-blur-lg mb-6 shadow-xl border border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl tracking-tight">
                Client Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <span className="font-semibold">Client ID:</span>{" "}
                {selectedClient.id}
              </div>
              <div>
                <span className="font-semibold">Name:</span>{" "}
                {selectedClient.name}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {selectedClient.email}
              </div>
              <div>
                <span className="font-semibold">Work Type:</span>{" "}
                {selectedClient.workType}
              </div>

              {/* contract view  */}
              <div className="col-span-full sm:col-span-1 mt-10">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-zinc-600 text-white hover:bg-zinc-800 hover:border-zinc-400 transition-all"
                    >
                      📄 View Contract
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-zinc-900 border border-zinc-700 shadow-xl rounded-xl text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-lg mb-2">
                        Client Contract
                      </DialogTitle>
                    </DialogHeader>

                    <div className="text-sm text-zinc-300 whitespace-pre-line leading-relaxed">
                      {selectedClient.contractText ||
                        "No contract uploaded yet."}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Submit Update Dialog */}
          <Dialog>
            <div className="flex justify-center items-center my-6">
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-zinc-600 text-white hover:bg-zinc-800 hover:border-zinc-400 transition-all"
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
                {/* Date Picker */}
                <div className="space-y-1">
                  <label className="text-sm text-zinc-400">Date</label>
                  <input
                    type="date"
                    className="bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 w-full text-white"
                    min={new Date().toISOString().split("T")[0]} // restrict past dates
                  />
                </div>

                {/* Summary */}
                <div className="space-y-1">
                  <label className="text-sm text-zinc-400">Summary</label>
                  <input
                    type="text"
                    placeholder="Brief update summary"
                    className="bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 w-full text-white"
                  />
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <label className="text-sm text-zinc-400">Work Details</label>
                  <textarea
                    placeholder="Full work description..."
                    rows={4}
                    className="bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 w-full text-white"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-1">
                  <label className="text-sm text-zinc-400">Upload Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="text-sm text-zinc-300 file:mr-3 file:bg-zinc-700 file:text-white file:rounded file:px-3 file:py-1"
                  />
                  {/* You can add a preview grid here later */}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button variant="secondary" className="w-full">
                    Submit Update
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Progress Section */}
          <h2 className="text-2xl font-semibold mb-4">Progress Timeline</h2>
          <Separator className="mb-4 bg-zinc-700" />

          <div className="space-y-5">
            {selectedClient.progress.map((update, idx) => (
              <Card
                key={idx}
                className="bg-zinc-800/80 backdrop-blur border border-zinc-700"
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-zinc-400 text-sm">
                    <CalendarDays className="w-4 h-4" />
                    <span>{update.date}</span>
                  </div>

                  <p className="text-lg font-medium text-white">
                    {update.summary}
                  </p>

                  {/* View Details Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary" className="text-sm">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-900 border border-zinc-700 shadow-xl rounded-xl text-white max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-lg mb-2">
                          Work Details
                        </DialogTitle>
                      </DialogHeader>

                      <p className="text-sm text-zinc-300 whitespace-pre-line leading-relaxed mb-4">
                        {update.details}
                      </p>

                      {/* Gallery */}
                      <div>
                        <h3 className="text-base font-semibold mb-2">
                          Gallery
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {[1, 2, 3].map((imgId) => (
                            <img
                              key={imgId}
                              src={`https://picsum.photos/seed/${
                                imgId + idx
                              }/300/200`}
                              alt={`Work Image ${imgId}`}
                              className="rounded-lg border border-zinc-700 hover:scale-105 transition-all duration-200"
                            />
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
