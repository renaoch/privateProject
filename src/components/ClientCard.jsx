import { Card, CardContent } from "./ui/card";

export default function ClientCard({
  client,
  selectedClient,
  setSelectedClient,
}) {
  return (
    <Card
      className={`cursor-pointer bg-zinc-800 hover:bg-zinc-700 transition-all rounded-xl transform hover:scale-105 ${
        selectedClient?.id === client.id
          ? "border-2 border-yellow-500 shadow-xl shadow-yellow-500/30"
          : "border border-transparent"
      }`}
      onClick={() => setSelectedClient(client)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col space-y-2">
          <p className="font-semibold text-lg text-white">{client.name}</p>
          <p className="text-sm text-zinc-400">{client.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}
