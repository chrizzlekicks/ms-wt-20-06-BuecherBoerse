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
          <p>Angaben gem. § 5 TMG </p>
          <br />
          <p>Betreiber und Kontakt:</p>
          <p>
            <strong>
              <span>TechLabs e.V.</span>
            </strong>
          </p>
          <p>
            David Middelbeck
            <br />
            Goebenstr. 14
            <br />
            48151 Münster
          </p>
          <p>E-Mail-Adresse: info@techlabs.org</p>
          <br />
          <p>
            Vorstand: David Middelbeck, Marius Vennemann, Rebecca Janßen, Jana
            Jeggle, Eric Grunenberg
            <br />
            Register und Registernummer: Amtsgericht Münster VR 5787
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

          <p>
            <br />
            Quelle:{' '}
            <a
              href='https://www.techlabs.org/de/imprint'
              target='blank'
              className='extlink'
            >
              https://www.techlabs.org/de/imprint
            </a>
          </p>
          <br />
        </section>
      </motion.main>
    </>
  );
};

export default Imprint;
