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

import gres from "@/assets/images/m-gres.jpg";
import parquet from "@/assets/images/m-parquet.jpg";
import resina from "@/assets/images/m-resina.jpg";
import pavimentiWide from "@/assets/images/m-pavimenti-wide.jpg";
import bagnoMacro from "@/assets/images/m-bagno-macro.jpg";
import bagnoWide from "@/assets/images/m-bagno-wide.jpg";
import cucinaMacro from "@/assets/images/m-cucina-macro.jpg";
import cucinaWide from "@/assets/images/m-cucina-wide.jpg";
import cartongessoWide from "@/assets/images/m-cartongesso-wide.jpg";
import cartongessoMacro from "@/assets/images/m-cartongesso-macro.jpg";
import impiantiWide from "@/assets/images/m-impianti-wide.jpg";
import impiantiMacro from "@/assets/images/m-impianti-macro.jpg";
import pitturaMacro from "@/assets/images/m-pittura-macro.jpg";
import pitturaWide from "@/assets/images/m-pittura-wide.jpg";
import grezzo from "@/assets/images/m-grezzo.jpg";
import finito from "@/assets/images/m-finito.jpg";
import pavSoglia from "@/assets/images/m-pav-soglia.jpg";
import bagnoMembrana from "@/assets/images/m-bagno-membrana.jpg";
import bagnoLavabo from "@/assets/images/m-bagno-lavabo.jpg";
import bagnoGrezzo from "@/assets/images/m-bagno-grezzo.jpg";
import cucinaParaschizzi from "@/assets/images/m-cucina-paraschizzi.jpg";
import cucinaAttacchi from "@/assets/images/m-cucina-attacchi.jpg";
import cucinaVarco from "@/assets/images/m-cucina-varco.jpg";
import cartStruttura from "@/assets/images/m-cart-struttura.jpg";
import cartParete from "@/assets/images/m-cart-parete.jpg";
import cartGola from "@/assets/images/m-cart-gola.jpg";
import impQuadro from "@/assets/images/m-imp-quadro.jpg";
import impScatole from "@/assets/images/m-imp-scatole.jpg";
import impClima from "@/assets/images/m-imp-clima.jpg";
import pitLavabile from "@/assets/images/m-pit-lavabile.jpg";
import pitTraspirante from "@/assets/images/m-pit-traspirante.jpg";
import pitMuffa from "@/assets/images/m-pit-muffa.jpg";
import pitStucco from "@/assets/images/m-pit-stucco.jpg";
import risTavolo from "@/assets/images/m-ris-tavolo.jpg";

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

/** Materie e ambienti per le landing: anch'essi illustrativi. */
export const material = {
  gres: { src: gres, alt: "Dettaglio di una lastra in gres porcellanato effetto pietra con fuga sottile" },
  parquet: { src: parquet, alt: "Parquet di rovere posato a spina di pesce, in luce radente" },
  resina: { src: resina, alt: "Pavimento continuo in resina color calce, senza fughe" },
  pavimentiWide: { src: pavimentiWide, alt: "Stanza vuota con pavimento effetto pietra attraversato dalla luce di una porta-finestra" },
  bagnoMacro: { src: bagnoMacro, alt: "Piastrelle smaltate verde mare con gocce d'acqua" },
  bagnoWide: { src: bagnoWide, alt: "Doccia a filo pavimento con lastre chiare e nicchia verde mare" },
  cucinaMacro: { src: cucinaMacro, alt: "Bordo di un piano cucina in pietra lavica accanto a una parete intonacata" },
  cucinaWide: { src: cucinaWide, alt: "Cucina aperta sul soggiorno attraverso un ampio varco nella parete" },
  cartongessoWide: { src: cartongessoWide, alt: "Stanza bianca con controsoffitto a volumi e gola luminosa" },
  cartongessoMacro: { src: cartongessoMacro, alt: "Sezione di una parete in cartongesso con lastre, profilo metallico e isolante" },
  impiantiWide: { src: impiantiWide, alt: "Parete in laterizio con tracce ordinate per corrugati e tubi di rame" },
  impiantiMacro: { src: impiantiMacro, alt: "Collettore in ottone con tubazioni di rame parallele" },
  pitturaMacro: { src: pitturaMacro, alt: "Bordo netto di pittura a calce color ocra su intonaco chiaro" },
  pitturaWide: { src: pitturaWide, alt: "Parete a calce attraversata da una lama di luce" },
  ristrutturazioneGrezzo: { src: grezzo, alt: "Schema illustrativo: stanza al grezzo con mattoni e massetto" },
  ristrutturazioneFinito: { src: finito, alt: "Schema illustrativo: la stessa stanza a lavori finiti" },
  pavSoglia: { src: pavSoglia, alt: "Massetto livellato accanto alla soglia di una porta e a un nuovo battiscopa" },
  bagnoMembrana: { src: bagnoMembrana, alt: "Angolo di una doccia con guaina impermeabilizzante e nastro di rinforzo" },
  bagnoLavabo: { src: bagnoLavabo, alt: "Lavabo sospeso su parete rivestita in lastre chiare" },
  bagnoGrezzo: { src: bagnoGrezzo, alt: "Bagno al grezzo con nuove tubazioni e scarichi nelle tracce" },
  cucinaParaschizzi: { src: cucinaParaschizzi, alt: "Paraschizzi in piastrelle con prese elettriche allineate" },
  cucinaAttacchi: { src: cucinaAttacchi, alt: "Parete intonacata con attacchi idraulici e scatole elettriche predisposte" },
  cucinaVarco: { src: cucinaVarco, alt: "Ampio varco aperto in una parete con architrave in acciaio durante i lavori" },
  cartStruttura: { src: cartStruttura, alt: "Orditura metallica di un controsoffitto in costruzione" },
  cartParete: { src: cartParete, alt: "Parete divisoria in cartongesso rasata con vano porta" },
  cartGola: { src: cartGola, alt: "Dettaglio di una gola luminosa in un controsoffitto bianco" },
  impQuadro: { src: impQuadro, alt: "Quadro elettrico ordinato con interruttori modulari" },
  impScatole: { src: impScatole, alt: "Scatole elettriche e corrugati pronti nella parete" },
  impClima: { src: impClima, alt: "Tubazioni in rame e scarico predisposti per un climatizzatore" },
  pitLavabile: { src: pitLavabile, alt: "Corridoio con pareti lisce a finitura satinata" },
  pitTraspirante: { src: pitTraspirante, alt: "Dettaglio di una parete con pittura minerale opaca" },
  pitMuffa: { src: pitMuffa, alt: "Angolo tra parete e soffitto trattato dopo la rimozione della muffa" },
  pitStucco: { src: pitStucco, alt: "Crepa stuccata e carteggiata su una parete pronta per la pittura" },
  risTavolo: { src: risTavolo, alt: "Pianta di progetto su un tavolo da cantiere in una stanza in ristrutturazione" },
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
