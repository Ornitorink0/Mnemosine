'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContattiPage() {
  return (
    <div className="min-h-[calc(100vh-4em)] bg-muted/50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl font-bold mb-6">Contatti</h1>
          <p className="text-xl text-muted-foreground">
            Hai domande o hai bisogno di assistenza? Ti preghiamo di contattarci.
            Il nostro team è a tua disposizione.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Mail className="w-6 h-6" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <a
                    href="mailto:support@mnemosine.com"
                    className="hover:underline"
                  >
                    support@mnemosine.com
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Rispondiamo entro 24 ore
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Phone className="w-6 h-6" />
                <CardTitle>Telefono</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <a href="tel:+39123456789" className="hover:underline">
                    +39 123 456 789
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Lun-Ven: 9:00 - 17:00 (CET)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <MapPin className="w-6 h-6" />
                <CardTitle>Indirizzo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Via della Patata, 123<br />
                  00000 Torino, Italia
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
