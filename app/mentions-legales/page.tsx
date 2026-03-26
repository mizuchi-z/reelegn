import Link from "next/link";

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-[#080F1A] px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="font-mono text-xs text-[#5A7089] hover:text-[#00B4D8] transition-colors mb-8 inline-block"
        >
          ← Retour
        </Link>

        <h1 className="font-orbitron font-black text-3xl text-[#E8EFF6] mb-2">
          MENTIONS LÉGALES
        </h1>
        <p className="font-mono text-xs text-[#5A7089] mb-12">
          Dernière mise à jour : Mars 2026
        </p>

        <div className="flex flex-col gap-8 font-sans text-sm text-[#5A7089] leading-relaxed">
          <section>
            <h2 className="font-orbitron font-bold text-base text-[#00B4D8] mb-4">
              ÉDITEUR DU SITE
            </h2>
            <div className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-6 flex flex-col gap-2">
              <p>
                <strong className="text-[#E8EFF6]">Nom :</strong> Matis Spineu
              </p>
              <p>
                <strong className="text-[#E8EFF6]">Activité :</strong>{" "}
                Auto-entrepreneur
              </p>
              <p>
                <strong className="text-[#E8EFF6]">SIRET :</strong> [À
                renseigner]
              </p>
              <p>
                <strong className="text-[#E8EFF6]">Adresse :</strong> Nice,
                France
              </p>
              <p>
                <strong className="text-[#E8EFF6]">Contact :</strong>{" "}
                <a
                  href="mailto:motionmatis@gmail.com"
                  className="text-[#00B4D8] hover:underline"
                >
                  motionmatis@gmail.com
                </a>
              </p>
              <p>
                <strong className="text-[#E8EFF6]">Instagram :</strong>{" "}
                <span className="text-[#00B4D8]">@mizuchi_z</span>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-orbitron font-bold text-base text-[#00B4D8] mb-4">
              HÉBERGEMENT
            </h2>
            <div className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-6 flex flex-col gap-2">
              <p>
                <strong className="text-[#E8EFF6]">Hébergeur :</strong> Vercel
                Inc.
              </p>
              <p>
                <strong className="text-[#E8EFF6]">Adresse :</strong> 340 Pine
                Street, Suite 700, San Francisco, CA 94104, USA
              </p>
              <p>
                <strong className="text-[#E8EFF6]">Site :</strong>{" "}
                <span className="text-[#00B4D8]">vercel.com</span>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-orbitron font-bold text-base text-[#00B4D8] mb-4">
              PROPRIÉTÉ INTELLECTUELLE
            </h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, graphiques, logos,
              interface) est la propriété exclusive de Matis Spineu — Mizuchi.
              Toute reproduction ou utilisation sans autorisation est interdite.
            </p>
            <p className="mt-3">
              Les contenus générés par l&apos;IA (scripts, prompts, légendes)
              sont créés pour l&apos;usage exclusif de l&apos;utilisateur ayant
              passé commande.
            </p>
          </section>

          <section>
            <h2 className="font-orbitron font-bold text-base text-[#00B4D8] mb-4">
              RESPONSABILITÉ
            </h2>
            <p>
              ReelGen by Mizuchi est un outil d&apos;assistance à la création de
              contenu. Les contenus générés sont fournis à titre indicatif.
              Mizuchi ne saurait être tenu responsable de l&apos;utilisation qui
              en est faite.
            </p>
          </section>

          <section>
            <h2 className="font-orbitron font-bold text-base text-[#00B4D8] mb-4">
              DROIT APPLICABLE
            </h2>
            <p>
              Le présent site est soumis au droit français. Tout litige relatif
              à son utilisation sera de la compétence exclusive des tribunaux
              français.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
