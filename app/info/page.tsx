import { playfair } from "@/lib/fonts"
import { twJoin } from "tailwind-merge"
import { AnimateContentMain } from "@/components/MainLayout/Animation"

const classes = () => ({
  label: "text-muted-foreground text-sm",
  cell: "flex flex-col",
})

export default function Info() {
  return (
    <AnimateContentMain className="flex flex-col lg:flex-row gap-20 justify-center items-center mt-20">
      <div className="px-4">
        <h1 className={twJoin(playfair.className, "font-bold text-6xl mb-10")}>
          Kontakt
        </h1>
        <ul className="flex flex-col gap-4">
          <li className={classes().cell}>
            <label className={classes().label} htmlFor="name">
              Nazwa firmy
            </label>
            <p id="name">BRACIA BIEŃ SPÓŁKA JAWNA</p>
          </li>
          <li className={classes().cell}>
            <label className={classes().label} htmlFor="adres">
              Adres firmy
            </label>
            <a
              href="https://maps.app.goo.gl/GACveQX2KHgVhpbPA"
              target="_blank"
              className="hover:underline"
              id="adres"
            >
              UL. STAWISZYŃSKA 125, 62-800 KALISZ
            </a>
          </li>
          <li className={classes().cell}>
            <label className={classes().label} htmlFor="tel">
              Numer telefonu
            </label>
            <a
              id="tel"
              href="tel:+48502896299"
              target="_blank"
              className="hover:underline"
            >
              +48 502 896 299
            </a>
          </li>
          <li className={classes().cell}>
            <label className={classes().label} htmlFor="mail">
              Adres email
            </label>
            <a
              id="mail"
              href="mailto:braciabien@gmail.com"
              target="_blank"
              className="hover:underline"
            >
              braciabien@gmail.com
            </a>
          </li>
          <li className={classes().cell}>
            <label className={classes().label} htmlFor="nip">
              NIP
            </label>
            <p id="nip">6182146467</p>
          </li>
          <li className={classes().cell}>
            <label className={classes().label} htmlFor="regon">
              Numer REGON
            </label>
            <p id="regon">302762354</p>
          </li>
          <li className={classes().cell}>
            <label className={classes().label} htmlFor="krs">
              Numer KRS
            </label>
            <p id="krd">0000514148</p>
          </li>
        </ul>
      </div>
      <iframe
        className="w-full p-6 md:p-0 md:w-[600px]"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d531.7855185953554!2d18.090270058012734!3d51.781739966495984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ac5101b3da60d%3A0x501f9365fc7a3711!2sBracia%20Bie%C5%84%20hurtownia%20bielizny!5e0!3m2!1sen!2spl!4v1700738202950!5m2!1sen!2spl"
        width="600"
        height="450"
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </AnimateContentMain>
  )
}
