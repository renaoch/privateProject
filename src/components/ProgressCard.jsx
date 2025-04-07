import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { CalendarDays } from "lucide-react";
export default function ProgressCard({ update }) {
  return (
    <Card className="bg-zinc-800/80 backdrop-blur border border-zinc-700">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center gap-3 text-zinc-400 text-sm">
          <CalendarDays className="w-4 h-4" />
          <span>{update.date}</span>
        </div>
        <p className="text-lg font-medium text-white">{update.summary}</p>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="text-sm">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border border-zinc-700 shadow-xl rounded-xl text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg mb-2">Work Details</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-zinc-300 whitespace-pre-line leading-relaxed mb-4">
              {update.details}
            </p>
            <div>
              <h3 className="text-base font-semibold mb-2">Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(update.imageUrls || []).map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Work Image ${i + 1}`}
                    className="rounded-lg border border-zinc-700 hover:scale-105 transition-all duration-200"
                  />
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
