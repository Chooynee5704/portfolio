import { Award, Circle, ArrowRight, Globe } from 'lucide-react';
import { translations, type Language } from '../constants/translations';
import HomeCritters from './HomeCritters';

interface MainContentProps {
    lang?: Language;
}

const MainContent: React.FC<MainContentProps> = ({ lang = 'en' }) => {
    const t = translations[lang].home;
    const languageItems = t.hobbies.h2_desc.split('\n');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            {/* Left Column: Intro + Hobbies */}
            <div className="lg:col-span-2 flex flex-col gap-8">
                {/* Intro Section */}
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur-[6px] border border-gray-200 dark:border-gray-800 p-12 relative group hover:shadow-lg transition-all duration-300">
                    <div className="text-sm font-mono mb-4 text-gray-500 dark:text-gray-400">
                        {t.intro.init}
                    </div>
                    <h2 className="text-6xl font-black tracking-tighter mb-2 dark:text-white transition-colors">
                        {t.intro.hello}
                    </h2>
                    <h2 className="text-6xl font-black tracking-tighter text-gray-300 dark:text-gray-600 mb-8 transition-colors">
                        {t.intro.world}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mb-8 transition-colors">
                        {t.intro.desc}
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="px-4 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-xs font-bold uppercase tracking-wider backdrop-blur-md dark:text-gray-200 transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                            {t.intro.badge1}
                        </a>
                        <a href="#" className="px-4 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-xs font-bold uppercase tracking-wider backdrop-blur-md dark:text-gray-200 transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                            {t.intro.badge2}
                        </a>
                    </div>
                </div>

                {/* Hobbies Section */}
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                        {/* Hobby 1 */}
                        <a href="https://www.linkedin.com/in/khang-huynh-aa766b37b/details/certifications/" target="_blank" rel="noopener noreferrer" className="bg-white/10 dark:bg-black/10 backdrop-blur-[6px] border border-gray-200 dark:border-gray-800 p-6 relative hover:border-black dark:hover:border-white transition-colors group block flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">{t.hobbies.h1_label}</span>
                                <Award className="text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 dark:text-white transition-colors">{t.hobbies.h1_title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                                {t.hobbies.h1_desc}
                            </p>

                            <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                                {t.hobbies.view_cert} <ArrowRight size={14} />
                            </div>
                        </a>

                        {/* Hobby 2 */}
                        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-[6px] border border-gray-200 dark:border-gray-800 p-6 relative hover:border-black dark:hover:border-white transition-colors group flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">{t.hobbies.h2_label}</span>
                                <Globe className="text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 dark:text-white transition-colors">{t.hobbies.h2_title}</h3>
                            <ul className="mt-3 space-y-2">
                                {languageItems.map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 transition-colors">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <HomeCritters />

                </div>
            </div>

            {/* Right Column: Tech Stack + Experience Log */}
            <div className="lg:col-span-1 flex flex-col gap-8">
                {/* Tech Stack */}
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur-[6px] border border-gray-200 dark:border-gray-800 p-8 shadow-sm transition-colors">
                    <div className="mb-6 dark:text-white transition-colors">
                        <h3 className="font-bold uppercase tracking-wider">{t.tech}</h3>
                    </div>

                    <ul className="space-y-3 text-xs tracking-wider text-gray-600 dark:text-gray-300 list-disc pl-4 marker:text-gray-300 dark:marker:text-gray-600">
                        <li className="leading-relaxed">
                            <span className="font-bold text-gray-800 dark:text-gray-100">BACKEND:</span> NODE.JS, .NET (C#), ASP.NET CORE, RESTFUL APIS, BUSINESS LOGIC, MICROSERVICES.
                        </li>
                        <li className="leading-relaxed">
                            <span className="font-bold text-gray-800 dark:text-gray-100">DATABASE:</span> MONGODB, RELATIONAL DATABASES, SCHEMA DESIGN, QUERY OPTIMIZATION.
                        </li>
                        <li className="leading-relaxed">
                            <span className="font-bold text-gray-800 dark:text-gray-100">CLOUD & DEVOPS:</span> AWS (EC2, ECS), DOCKER, TERRAFORM, CI/CD.
                        </li>
                        <li className="leading-relaxed">
                            <span className="font-bold text-gray-800 dark:text-gray-100">AI & AUTOMATION:</span> RAG (N8N), AI WORKFLOW INTEGRATION, MACHINE LEARNING FOUNDATIONAL.
                        </li>
                        <li className="leading-relaxed">
                            <span className="font-bold text-gray-800 dark:text-gray-100">FRONTEND:</span> REACT.JS, REACT NATIVE.
                        </li>
                        <li className="leading-relaxed">
                            <span className="font-bold text-gray-800 dark:text-gray-100">TOOLS:</span> GIT, API TESTING, SYSTEM INTEGRATION.
                        </li>
                    </ul>
                </div>



                {/* Experience Log */}
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur-[6px] border border-gray-200 dark:border-gray-800 p-8 flex-1 transition-colors">
                    <div className="flex justify-between items-center mb-8 dark:text-white transition-colors">
                        <h3 className="font-bold uppercase tracking-wider">{t.exp}</h3>
                        <div className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse transition-colors" />
                    </div>

                    <div className="relative pl-4 border-l border-gray-200 dark:border-gray-800 space-y-12 transition-colors">
                        {t.exp_items.map((item, idx) => (
                            <div key={idx} className="relative">
                                <div className="absolute -left-[21px] top-1 bg-white dark:bg-black p-1 transition-colors">
                                    <Circle size={10} className={`text-gray-300 dark:text-gray-700 transition-colors ${idx === 0 ? 'fill-white dark:fill-black stroke-black dark:stroke-white' : ''}`} />
                                </div>
                                <div className="text-xs font-bold text-gray-500 dark:text-gray-500 mb-1 transition-colors">{item.time}</div>
                                <h4 className="font-bold text-lg leading-none mb-1 dark:text-white transition-colors">{item.role}</h4>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 transition-colors">{item.company}</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;
