import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

export default function ClientInfoCard({ selectedClient }) {
  return (
    <Card className="bg-zinc-800/80 backdrop-blur-lg mb-6 shadow-xl border border-zinc-700">
      <CardHeader>
        <CardTitle className="text-white text-2xl tracking-tight">Client Overview</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-zinc-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <span className="font-semibold">Client ID:</span> {selectedClient.id}
        </div>
        <div>
          <span className="font-semibold">Name:</span> {selectedClient.name}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {selectedClient.email}
        </div>
        <div>
          <span className="font-semibold">Work Type:</span> {selectedClient.workType}
        </div>

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
                <DialogTitle className="text-lg mb-2">Client Contract</DialogTitle>
              </DialogHeader>
              <div className="text-sm text-zinc-300 whitespace-pre-line leading-relaxed">
                {selectedClient.contractText || "No contract uploaded yet."}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
