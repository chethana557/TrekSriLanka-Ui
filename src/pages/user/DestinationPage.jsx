import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DestinationMainSection from '../../components/destination/DestinationMainSection.jsx';
import CityPhotosSlider from '../../components/destination/CityPhotosSlider.jsx';
import DestinationWelcomeSection from '../../components/destination/DestinationWelcomeSection.jsx';
import DestinationAdditionalDetails from '../../components/destination/DestinationAdditionalDetails.jsx';
import DestinationsMoreSection from '../../components/destination/DestinationsMoreSection.jsx';
import BookingMainSection from '../../components/accommodation/BookingMainSection.jsx';
import BookingWelcomeSection from '../../components/accommodation/BookingWelcomeSection.jsx';
import SearchItems from '../../components/accommodation/SearchItems.jsx';
import Navbar from '../../components/navbars/Navbar.jsx';
import SriLankaExplorer from '../../components/landingPage/SriLankaExplorer.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import { translateText } from '../../api/index.js';
// MUI controls are used inside child components; no top-level MUI controls needed here

function DestinationPage() {
  const location = useLocation();
  const { state } = location;
  const destination = state || {};
  const [language, setLanguage] = useState('en');
  const [translated, setTranslated] = useState(null);
  const [translating, setTranslating] = useState(false);
  const isCityDetails = location?.pathname === '/destination/city-details';

  const LANGUAGES = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    pt: 'Portuguese',
    ru: 'Russian',
    ja: 'Japanese',
    ko: 'Korean',
    zh: 'Chinese',
    ar: 'Arabic',
    hi: 'Hindi',
    nl: 'Dutch',
    sv: 'Swedish',
    da: 'Danish',
    no: 'Norwegian',
    fi: 'Finnish'
  };

  // Ensure we start at the top of the page when navigated here
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch (e) {
      // ignore errors in non-browser environments
    }
  }, []);

  // Reset translated state whenever base destination changes
  useEffect(() => {
    setTranslated(null);
    setLanguage('en');
  }, [destination?.id, destination?.title]);

  const toTranslateFields = async (targetLang) => {
    if (!destination) return;
    // If target is English, reset
    if (!targetLang || targetLang === 'en') {
      setTranslated(null);
      setLanguage('en');
      return;
    }

    setTranslating(true);
    try {
      const src = 'en'; // request: set source_lang as en
      // Prepare translation tasks depending on route
      if (isCityDetails) {
        const tasks = [];
        tasks.push(translateText({ text: destination.title || '', target_lang: targetLang, source_lang: src }));
        tasks.push(translateText({ text: destination.mini_caption || '', target_lang: targetLang, source_lang: src }));
        const longDesc = Array.isArray(destination.long_description) ? destination.long_description.join('\n') : (destination.long_description || '');
        tasks.push(translateText({ text: longDesc, target_lang: targetLang, source_lang: src }));
        const [titleT, miniT, longT] = await Promise.all(tasks);
        setTranslated({
          title: titleT,
          mini_caption: miniT,
          long_description: longT ? longT.split('\n').filter(Boolean) : []
        });
      } else {
        // full destination translation
        const tasks = [];
        // primary fields
        tasks.push(translateText({ text: destination.title || '', target_lang: targetLang, source_lang: src }));
        tasks.push(translateText({ text: destination.mini_caption || '', target_lang: targetLang, source_lang: src }));
        const longDesc = Array.isArray(destination.long_description) ? destination.long_description.join('\n') : (destination.long_description || '');
        tasks.push(translateText({ text: longDesc, target_lang: targetLang, source_lang: src }));
        // additional fields
        tasks.push(translateText({ text: destination.best_time_to_visit || '', target_lang: targetLang, source_lang: src }));
        tasks.push(translateText({ text: destination.how_to_get_there || '', target_lang: targetLang, source_lang: src }));
        tasks.push(translateText({ text: Array.isArray(destination.entrance_fees) ? destination.entrance_fees.join('\n') : (destination.entrance_fees || ''), target_lang: targetLang, source_lang: src }));
        tasks.push(translateText({ text: destination.opening_hours || '', target_lang: targetLang, source_lang: src }));
        const things = Array.isArray(destination.things_to_do) ? destination.things_to_do.join('\n') : (destination.things_to_do || '');
        tasks.push(translateText({ text: things, target_lang: targetLang, source_lang: src }));
        // UI labels
        const headerLabel = `Additional Important Details`;
        const exploreLabel = `Explore Details`;
        const subheadingLabel = `Everything you need to know to make the most of your visit to ${destination.title || 'this destination'}`;
        tasks.push(translateText({ text: headerLabel, target_lang: targetLang, source_lang: src }));
        tasks.push(translateText({ text: exploreLabel, target_lang: targetLang, source_lang: src }));
        tasks.push(translateText({ text: subheadingLabel, target_lang: targetLang, source_lang: src }));
        const secBest = 'Best Time to Visit';
        const secHow = 'How to Get There';
        const secFees = 'Entrance Fees';
        const secOpening = 'Opening Hours';
        const secThings = 'Things to Do';
        tasks.push(translateText({ text: secBest, target_lang: targetLang, source_lang: src }));
        tasks.push(translateText({ text: secHow, target_lang: targetLang, source_lang: src }));
        tasks.push(translateText({ text: secFees, target_lang: targetLang, source_lang: src }));
        tasks.push(translateText({ text: secOpening, target_lang: targetLang, source_lang: src }));
        tasks.push(translateText({ text: secThings, target_lang: targetLang, source_lang: src }));

        const results = await Promise.all(tasks);
        const [titleT, miniT, longT, bestT, howT, feesT, openingT, thingsT, headerT, exploreT, subheadingT,
          secBestT, secHowT, secFeesT, secOpeningT, secThingsT] = results;
        setTranslated({
          title: titleT,
          mini_caption: miniT,
          long_description: longT ? longT.split('\n').filter(Boolean) : [],
          best_time_to_visit: bestT,
          how_to_get_there: howT,
          entrance_fees: feesT ? feesT.split('\n').filter(Boolean) : [],
          opening_hours: openingT,
          things_to_do: thingsT ? thingsT.split('\n').filter(Boolean) : [],
          uiLabels: {
            headerTitle: headerT,
            exploreHeader: exploreT,
            subheadingText: subheadingT,
            sectionTitles: {
              bestTime: secBestT,
              howToGetThere: secHowT,
              entranceFees: secFeesT,
              openingHours: secOpeningT,
              thingsToDo: secThingsT
            }
          }
        });
      }
      setLanguage(targetLang);
    } catch (err) {
      console.error('Translation failed', err);
      // keep previous state
    } finally {
      setTranslating(false);
    }
  };

  const handleLanguageChange = (e) => {
    const target = e.target.value;
    toTranslateFields(target);
  };

  const handleReset = () => {
    setTranslated(null);
    setLanguage('en');
  };

  return (
    <div className="landing-page">
        <Navbar />
        
  <DestinationMainSection image={destination.image || (Array.isArray(destination.photos) && destination.photos[0]) || undefined} />
        <DestinationWelcomeSection
          destinationName={translated?.title || destination.title}
          subtitle={translated?.mini_caption || destination.mini_caption}
          description={translated?.long_description || [destination.long_description].filter(Boolean)}
          onLanguageChange={handleLanguageChange}
          onReset={handleReset}
          language={language}
          translating={translating}
          LANGUAGES={LANGUAGES}
        />
        {(
          (translated?.best_time_to_visit || destination.best_time_to_visit) ||
          (translated?.how_to_get_there || destination.how_to_get_there) ||
          (translated?.entrance_fees || destination.entrance_fees) ||
          (translated?.opening_hours || destination.opening_hours) ||
          (translated?.things_to_do || destination.things_to_do)
        ) && (
          <DestinationAdditionalDetails
            destinationName={destination.title}
            best_time_to_visit={translated?.best_time_to_visit || destination.best_time_to_visit}
            how_to_get_there={translated?.how_to_get_there || destination.how_to_get_there}
            entrance_fees={translated?.entrance_fees || destination.entrance_fees}
            opening_hours={translated?.opening_hours || destination.opening_hours}
            things_to_do={translated?.things_to_do || destination.things_to_do}
            uiLabels={translated?.uiLabels}
          />
        )}
        {isCityDetails && Array.isArray(destination.photos) && destination.photos.length > 1 && (
          <CityPhotosSlider photos={destination.photos} />
        )}
        <Footer_Combination />
    </div>
  );
}

export default DestinationPage;