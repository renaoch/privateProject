import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

export default function ContractorCard({ contractor }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{contractor.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Progress</p>
          <Progress value={contractor.progress} />
        </div>
        <table className="w-full text-left border-t pt-4">
          <thead>
            <tr className="text-sm text-muted-foreground">
              <th className="py-2">Client</th>
              <th>Contract</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {contractor.clients.map((client, i) => (
              <tr key={i} className="border-t">
                <td className="py-2">{client.name}</td>
                <td>{client.contract}</td>
                <td>{client.status}</td>
                <td>{client.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
