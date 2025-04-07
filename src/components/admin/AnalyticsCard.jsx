import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";

export default function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">$120,000</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Contracts</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">21</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Contractors</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">5</CardContent>
      </Card>
    </div>
  );
}
