import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ReactNode } from "react"

function InfoCard({
    className,
    title,
    description,
    children,
    footer,
}: {
    className?: string
    title?: string
    description?: string
    children?: ReactNode
    footer?: ReactNode
}) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter>{footer}</CardFooter>
        </Card>
    )
}
export default function InfoCards({
    cards,
    className,
}: {
    className?: string
    cards: {
        className?: string
        title?: string
        description?: string
        children?: ReactNode
        footer?: ReactNode
    }[]
}) {
    return cards.map((e, i) => <InfoCard key={i} {...e} />)
}
