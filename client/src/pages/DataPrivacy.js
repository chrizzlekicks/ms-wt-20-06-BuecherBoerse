import { useGlobalContext } from '../context/GlobalContext';
import { motion } from 'framer-motion';

const DataPrivacy = () => {
  const { closeSubmenu } = useGlobalContext();
  return (
    <>
      <motion.main
        onClick={closeSubmenu}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <section className='datenschutz'>
          <h3>Datenschutzerklärung</h3>
          <br />
          <p>
            <strong>Allgemeiner Hinweis und Pflichtinformationen</strong>
          </p>
          <p>
            <strong>Benennung der verantwortlichen Stelle</strong>
          </p>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser
            Website ist:
          </p>
          <p>
            <strong>
              <span>Bücherregal Münster</span>
            </strong>
          </p>
          <p>
            Team 6
            <br />
            Musterweg 10
            <br />
            48151 Münster
          </p>
          <p>
            Die verantwortliche Stelle entscheidet allein oder gemeinsam mit
            anderen über die Zwecke und Mittel der Verarbeitung von
            personenbezogenen Daten (z.B. Namen, Kontaktdaten o. Ä.).
          </p>
          <br />
          <p>
            <strong>Widerruf Ihrer Einwilligung zur Datenverarbeitung</strong>
          </p>
          <p>
            Nur mit Ihrer ausdrücklichen Einwilligung sind einige Vorgänge der
            Datenverarbeitung möglich. Ein Widerruf Ihrer bereits erteilten
            Einwilligung ist jederzeit möglich. Für den Widerruf genügt eine
            formlose Mitteilung per E-Mail. Die Rechtmäßigkeit der bis zum
            Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
          </p>
          <br />
          <p>
            <strong>
              Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde
            </strong>
          </p>
          <p>
            Als Betroffener steht Ihnen im Falle eines datenschutzrechtlichen
            Verstoßes ein Beschwerderecht bei der zuständigen Aufsichtsbehörde
            zu. Zuständige Aufsichtsbehörde bezüglich datenschutzrechtlicher
            Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem
            sich der Sitz unseres Unternehmens befindet. Der folgende Link
            stellt eine Liste der Datenschutzbeauftragten sowie deren
            Kontaktdaten bereit:{' '}
            <a
              href='https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html'
              target='blank'
              className='extlink'
            >
              https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html
            </a>
            .
          </p>
          <br />
          <p>
            <strong>Recht auf Datenübertragbarkeit</strong>
          </p>
          <p>
            Ihnen steht das Recht zu, Daten, die wir auf Grundlage Ihrer
            Einwilligung oder in Erfüllung eines Vertrags automatisiert
            verarbeiten, an sich oder an Dritte aushändigen zu lassen. Die
            Bereitstellung erfolgt in einem maschinenlesbaren Format. Sofern Sie
            die direkte Übertragung der Daten an einen anderen Verantwortlichen
            verlangen, erfolgt dies nur, soweit es technisch machbar ist.
          </p>
          <br />
          <p>
            <strong>
              Recht auf Auskunft, Berichtigung, Sperrung, Löschung
            </strong>
          </p>
          <p>
            Sie haben jederzeit im Rahmen der geltenden gesetzlichen
            Bestimmungen das Recht auf unentgeltliche Auskunft über Ihre
            gespeicherten personenbezogenen Daten, Herkunft der Daten, deren
            Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf
            Berichtigung, Sperrung oder Löschung dieser Daten. Diesbezüglich und
            auch zu weiteren Fragen zum Thema personenbezogene Daten können Sie
            sich jederzeit über die im Impressum aufgeführten
            Kontaktmöglichkeiten an uns wenden.
          </p>
          <br />
          <p>
            <strong>SSL- bzw. TLS-Verschlüsselung</strong>
          </p>
          <p>
            Aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
            Inhalte, die Sie an uns als Seitenbetreiber senden, nutzt unsere
            Website eine SSL-bzw. TLS-Verschlüsselung. Damit sind Daten, die Sie
            über diese Website übermitteln, für Dritte nicht mitlesbar. Sie
            erkennen eine verschlüsselte Verbindung an der „https://“
            Adresszeile Ihres Browsers und am Schloss-Symbol in der
            Browserzeile.
          </p>
          <br />
          <p>
            <strong>Server-Log-Dateien</strong>
          </p>
          <p>
            In Server-Log-Dateien erhebt und speichert der Provider der Website
            automatisch Informationen, die Ihr Browser automatisch an uns
            übermittelt. Dies sind:
          </p>
          <ul>
            <li>Besuchte Seite auf unserer Domain</li>
            <li>Datum und Uhrzeit der Serveranfrage</li>
            <li>Browsertyp und Browserversion</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>IP-Adresse</li>
          </ul>
          <br />
          <p>
            Es findet keine Zusammenführung dieser Daten mit anderen
            Datenquellen statt. Grundlage der Datenverarbeitung bildet Art. 6
            Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung
            eines Vertrags oder vorvertraglicher Maßnahmen gestattet.
          </p>
          <br />
          <p>
            <strong>Registrierung auf dieser Website</strong>
          </p>
          <p>
            Zur Nutzung bestimmter Funktionen können Sie sich auf unserer
            Website registrieren. Die übermittelten Daten dienen ausschließlich
            zum Zwecke der Nutzung des jeweiligen Angebotes oder Dienstes. Bei
            der Registrierung abgefragte Pflichtangaben sind vollständig
            anzugeben. Andernfalls werden wir die Registrierung ablehnen.
          </p>
          <p>
            Im Falle wichtiger Änderungen, etwa aus technischen Gründen,
            informieren wir Sie per E-Mail. Die E-Mail wird an die Adresse
            versendet, die bei der Registrierung angegeben wurde.
          </p>
          <p>
            Die Verarbeitung der bei der Registrierung eingegebenen Daten
            erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a
            DSGVO). Ein Widerruf Ihrer bereits erteilten Einwilligung ist
            jederzeit möglich. Für den Widerruf genügt eine formlose Mitteilung
            per E-Mail. Die Rechtmäßigkeit der bereits erfolgten
            Datenverarbeitung bleibt vom Widerruf unberührt.
          </p>
          <p>
            Wir speichern die bei der Registrierung erfassten Daten während des
            Zeitraums, den Sie auf unserer Website registriert sind. Ihren Daten
            werden gelöscht, sollten Sie Ihre Registrierung aufheben.
            Gesetzliche Aufbewahrungsfristen bleiben unberührt.
          </p>
          <br />
          <p>
            <strong>Kontaktformular</strong>
          </p>
          <p>
            Per Kontaktformular übermittelte Daten werden einschließlich Ihrer
            Kontaktdaten gespeichert, um Ihre Anfrage bearbeiten zu können oder
            um für Anschlussfragen bereitzustehen. Eine Weitergabe dieser Daten
            findet ohne Ihre Einwilligung nicht statt.
          </p>
          <p>
            Die Verarbeitung der in das Kontaktformular eingegebenen Daten
            erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs.
            1 lit. a DSGVO). Ein Widerruf Ihrer bereits erteilten Einwilligung
            ist jederzeit möglich. Für den Widerruf genügt eine formlose
            Mitteilung per E-Mail. Die Rechtmäßigkeit der bis zum Widerruf
            erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.
          </p>
          <p>
            Über das Kontaktformular übermittelte Daten verbleiben bei uns, bis
            Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung
            widerrufen oder keine Notwendigkeit der Datenspeicherung mehr
            besteht. Zwingende gesetzliche Bestimmungen - insbesondere
            Aufbewahrungsfristen - bleiben unberührt.
          </p>
          <br />
          <p>
            <strong>Speicherdauer von Beiträgen und Kommentaren</strong>
          </p>
          <p>
            Beiträge und Kommentare sowie damit in Verbindung stehende Daten,
            wie beispielsweise IP-Adressen, werden gespeichert. Der Inhalt
            verbleibt auf unserer Website, bis er vollständig gelöscht wurde
            oder aus rechtlichen Gründen gelöscht werden musste.
          </p>
          <p>
            Die Speicherung der Beiträge und Kommentare erfolgt auf Grundlage
            Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Ein Widerruf Ihrer
            bereits erteilten Einwilligung ist jederzeit möglich. Für den
            Widerruf genügt eine formlose Mitteilung per E-Mail. Die
            Rechtmäßigkeit bereits erfolgter Datenverarbeitungsvorgänge bleibt
            vom Widerruf unberührt.
          </p>
          <br />
          <p>
            <strong>Cookies</strong>
          </p>
          <p>
            Unsere Website verwendet Cookies. Das sind kleine Textdateien, die
            Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen uns
            dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu
            machen.{' '}
          </p>
          <p>
            Einige Cookies sind “Session-Cookies.” Solche Cookies werden nach
            Ende Ihrer Browser-Sitzung von selbst gelöscht. Hingegen bleiben
            andere Cookies auf Ihrem Endgerät bestehen, bis Sie diese selbst
            löschen. Solche Cookies helfen uns, Sie bei Rückkehr auf unserer
            Website wiederzuerkennen.
          </p>
          <p>
            Mit einem modernen Webbrowser können Sie das Setzen von Cookies
            überwachen, einschränken oder unterbinden. Viele Webbrowser lassen
            sich so konfigurieren, dass Cookies mit dem Schließen des Programms
            von selbst gelöscht werden. Die Deaktivierung von Cookies kann eine
            eingeschränkte Funktionalität unserer Website zur Folge haben.
          </p>
          <p>
            Das Setzen von Cookies, die zur Ausübung elektronischer
            Kommunikationsvorgänge oder der Bereitstellung bestimmter, von Ihnen
            erwünschter Funktionen (z.B. Warenkorb) notwendig sind, erfolgt auf
            Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Als Betreiber dieser
            Website haben wir ein berechtigtes Interesse an der Speicherung von
            Cookies zur technisch fehlerfreien und reibungslosen Bereitstellung
            unserer Dienste. Sofern die Setzung anderer Cookies (z.B. für
            Analyse-Funktionen) erfolgt, werden diese in dieser
            Datenschutzerklärung separat behandelt.
          </p>
          <br />
          <p>
            <strong>Google Analytics</strong>
          </p>
          <p>
            Unsere Website verwendet Funktionen des Webanalysedienstes Google
            Analytics. Anbieter des Webanalysedienstes ist die Google Inc., 1600
            Amphitheatre Parkway, Mountain View, CA 94043, USA.
          </p>
          <p>
            Google Analytics verwendet "Cookies." Das sind kleine Textdateien,
            die Ihr Webbrowser auf Ihrem Endgerät speichert und eine Analyse der
            Website-Benutzung ermöglichen. Mittels Cookie erzeugte Informationen
            über Ihre Benutzung unserer Website werden an einen Server von
            Google übermittelt und dort gespeichert. Server-Standort ist im
            Regelfall die USA.
          </p>
          <p>
            Das Setzen von Google-Analytics-Cookies erfolgt auf Grundlage von
            Art. 6 Abs. 1 lit. f DSGVO. Als Betreiber dieser Website haben wir
            ein berechtigtes Interesse an der Analyse des Nutzerverhaltens, um
            unser Webangebot und ggf. auch Werbung zu optimieren.
          </p>
          <br />
          <p className='subtitle'>IP-Anonymisierung</p>
          <p>
            Wir setzen Google Analytics in Verbindung mit der Funktion
            IP-Anonymisierung ein. Sie gewährleistet, dass Google Ihre
            IP-Adresse innerhalb von Mitgliedstaaten der Europäischen Union oder
            in anderen Vertragsstaaten des Abkommens über den Europäischen
            Wirtschaftsraum vor der Übermittlung in die USA kürzt. Es kann
            Ausnahmefälle geben, in denen Google die volle IP-Adresse an einen
            Server in den USA überträgt und dort kürzt. In unserem Auftrag wird
            Google diese Informationen benutzen, um Ihre Nutzung der Website
            auszuwerten, um Reports über Websiteaktivitäten zu erstellen und um
            weitere mit der Websitenutzung und der Internetnutzung verbundene
            Dienstleistungen gegenüber uns zu erbringen. Es findet keine
            Zusammenführung der von Google Analytics übermittelten IP-Adresse
            mit anderen Daten von Google statt.
          </p>
          <br />
          <p className='subtitle'>Browser Plugin</p>
          <p>
            Das Setzen von Cookies durch Ihren Webbrowser ist verhinderbar.
            Einige Funktionen unserer Website könnten dadurch jedoch
            eingeschränkt werden. Ebenso können Sie die Erfassung von Daten
            bezüglich Ihrer Website-Nutzung einschließlich Ihrer IP-Adresse
            mitsamt anschließender Verarbeitung durch Google unterbinden. Dies
            ist möglich, indem Sie das über folgenden Link erreichbare
            Browser-Plugin herunterladen und installieren:{' '}
            <a
              href='https://tools.google.com/dlpage/gaoptout?hl=de'
              target='blank'
              className='extlink'
            >
              https://tools.google.com/dlpage/gaoptout?hl=de
            </a>
            .
          </p>
          <br />
          <p className='subtitle'>Widerspruch gegen die Datenerfassung</p>
          <p>
            Sie können die Erfassung Ihrer Daten durch Google Analytics
            verhindern, indem Sie auf folgenden Link klicken. Es wird ein
            Opt-Out-Cookie gesetzt, der die Erfassung Ihrer Daten bei
            zukünftigen Besuchen unserer Website verhindert: Google Analytics
            deaktivieren.
          </p>
          <p>
            Einzelheiten zum Umgang mit Nutzerdaten bei Google Analytics finden
            Sie in der Datenschutzerklärung von Google:{' '}
            <a
              href='https://support.google.com/analytics/answer/6004245?hl=de'
              target='blank'
              className='extlink'
            >
              https://support.google.com/analytics/answer/6004245?hl=de
            </a>
            .
          </p>
          <br />
          <p className='subtitle'>Auftragsverarbeitung</p>
          <p>
            Zur vollständigen Erfüllung der gesetzlichen Datenschutzvorgaben
            haben wir mit Google einen Vertrag über die Auftragsverarbeitung
            abgeschlossen.
          </p>
          <br />
          <p className='subtitle'>
            Demografische Merkmale bei Google Analytics
          </p>
          <p>
            Unsere Website verwendet die Funktion “demografische Merkmale” von
            Google Analytics. Mit ihr lassen sich Berichte erstellen, die
            Aussagen zu Alter, Geschlecht und Interessen der Seitenbesucher
            enthalten. Diese Daten stammen aus interessenbezogener Werbung von
            Google sowie aus Besucherdaten von Drittanbietern. Eine Zuordnung
            der Daten zu einer bestimmten Person ist nicht möglich. Sie können
            diese Funktion jederzeit deaktivieren. Dies ist über die
            Anzeigeneinstellungen in Ihrem Google-Konto möglich oder indem Sie
            die Erfassung Ihrer Daten durch Google Analytics, wie im Punkt
            “Widerspruch gegen die Datenerfassung” erläutert, generell
            untersagen.
          </p>
          <br />
          <p>
            <strong>Google Web Fonts</strong>
          </p>
          <p>
            Unsere Website verwendet Web Fonts von Google. Anbieter ist die
            Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043,
            USA.
          </p>
          <p>
            Durch den Einsatz dieser Web Fonts wird es möglich Ihnen die von uns
            gewünschte Darstellung unserer Website zu präsentieren, unabhängig
            davon welche Schriften Ihnen lokal zur Verfügung stehen. Dies
            erfolgt über den Abruf der Google Web Fonts von einem Server von
            Google in den USA und der damit verbundenen Weitergabe Ihre Daten an
            Google. Dabei handelt es sich um Ihre IP-Adresse und welche Seite
            Sie bei uns besucht haben. Der Einsatz von Google Web Fonts erfolgt
            auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Als Betreiber dieser
            Website haben wir ein berechtigtes Interesse an der optimalen
            Darstellung und Übertragung unseres Webauftritts.
          </p>
          <p>
            Das Unternehmen Google ist für das us-europäische
            Datenschutzübereinkommen "Privacy Shield" zertifiziert. Dieses
            Datenschutzübereinkommen soll die Einhaltung des in der EU geltenden
            Datenschutzniveaus gewährleisten.
          </p>
          <p>
            Einzelheiten über Google Web Fonts finden Sie unter:{' '}
            <a
              href='https://www.google.com/fonts#AboutPlace:about'
              target='blank'
              className='extlink'
            >
              https://www.google.com/fonts#AboutPlace:about
            </a>{' '}
            und weitere Informationen in den Datenschutzbestimmungen von Google:{' '}
            <a
              href='https://policies.google.com/privacy/partners?hl=de'
              target='blank'
              className='extlink'
            >
              https://policies.google.com/privacy/partners?hl=de
            </a>
          </p>
          <br />
        </section>
      </motion.main>
    </>
  );
};

export default DataPrivacy;
