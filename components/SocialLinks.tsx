import Image from "next/image"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

export default function SocialLinks({
    className,
    ...props
}: React.HTMLProps<HTMLDivElement>) {
    return (
        <div className={twMerge("flex flex-row gap-8 px-8")} {...props}>
            <Link
                href="https://www.instagram.com/braciabien/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src="/instagram.svg"
                    className="m-auto object-contain select-none h-[100px]"
                    alt="instagram"
                    width={50}
                    height={50}
                ></Image>
            </Link>
            <Link
                href="https://www.facebook.com/BraciaBien/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src="/facebook.svg"
                    className="m-auto object-contain select-none h-[100px]"
                    alt="facebook"
                    width={50}
                    height={50}
                ></Image>
            </Link>
        </div>
    )
}
