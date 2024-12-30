import BackBtn from '../components/BackBtn.jsx';
import SaketAISection1 from '../components/SaketAISection1.jsx';
import SaketAISection2 from '../components/SaketAISection2.jsx';
import SaketAISection3 from '../components/SaketAISection3.jsx';
import SaketAISection4 from '../components/SaketAISection4.jsx';
import HabitBuilder from '../components/HabitBuilder.jsx';
import Meditation from '../components/Meditation.jsx';

const SaketAI = () => {

  return (
    <main className="w-full sai h-full overflow-auto">
     <BackBtn />
      <SaketAISection1 />
      <SaketAISection2 />
      <SaketAISection3 />
      <SaketAISection4 />
      <HabitBuilder />
      <Meditation />
    </main>
  );
};

export default SaketAI;
