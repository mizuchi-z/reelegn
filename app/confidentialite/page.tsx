import Link from "next/link";

export default function ConfidentialitePage() {
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
          POLITIQUE DE CONFIDENTIALITÉ
        </h1>
        <p className="font-mono text-xs text-[#5A7089] mb-12">
          Dernière mise à jour : Mars 2026
        </p>

        <div className="flex flex-col gap-8 font-sans text-sm text-[#5A7089] leading-relaxed">
          <section>
            <h2 className="font-orbitron font-bold text-base text-[#00B4D8] mb-4">
              DONNÉES COLLECTÉES
            </h2>
            <p>Nous collectons uniquement :</p>
            <ul className="mt-3 flex flex-col gap-2 pl-4">
              <li className="flex items-start gap-2">
                <span className="text-[#00B4D8] mt-0.5">·</span>
                <span>
                  <strong className="text-[#E8EFF6]">Email</strong> : pour
                  l&apos;authentification et l&apos;envoi des packs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00B4D8] mt-0.5">·</span>
                <span>
                  <strong className="text-[#E8EFF6]">Prénom</strong> :
                  personnalisation des communications
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00B4D8] mt-0.5">·</span>
                <span>
                  <strong className="text-[#E8EFF6]">Historique des générations</strong> :
                  briefs soumis et packs générés
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00B4D8] mt-0.5">·</span>
                <span>
                  <strong className="text-[#E8EFF6]">Données de paiement</strong> :
                  gérées directement par Stripe (nous ne stockons pas vos données
                  bancaires)
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-orbitron font-bold text-base text-[#00B4D8] mb-4">
              FINALITÉ DU TRAITEMENT
            </h2>
            <p>
              Vos données sont utilisées exclusivement pour :
            </p>
            <ul className="mt-3 flex flex-col gap-2 pl-4">
              <li className="flex items-start gap-2">
                <span className="text-[#00B4D8] mt-0.5">·</span>
                La fourniture du service ReelGen
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00B4D8] mt-0.5">·</span>
                L&apos;envoi de vos packs par email
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00B4D8] mt-0.5">·</span>
                La gestion de votre abonnement
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00B4D8] mt-0.5">·</span>
                Les communications relatives à votre compte
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-orbitron font-bold text-base text-[#00B4D8] mb-4">
              DURÉE DE CONSERVATION
            </h2>
            <p>
              Vos données sont conservées pendant la durée de votre abonnement,
              puis 1 an après la clôture de votre compte, conformément aux
              obligations légales.
            </p>
          </section>

          <section>
            <h2 className="font-orbitron font-bold text-base text-[#00B4D8] mb-4">
              VOS DROITS (RGPD)
            </h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="mt-3 flex flex-col gap-2 pl-4">
              <li className="flex items-start gap-2">
                <span className="text-[#00B4D8] mt-0.5">·</span>
                <strong className="text-[#E8EFF6]">Droit d&apos;accès</strong> : obtenir
                une copie de vos données
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00B4D8] mt-0.5">·</span>
                <strong className="text-[#E8EFF6]">Droit de rectification</strong> :
                corriger vos données
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00B4D8] mt-0.5">·</span>
                <strong className="text-[#E8EFF6]">Droit à l&apos;effacement</strong> :
                demander la suppression de vos données
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00B4D8] mt-0.5">·</span>
                <strong className="text-[#E8EFF6]">Droit à la portabilité</strong> :
                recevoir vos données dans un format structuré
              </li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous :{" "}
              <a
                href="mailto:motionmatis@gmail.com"
                className="text-[#00B4D8] hover:underline"
              >
                motionmatis@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-orbitron font-bold text-base text-[#00B4D8] mb-4">
              SOUS-TRAITANTS
            </h2>
            <div className="bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px] p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-[rgba(0,180,216,0.12)]">
                    <th className="font-mono text-xs text-[#5A7089] pb-3 uppercase tracking-widest">
                      Service
                    </th>
                    <th className="font-mono text-xs text-[#5A7089] pb-3 uppercase tracking-widest">
                      Usage
                    </th>
                    <th className="font-mono text-xs text-[#5A7089] pb-3 uppercase tracking-widest">
                      Pays
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[#5A7089]">
                  {[
                    ["Supabase", "Base de données & auth", "USA/EU"],
                    ["Stripe", "Paiements", "USA"],
                    ["Resend", "Emails transactionnels", "USA"],
                    ["Anthropic (Claude)", "Génération IA", "USA"],
                    ["Vercel", "Hébergement", "USA/EU"],
                  ].map(([service, usage, pays]) => (
                    <tr
                      key={service}
                      className="border-b border-[rgba(0,180,216,0.06)]"
                    >
                      <td className="py-3 text-[#E8EFF6]">{service}</td>
                      <td className="py-3">{usage}</td>
                      <td className="py-3">{pays}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-orbitron font-bold text-base text-[#00B4D8] mb-4">
              COOKIES
            </h2>
            <p>
              ReelGen utilise uniquement des cookies fonctionnels nécessaires au
              maintien de votre session de connexion. Aucun cookie publicitaire
              ou de tracking n&apos;est utilisé.
            </p>
          </section>

          <section>
            <h2 className="font-orbitron font-bold text-base text-[#00B4D8] mb-4">
              CONTACT
            </h2>
            <p>
              Pour toute question relative à vos données personnelles :{" "}
              <a
                href="mailto:motionmatis@gmail.com"
                className="text-[#00B4D8] hover:underline"
              >
                motionmatis@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
