import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { aboutData } from '../constants'

const About = () => {
  return (
    <div className="about active" style={{}}>
      <div className="aboutInner" style={{ left: 0, opacity: 1 }}>
        <div
          className="aboutRightBg"
          style={{ transform: "matrix(1, 0, 0, 1, 0, 0)" }}
        />{" "}
        <dic className="close">
          <IoCloseOutline className='text-[#161616]'/>
        </dic>{" "}

        <div
          className="aboutBgCropper"
          style={{ transform: "matrix(1, 0, 0, 1, 0, 0)" }}
        >
          <div
            className="aboutBg"
            style={{ transform: "matrix(1, 0, 0, 1, 0, 0)" }}
          >
            <img
              src="../assets/bodybuilding/body6.jpg"
              alt=""
              className="aboutPictureLeft"
              style={{ opacity: 1 }}
            />
          </div>
        </div>{" "}
        <div className="aboutTextAreaOuter" style={{ opacity: 1 }}>
          <div
            className="aboutTextAreaInner"
            data-scrollbar="true"
            tabIndex={1}
            style={{ overflow: "hidden", outline: "none" }}
          >
            <div className="scroll-content">
              <div className="aboutBgCropperMobile">
                <div className="aboutBgMobile">
                  <img
                    src="../assets/bodybuilding/body6.jpg"
                    alt=""
                    className="aboutPictureLeftMobile"
                  />
                </div>
              </div>{" "}
              <div className="aboutTextArea">
                <div className="text">
                {aboutData["aboutTextArea"].split(" ").map((text,i)=>(
                  <div
                    key={i}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      transformOrigin: "50% 50% 0px",
                      opacity: 1,
                      transform: "matrix(1, 0, 0, 1, 0, 0)"
                    }}
                    className="word word1"
                  >
                    {text}
                  </div>
                ))}
                  
                </div>{" "}
                <div className="subtext">
                {aboutData["aboutSubText"].split(" ").map((text,i)=>(
                  <div
                    key={i}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      opacity: 1,
                      transform: "matrix(1, 0, 0, 1, 0, 0)"
                    }}
                    className="word word1"
                  >
                    {text}
                  </div>
                ))}

                </div>{" "}
                <div className="pic_container">
                  <div
                    className="pic1 picStagger"
                    style={{
                      transform: "translate(-5%, 0%) matrix(1, 0, 0, 1, 0, 0)",
                      opacity: 1
                    }}
                  >
                    <img
                      src="images/zahnraeder_frame.png"
                      alt="analog"
                      className="picimg"
                    />{" "}
                    <p className="picDescr">
                      Herbstmotiv der Bilderserie "Farben des Jahres 1995".
                      Requisiten: mit Schleifpapier behandelte Zahnräder, rostige
                      Stahlplatte, Herbstblätter und gemalte Wolken.
                      <br />{" "}
                      <span className="analogYear">„Gequälte Natur“ - 1994</span>
                    </p>
                  </div>{" "}
                  <div
                    className="pic2 picStagger"
                    style={{
                      transform: "translate(0%, 10%) matrix(1, 0, 0, 1, 0, 0)",
                      opacity: 1
                    }}
                  >
                    <img
                      src="images/salamander_frame.png"
                      alt="analog"
                      className="picimg"
                    />{" "}
                    <p className="picDescr">
                      Frühlingsmotiv "Farben des Jahres 1995". Requisiten:
                      Grasmatte, Farbstift &amp; Lack, Blatt vom Botanischen Garten
                      und Schmuck-Echse vom Juwelier.
                      <br />{" "}
                      <span className="analogYear">„Getäuschte Echse“ - 1994</span>
                    </p>
                  </div>{" "}
                  <div
                    className="pic3 picStagger"
                    style={{
                      transform: "translate(10%, 0%) matrix(1, 0, 0, 1, 0, 0)",
                      opacity: 1
                    }}
                  >
                    <img
                      src="images/buntstifte_frame.png"
                      alt="analog"
                      className="picimg"
                    />{" "}
                    <p className="picDescr">
                      Sommermotiv dieser Bilderserie. Requisiten: Aquarium mit
                      türkis Folie &amp; Wasser, Buntstifte &amp; Superkleber,
                      Spielzeug-Aussenbord Motor und Spritzpistole; Geduld beim
                      hineinwerfen der Stiftteile und Glück mit nur 3 Belichtungen!
                      <br />{" "}
                      <span className="analogYear">„Wilde Floßfahrt“ - 1994</span>
                    </p>
                  </div>{" "}
                  <div
                    className="pic4 picStagger"
                    style={{
                      transform: "translate(0%, 10%) matrix(1, 0, 0, 1, 0, 0)",
                      opacity: 1
                    }}
                  >
                    <img
                      src="images/uhr_frame.png"
                      alt="analog"
                      className="picimg"
                    />{" "}
                    <p className="picDescr">
                      Auftragsarbeit für Buchtitel des internationalen
                      Business-Bestsellers TIME MANAGEMENT. Airbrush Arbeit auf Holz
                      80x50 cm mit ca. 35 Folienmaskierungen, mit Skalpell
                      geschnitten. Anschließende Reprofotografie auf 4x5 inch
                      Planfilm.
                      <br />{" "}
                      <span className="analogYear">„Zerrinnende Zeit“ - 1985</span>
                    </p>
                  </div>{" "}
                  <div
                    className="pic5 picStagger"
                    style={{
                      transform: "translate(5%, 0%) matrix(1, 0, 0, 1, 0, 0)",
                      opacity: 1
                    }}
                  >
                    <img
                      src="images/pulli_frame.png"
                      alt="analog"
                      className="picimg"
                    />{" "}
                    <p className="picDescr">
                      Auftragsarbeit Quelle-Katalog. Requisiten: Sehr weiche,
                      unsichtbare Materialien, die den Pullis Volumen und Anmutung
                      verleihen. Spezielle Lichtquellen mit Türspalt-Charakter und
                      Parabolspiegeln sorgen für stimmungsvolles Licht.
                      <br />{" "}
                      <span className="analogYear">„Pullover Set“ - 1996</span>
                    </p>
                  </div>
                </div>{" "}
                <div className="impressum_mobile" style={{ opacity: 1 }}>
                  <p className="h stagger">
                    Kontakt &amp;
                    <br />
                    Impressum
                  </p>{" "}
                  <p className="t">
                    <span className="stagger">
                      Walter Spatzek
                      <br />
                    </span>{" "}
                    <span className="stagger">
                      Fotografische Manufaktur
                      <br />
                    </span>{" "}
                    <span className="stagger">
                      Siriusweg 14, 4030 Linz
                      <br />
                    </span>{" "}
                    <span className="stagger">
                      0664 1007343
                      <br />
                    </span>{" "}
                    <span className="stagger">
                      <a href="mailto:office@fotospatzek.at" target="blank">
                        office@fotospatzek.at
                      </a>
                      <br />
                    </span>{" "}
                    <span className="stagger">
                      <a
                        href="https://www.linkedin.com/in/walter-spatzek-21238559/"
                        target="_blank"
                      >
                        LinkedIn
                      </a>
                      <br />
                    </span>{" "}
                    <span className="stagger">
                      &nbsp;
                      <br />
                    </span>{" "}
                    <span className="stagger">
                      FN 415282
                      <br />
                    </span>{" "}
                    <span className="stagger">
                      Landesgericht Linz
                      <br />
                    </span>{" "}
                    <span className="stagger">
                      UID-Nr.: ATU68611433
                      <br />
                    </span>
                  </p>
                </div>{" "}
                <div className="disclaimer" style={{ opacity: 1 }}>
                  <p className="createdBy">
                    Webdesign &amp; Development by{" "}
                    <a
                      href="http://www.danielspatzek.com"
                      target="blank"
                      className="dsp"
                    >
                      Daniel Spatzek
                    </a>
                  </p>{" "}
                  <div className="breakLine" />{" "}
                  <p className="disclaimerHeadline">Google Analytics Disclaimer</p>{" "}
                  <p className="disclaimerText">
                    This website uses Google Analytics, a web analytics service
                    provided by Google, Inc. ("Google"). Google Analytics uses
                    "cookies", which are text files placed on your computer to help
                    the website analyse how visitors use the site. The information
                    generated by the cookie about your use of the website (including
                    your IP address) will be transmitted to and stored by Google on
                    servers in the United States . Google will use this information
                    for the purpose of evaluating your use of the website, compiling
                    reports on website activity for website operators and providing
                    other services relating to website activity and internet usage.
                    Google may also transfer this information to third parties where
                    required to do so by law, or where such third parties process
                    the information on Google's behalf. Google will not associate
                    your IP address with any other data held by Google. You may
                    refuse the use of cookies by selecting the appropriate settings
                    on your browser, however please note that if you do this you may
                    not be able to use the full functionality of this website. By
                    using this website, you consent to the processing of data about
                    you by Google in the manner and for the purposes set out above.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>{" "}
        <div className="impressum">
          <p className="contactText">
            <span className="stagger" style={{ opacity: 1, top: 0 }}>
              Siriusweg 14, 4030 Linz
              <br />
            </span>{" "}
            <span className="stagger" style={{ opacity: 1, top: 0 }}>
              0664 1007343
              <br />
            </span>{" "}
            <span className="stagger" style={{ opacity: 1, top: 0 }}>
              <a href="mailto:office@fotospatzek.at" target="blank">
                office@fotospatzek.at
              </a>
              <br />
            </span>{" "}
            <span className="stagger" style={{ opacity: 1, top: 0 }}>
              <a
                href="https://www.linkedin.com/in/walter-spatzek-21238559/"
                target="_blank"
              >
                LinkedIn
              </a>
              <br />
            </span>
          </p>{" "}
          <p className="legalText">
            <span className="stagger" style={{ opacity: 1, top: 0 }}>
              &nbsp;
              <br />
            </span>{" "}
            <span className="stagger" style={{ opacity: 1, top: 0 }}>
              FN 415282
              <br />
            </span>{" "}
            <span className="stagger" style={{ opacity: 1, top: 0 }}>
              Landesgericht Linz
              <br />
            </span>{" "}
            <span className="stagger" style={{ opacity: 1, top: 0 }}>
              UID-Nr.: ATU68611433
              <br />
            </span>
          </p>
          <p />
        </div>
      </div>
</div>

  )
}

export default About