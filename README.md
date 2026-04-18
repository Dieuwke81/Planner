# Uitzendkracht Planner App

Dit is een planningsapplicatie voor uitzendkrachten, gebouwd met Next.js, TypeScript, Tailwind CSS en Prisma.

## Functionaliteiten
- Lijst van uitzendkrachten beheren
- Beschikbaarheid van uitzendkrachten invoeren (per dag met beperkingen, wekelijks)
- Rayons beheren en koppelen aan uitzendkrachten
- Diensten invoeren
- Matching-logica om geschikte uitzendkrachten voor diensten te vinden
- Planning en overzicht van ingedeelde diensten

## Installatie & Deployment

Deze applicatie is ontworpen om direct vanuit GitHub te deployen via Vercel.

**Belangrijke Stap:** Na deployment op Vercel moet je de `DATABASE_URL` omgevingsvariabele instellen in de Vercel projectinstellingen.

## Database Configuratie (Prisma)

Het databasemodel is gedefinieerd in `prisma/schema.prisma`. Na het instellen van de `DATABASE_URL` in Vercel, zal Prisma automatisch de database initialiseren bij de eerste deployment.
