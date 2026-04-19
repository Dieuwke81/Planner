'use client';

import React, { useState, useEffect } from 'react';

interface Rayon {
  id: string;
  naam: string;
}

interface Uitzendkracht {
  id: string;
  naam: string;
  contactInfo?: string;
  maxWerkdagenPerWeek: number;
  actief: boolean;
  uitzendkrachtRayons: {
    rayon: Rayon;
  }[];
}

export default function UitzendkrachtenPage() {
  const [uitzendkrachten, setUitzendkrachten] = useState<Uitzendkracht[]>([]);
  const [nieuweNaam, setNieuweNaam] = useState('');
  const [nieuwContact, setNieuwContact] = useState('');
  const [nieuwMaxDagen, setNieuwMaxDagen] = useState(5);
  const [geselecteerdeRayons, setGeselecteerdeRayons] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const beschikbareRayons = ['Stad', 'Streek', 'Valkenswaard', 'Helmond', 'Reusel']; // Hardcoded voor nu

  useEffect(() => {
    fetchUitzendkrachten();
  }, []);

  const fetchUitzendkrachten = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/uitzendkrachten');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Uitzendkracht[] = await response.json();
      setUitzendkrachten(data);
    } catch (err: any) {
      console.error('Fout bij ophalen uitzendkrachten:', err);
      setError(`Kon uitzendkrachten niet laden: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUitzendkracht = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!nieuweNaam) {
      setError('Naam is verplicht.');
      return;
    }

    try {
      const response = await fetch('/api/uitzendkrachten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          naam: nieuweNaam,
          contactInfo: nieuwContact,
          maxWerkdagenPerWeek: nieuwMaxDagen,
          rayonNamen: geselecteerdeRayons,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setNieuweNaam('');
      setNieuwContact('');
      setNieuwMaxDagen(5);
      setGeselecteerdeRayons([]);
      fetchUitzendkrachten(); // Ververs de lijst
    } catch (err: any) {
      console.error('Fout bij toevoegen uitzendkracht:', err);
      setError(`Kon uitzendkracht niet toevoegen: ${err.message}`);
    }
  };

  const handleRayonChange = (rayonNaam: string) => {
    setGeselecteerdeRayons(prev =>
      prev.includes(rayonNaam)
        ? prev.filter(name => name !== rayonNaam)
        : [...prev, rayonNaam]
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Uitzendkrachten Beheer</h2>

      {/* Formulier voor nieuwe uitzendkracht */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Nieuwe Uitzendkracht Toevoegen</h3>
        <form onSubmit={handleAddUitzendkracht} className="space-y-4">
          <div>
            <label htmlFor="naam" className="block text-sm font-medium text-gray-700">Naam:</label>
            <input
              type="text"
              id="naam"
              value={nieuweNaam}
              onChange={(e) => setNieuweNaam(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Info (optioneel):</label>
            <input
              type="text"
              id="contact"
              value={nieuwContact}
              onChange={(e) => setNieuwContact(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="maxDagen" className="block text-sm font-medium text-gray-700">Max. Werkdagen/Week:</label>
            <input
              type="number"
              id="maxDagen"
              value={nieuwMaxDagen}
              onChange={(e) => setNieuwMaxDagen(parseInt(e.target.value))}
              min="1"
              max="7"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">Toegewezen Rayons:</span>
            <div className="flex flex-wrap gap-2">
              {beschikbareRayons.map((rayon) => (
                <label key={rayon} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                    value={rayon}
                    checked={geselecteerdeRayons.includes(rayon)}
                    onChange={() => handleRayonChange(rayon)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{rayon}</span>
                </label>
              ))}
            </div>
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Uitzendkracht Toevoegen
          </button>
        </form>
      </div>

      {/* Lijst van uitzendkrachten */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Overzicht Uitzendkrachten</h3>
      {loading ? (
        <p className="text-gray-600">Laden uitzendkrachten...</p>
      ) : uitzendkrachten.length === 0 ? (
        <p className="text-gray-600">Geen uitzendkrachten gevonden. Voeg er hierboven een toe!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Naam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max. Dagen/Week</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rayons</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acties</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {uitzendkrachten.map((uitzendkracht) => (
                <tr key={uitzendkracht.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{uitzendkracht.naam}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{uitzendkracht.contactInfo || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{uitzendkracht.maxWerkdagenPerWeek}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {uitzendkracht.uitzendkrachtRayons.map(ur => ur.rayon.naam).join(', ') || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* Hier komen later knoppen voor 'Bekijk' of 'Bewerk' */}
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">Bekijk</button>
                    <button className="text-blue-600 hover:text-blue-900">Bewerk</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
