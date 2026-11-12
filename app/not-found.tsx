import type { Metadata } from "next";
import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page Not Found — Vodex",
  description: "The page you're looking for doesn't exist or may have been moved.",
};

export default function NotFound() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main>
        <section className={styles.section}>
          <div className="container">
            <Entrance immediate delay={0} className={styles.imageWrap}>
              <Image
                src="/assets/404-desert-illustration.png"
                alt="Desert illustration with cacti and a broken 404 sign under a setting sun"
                width={2000}
                height={1134}
                className={styles.image}
                priority
              />
            </Entrance>
            <Entrance immediate as="h1" delay={140} className={styles.title}>
              Page not found
            </Entrance>
            <Entrance immediate as="p" delay={200} className={styles.lead}>
              The page you&rsquo;re looking for doesn&rsquo;t exist or may have been moved.
            </Entrance>
            <Entrance immediate delay={260} className={styles.actions}>
              <Button href="/" variant="light" withArrow>
                Back to Home
              </Button>
            </Entrance>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
