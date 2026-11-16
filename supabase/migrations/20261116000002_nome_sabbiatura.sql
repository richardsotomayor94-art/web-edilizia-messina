-- Nome commerciale concordato con il titolare il 2026-11-16: «Sabbiatura e pulizia delle superfici».
-- Cambia solo l'etichetta in public.services: lo slug `sabbiatura` (usato da modulo, richieste, imprese
-- e instradamento) resta identico. Rieseguibile senza effetti: aggiorna solo se il nome è diverso.
-- Il sito e l'area admin mostrano già il nome da src/config/specialist.ts: questa riga allinea il catalogo.
-- Applicata il 2026-11-16 con l'autorizzazione del proprietario (versione remota 20261116190218).

update public.services
   set name = 'Sabbiatura e pulizia delle superfici'
 where slug = 'sabbiatura'
   and name is distinct from 'Sabbiatura e pulizia delle superfici';
