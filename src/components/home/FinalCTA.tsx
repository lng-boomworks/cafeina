import { FadeIn } from "../FadeIn";
import { Button } from "../Button";

interface FinalCTAProps {
  heading?: string;
  text?: string;
}

export function FinalCTA({
  heading = "Pop in and say hola.",
  text = "We're open every day from 9am until late. Table service, homemade cakes, and a warm welcome.",
}: FinalCTAProps) {
  return (
    <section className="bg-teal-deep text-white py-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-white mb-6">{heading}</h2>
          <p className="text-teal-light text-lg mb-10 max-w-2xl mx-auto">{text}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="white" href="/contact">Book a table</Button>
            <Button variant="outline-white" href="tel:+34635477903">Call +34 635 477 903</Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
