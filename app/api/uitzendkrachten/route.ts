import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Importeer de Prisma Client

// GET: Alle uitzendkrachten ophalen
export async function GET() {
  try {
    const uitzendkrachten = await prisma.uitzendkracht.findMany({
      include: {
        uitzendkrachtRayons: { // Zorgt ervoor dat gerelateerde rayons worden meegenomen
          include: {
            rayon: true,
          },
        },
      },
      orderBy: {
        naam: 'asc', // Sorteer op naam
      },
    });
    return NextResponse.json(uitzendkrachten);
  } catch (error) {
    console.error('Fout bij ophalen uitzendkrachten:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}

// POST: Nieuwe uitzendkracht toevoegen
export async function POST(request: Request) {
  try {
    const { naam, contactInfo, maxWerkdagenPerWeek, rayonNamen } = await request.json();

    // Basic validatie
    if (!naam) {
      return NextResponse.json({ message: 'Naam is verplicht' }, { status: 400 });
    }

    const nieuweUitzendkracht = await prisma.uitzendkracht.create({
      data: {
        naam,
        contactInfo,
        maxWerkdagenPerWeek: maxWerkdagenPerWeek || 5, // Standaard 5 als niet opgegeven
        // Voeg hier de logica toe voor het koppelen van rayons
        uitzendkrachtRayons: {
          create: rayonNamen ? rayonNamen.map((rayonNaam: string) => ({
            rayon: {
              connectOrCreate: {
                where: { naam: rayonNaam },
                create: { naam: rayonNaam },
              },
            },
          })) : [],
        },
      },
    });

    return NextResponse.json(nieuweUitzendkracht, { status: 201 });
  } catch (error) {
    console.error('Fout bij toevoegen uitzendkracht:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
