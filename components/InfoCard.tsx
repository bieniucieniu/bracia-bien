import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function InfoCard({ className }: { className?: string }) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    <mark>Card Content</mark> ipsum dolor sit amet, consectetur
                    adipiscing elit. Sed in nulla pretium, ultricies magna et,
                    sodales metus. Praesent non sapien tincidunt, porttitor odio
                    iaculis, suscipit lorem.
                </p>
            </CardContent>
            <CardFooter>
                <p>
                    <mark>Card Footer</mark>
                    Nam condimentum rutrum mauris, sit amet lacinia massa
                    vehicula a. Nullam a egestas nisi, vel scelerisque diam.
                    Duis convallis, nulla vel ornare rutrum,
                </p>
            </CardFooter>
        </Card>
    )
}
