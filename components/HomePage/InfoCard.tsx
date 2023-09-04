import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function InfoCard({ className }: { className: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Informacje</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row w-full justify-around gap-3 flex-wrap"></div>
      </CardContent>
    </Card>
  )
}
