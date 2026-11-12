import Image from "next/image";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./SolutionCertRow.module.css";

/* Reuses 6 of the Footer's 8 cert-badge assets verbatim — DebtLink and RMAi
   are omitted here. Order matches this page's own reference (ISO, HIPAA,
   FDCPA, Reg F, TCPA, SOC2), which differs from the Footer's own ordering. */
const BADGES = [
  { label: "ISO 27001", src: "/assets/footer-cert-iso.png", width: 420, height: 420 },
  { label: "HIPAA Compliant", src: "/assets/footer-cert-hipaa.png", width: 420, height: 420 },
  { label: "FDCPA", src: "/assets/footer-cert-fdcpa.png", width: 420, height: 420 },
  { label: "Reg F", src: "/assets/footer-cert-regf.png", width: 420, height: 420 },
  { label: "TCPA", src: "/assets/footer-cert-tcpa.png", width: 420, height: 420 },
  { label: "AICPA SOC 2", src: "/assets/footer-cert-soc2.png", width: 420, height: 420 },
];

export function SolutionCertRow() {
  return (
    <section className={styles.section} aria-label="Certifications and compliance">
      <div className="container">
        <Entrance as="ul" className={styles.row}>
          {BADGES.map(({ label, src, width, height }) => (
            <li key={label}>
              <Image src={src} alt={label} width={width} height={height} className={styles.badge} />
            </li>
          ))}
        </Entrance>
      </div>
    </section>
  );
}
