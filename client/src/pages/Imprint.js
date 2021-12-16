import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { motion } from 'framer-motion';

const Imprint = () => {
    const { closeSubmenu } = useGlobalContext();
    return (
        <>
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={closeSubmenu}
            >
                <section className='imprint'>
                    <h3>Impressum</h3>
                    <h4>Angaben gem. § 5 TMG </h4>
                    <p>Betreiber und Kontakt:</p>
                    <br />
                    <p>
                        <strong>
                            <span>Kodebi Booksharing</span>
                        </strong>
                        <br />
                        Revaler Str. 1
                        <br />
                        10243 Berlin
                    </p>
                    <p>E-Mail-Adresse: info@kodebi.de</p>
                    <br />
                    <p>
                        Verantwortlich für den Inhalt: Johannes Kellers, Lena
                        Krause, Maximilian Muhle, Christian Schimetschka
                        <br />
                        Register und Registernummer: Amtsgericht
                        Berlin-Charlottenburg XY XXX
                    </p>
                    <br />
                    <p>
                        Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO:
                        <br />
                        Die Europäische Kommission stellt eine Plattform zur
                        Online-Streitbeilegung
                        <br />
                        (OS) bereit, die Sie unter{' '}
                        <a
                            href='http://ec.europa.eu/consumers/odr/'
                            target='blank'
                            className='extlink'
                        >
                            http://ec.europa.eu/consumers/odr/
                        </a>
                    </p>
                    <br />
                    <h4>Haftungsausschluss – Disclaimer:</h4>
                    <p>Haftung für Inhalte</p>
                    <br />
                    <p>
                        Alle Inhalte unseres Internetauftritts wurden mit
                        größter Sorgfalt und nach bestem Gewissen erstellt. Für
                        die Richtigkeit, Vollständigkeit und Aktualität der
                        Inhalte können wir jedoch keine Gewähr übernehmen. Als
                        Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
                        Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                        verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                        Diensteanbieter jedoch nicht verpflichtet, übermittelte
                        oder gespeicherte fremde Informationen zu überwachen
                        oder nach Umständen zu forschen, die auf eine
                        rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur
                        Entfernung oder Sperrung der Nutzung von Informationen
                        nach den allgemeinen Gesetzen bleiben hiervon unberührt.
                        Eine diesbezügliche Haftung ist jedoch erst ab dem
                        Zeitpunkt der Kenntniserlangung einer konkreten
                        Rechtsverletzung möglich. Bei Bekanntwerden von den o.g.
                        Rechtsverletzungen werden wir diese Inhalte unverzüglich
                        entfernen.
                    </p>
                    <br />
                    <p>Haftungsbeschränkung für externe Links</p>
                    <br />
                    <p>
                        Unsere Webseite enthält Links auf externe Webseiten
                        Dritter. Auf die Inhalte dieser direkt oder indirekt
                        verlinkten Webseiten haben wir keinen Einfluss. Daher
                        können wir für die „externen Links” auch keine Gewähr
                        auf Richtigkeit der Inhalte übernehmen. Für die Inhalte
                        der externen Links sind die jeweilige Anbieter oder
                        Betreiber (Urheber) der Seiten verantwortlich. <br />
                        Die externen Links wurden zum Zeitpunkt der Linksetzung
                        auf eventuelle Rechtsverstöße überprüft und waren im
                        Zeitpunkt der Linksetzung frei von rechtswidrigen
                        Inhalten. Eine ständige inhaltliche Überprüfung der
                        externen Links ist ohne konkrete Anhaltspunkte einer
                        Rechtsverletzung nicht möglich. Bei direkten oder
                        indirekten Verlinkungen auf die Webseiten Dritter, die
                        außerhalb unseres Verantwortungsbereichs liegen, würde
                        eine Haftungsverpflichtung ausschließlich in dem Fall
                        nur bestehen, wenn wir von den Inhalten Kenntnis
                        erlangen und es uns technisch möglich und zumutbar wäre,
                        die Nutzung im Falle rechtswidriger Inhalte zu
                        verhindern. Diese Haftungsausschlusserklärung gilt auch
                        innerhalb des eigenen Internetauftrittes „Name Ihrer
                        Domain” gesetzten Links und Verweise von Fragestellern,
                        Blogeinträgern, Gästen des Diskussionsforums. Für
                        illegale, fehlerhafte oder unvollständige Inhalte und
                        insbesondere für Schäden, die aus der Nutzung oder
                        Nichtnutzung solcherart dargestellten Informationen
                        entstehen, haftet allein der Diensteanbieter der Seite,
                        auf welche verwiesen wurde, nicht derjenige, der über
                        Links auf die jeweilige Veröffentlichung lediglich
                        verweist. Werden uns Rechtsverletzungen bekannt, werden
                        die externen Links durch uns unverzüglich entfernt.
                        Urheberrecht Die auf unserer Webseite veröffentlichen
                        Inhalte und Werke unterliegen dem deutschen Urheberrecht
                        (
                        <a href='http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf'>
                            http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf
                        </a>
                        ). <br />
                        Die Vervielfältigung, Bearbeitung, Verbreitung und jede
                        Art der Verwertung des geistigen Eigentums in ideeller
                        und materieller Sicht des Urhebers außerhalb der Grenzen
                        des Urheberrechtes bedürfen der vorherigen schriftlichen
                        Zustimmung des jeweiligen Urhebers i.S.d.
                        Urhebergesetzes (
                        <a href='http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf'>
                            http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf
                        </a>
                        ). Downloads und Kopien dieser Seite sind nur für den
                        privaten und nicht kommerziellen Gebrauch erlaubt. Sind
                        die Inhalte auf unserer Webseite nicht von uns erstellt
                        wurden, sind die Urheberrechte Dritter zu beachten. Die
                        Inhalte Dritter werden als solche kenntlich gemacht.
                        Sollten Sie trotzdem auf eine Urheberrechtsverletzung
                        aufmerksam werden, bitten wir um einen entsprechenden
                        Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden
                        wir derartige Inhalte unverzüglich entfernen.
                    </p>
                </section>
            </motion.main>
        </>
    );
};

export default Imprint;
