import type { StaticImageData } from "next/image";
import hero from "@/assets/images/hero.jpg";
import heroMobileSrc from "@/assets/images/hero-mobile.jpg";
import materia from "@/assets/images/materia.jpg";
import cantiere from "@/assets/images/cantiere.jpg";
import progetto from "@/assets/images/progetto.jpg";
import facciata from "@/assets/images/facciata.jpg";
import terrazza from "@/assets/images/terrazza.jpg";
import cucina from "@/assets/images/cucina.jpg";
import cartongesso from "@/assets/images/cartongesso.jpg";
import impianti from "@/assets/images/impianti.jpg";
import pavimenti from "@/assets/images/pavimenti.jpg";
import bagno from "@/assets/images/bagno.jpg";
import demolizione from "@/assets/images/demolizione.jpg";
import ombra from "@/assets/images/ombra.jpg";
import porta from "@/assets/images/porta.jpg";
import pittura from "@/assets/images/pittura.jpg";

export const heroMobile = heroMobileSrc;

export interface Media {
  src: StaticImageData;
  alt: string;
}

/**
 * Tutte le immagini sono rappresentazioni illustrative (generate o da stock
 * con licenza, vedi docs/IMAGE-PLAN.md): mai presentarle come lavori eseguiti.
 */
export const IMAGE_NOTE = "Immagini illustrative: non raffigurano lavori eseguiti tramite questo servizio.";

export const media = {
  hero: { src: hero, alt: "Corridoio ad arco in calce con pavimento in cementine e luce radente da una porta-finestra" },
  materia: { src: materia, alt: "Dettaglio di un gradino in pietra lavica, intonaco a calce e cotto" },
  cantiere: { src: cantiere, alt: "Appartamento in ristrutturazione con parete in laterizio e tracce per gli impianti" },
  progetto: { src: progetto, alt: "Pianta disegnata su carta da lucido con campioni di cotto, pietra lavica e intonaco" },
  facciata: { src: facciata, alt: "Facciata di un palazzo primo Novecento in restauro con ponteggio laterale" },
  terrazza: { src: terrazza, alt: "Terrazzo con nuova impermeabilizzazione e vista sul mare" },
  ombra: { src: ombra, alt: "Luce e ombre su una parete di intonaco" },
  porta: { src: porta, alt: "Vecchio muro intonacato accanto a una porta in legno" },
} satisfies Record<string, Media>;

export const serviceMedia: Record<string, Media> = {
  ristrutturazioni: { src: demolizione, alt: "Appartamento durante la demolizione di una parete, con mattoni a vista e puntelli" },
  bagno: { src: bagno, alt: "Bagno rivestito in pietra con doccia a filo" },
  cucina: { src: cucina, alt: "Cucina essenziale con piano in pietra lavica e pavimento in cementine" },
  cartongesso: { src: cartongesso, alt: "Parete in cartongesso in costruzione con montanti metallici" },
  imbianchino: { src: pittura, alt: "Rullo che stende la pittura bianca su una parete" },
  impianti: { src: impianti, alt: "Corrugati e tubazioni nelle tracce di una parete in laterizio" },
  pavimenti: { src: pavimenti, alt: "Posa di piastrelle di grande formato con distanziatori" },
};
