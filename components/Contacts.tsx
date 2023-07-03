import { playfair } from "@/app/fonts"

export default function Contacts() {
  return (
    <div className="flex justify-center bg-red-500">
      <div className="max-w-fit m-auto flex flex-col gap-3">
        <h1 className={`text-5xl mb-4 ${playfair.className}`}>
          Skontaktuj się
          <br /> z nami
        </h1>
        <a href="tel:+48502896299" className="w-fit bg-white">
          +48 502 896 299
        </a>
        <a href="mailto: braciabien@gmail.com">braciabien@gmail.com</a>
        <a href="https://goo.gl/maps/BfMbTwFQTeVjVR717" target="_blank">
          Stawiszyńska 125, 62-800 Kalisz
        </a>
      </div>
    </div>
  )
}
