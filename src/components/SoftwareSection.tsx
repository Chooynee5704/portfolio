import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, User, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { translations, type Language } from '../constants/translations';
import ev1 from '../assets/EV1.webp';
import ev2 from '../assets/EV2.webp';
import ev3 from '../assets/EV3.webp';
import ev4 from '../assets/EV4.webp';
import ev5 from '../assets/EV5.webp';
import learnmate1 from '../assets/learnmate1.webp';
import learnmate2 from '../assets/learnmate2.webp';
import learnmate3 from '../assets/learnmate3.webp';
import learnmate4 from '../assets/learnmate4.webp';
import learnmate5 from '../assets/learnmate5.webp';
import learnmate6 from '../assets/learnmate6.webp';
import learnmate7 from '../assets/learnmate7.webp';
import hoshivibe1 from '../assets/hoshivibe1.webp';
import hoshivibe2 from '../assets/hoshivibe2.webp';
import hoshivibe3 from '../assets/hoshivibe3.webp';

interface SoftwareSectionProps {
    lang?: Language;
}

interface SoftwareProject {
    id: string;
    category: string;
    quarter: string;
    year: string;
    image: string;
    tags: string[];
    posterTitle: string;
    posterSubtitle: string;
    posterGradient: string;
    gallery?: string[];
    links?: ProjectLink[];
}

type ProjectLink = {
    label: string;
    url: string;
    kind: 'live' | 'frontend' | 'backend';
};

const staticProjectData: SoftwareProject[] = [
    {
        id: 'ev-charging',
        category: 'SYSTEM',
        quarter: 'Q1',
        year: '2025',
        image: ev1,
        tags: [
            'Node.js',
            'RESTful APIs',
            'MongoDB',
            'Schema Design',
            'Query Optimization',
            'Booking Logic',
            'React.js Integration'
        ],
        posterTitle: 'EV Charging',
        posterSubtitle: 'Booking System',
        posterGradient: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-500',
        gallery: [ev1, ev2, ev3, ev4, ev5],
        links: [
            { label: 'Web', url: 'https://fe-ev-charging-station.vercel.app/', kind: 'live' },
            { label: 'Frontend', url: 'https://github.com/Chooynee5704/FE_EV_Charging_Station.git', kind: 'frontend' },
            { label: 'Backend', url: 'https://github.com/Chooynee5704/BE_EV_Charging_Station.git', kind: 'backend' }
        ]
    },
    {
        id: 'ai-book',
        category: 'AI PRODUCT',
        quarter: 'Q3',
        year: '2025',
        image: learnmate2,
        tags: [
            '.NET Backend',
            'RESTful APIs',
            'RAG Pipeline (n8n)',
            'AI Orchestration',
            'AWS ECS/EC2',
            'Terraform',
            'Saga Pattern',
            'React Native Integration'
        ],
        posterTitle: 'AI Reading',
        posterSubtitle: 'Translation App',
        posterGradient: 'bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400',
        gallery: [learnmate1, learnmate2, learnmate3, learnmate4, learnmate5, learnmate6, learnmate7],
        links: [
            { label: 'Frontend', url: 'https://github.com/Chooynee5704/FE_LearnMate.git', kind: 'frontend' },
            { label: 'Backend', url: 'https://github.com/Chooynee5704/BE_LearnMate.git', kind: 'backend' }
        ]
    },
    {
        id: 'hoshivibe',
        category: 'ECOMMERCE',
        quarter: 'Q4',
        year: '2025',
        image: hoshivibe1,
        tags: [
            '.NET Backend',
            'RESTful APIs',
            'Business Logic',
            'n8n AI (Nano Banana)',
            'React.js Integration'
        ],
        posterTitle: 'HoshiVibe',
        posterSubtitle: 'Feng Shui Jewelry',
        posterGradient: 'bg-gradient-to-br from-rose-500 via-orange-500 to-amber-400',
        gallery: [hoshivibe1, hoshivibe2, hoshivibe3],
        links: [
            { label: 'Web', url: 'https://fe-hoshi-vibe.vercel.app/', kind: 'live' },
            { label: 'Frontend', url: 'https://github.com/Chooynee5704/FE_HoshiVibe.git', kind: 'frontend' },
            { label: 'Backend', url: 'https://github.com/Chooynee5704/HoshiVibe-BE.git', kind: 'backend' }
        ]
    }
];

const ProjectTags = ({ tags }: { tags: string[] }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayedTags = isExpanded ? tags : tags.slice(0, 4);
    const hasMore = tags.length > 4;

    return (
        <div className="flex flex-wrap gap-2">
            {displayedTags.map(tag => (
                <span
                    key={tag}
                    className="text-[10px] font-mono border border-gray-200 dark:border-gray-800 px-2 py-1 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50"
                >
                    {tag}
                </span>
            ))}
            {!isExpanded && hasMore && (
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setIsExpanded(true);
                    }}
                    className="text-[10px] font-bold border border-gray-200 dark:border-gray-800 px-2 py-1 text-black dark:text-white bg-gray-200 dark:bg-gray-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                    +{tags.length - 4} MORE
                </button>
            )}
        </div>
    );
};

const linkStyles = (kind: ProjectLink['kind']) => {
    const base =
        'text-[10px] font-bold uppercase tracking-wider px-2 py-1 border transition-colors';
    if (kind === 'live') {
        return `${base} bg-black text-white border-black dark:bg-white dark:text-black dark:border-white`;
    }

    return `${base} bg-gray-50 text-gray-600 border-gray-200 hover:bg-black hover:text-white dark:bg-gray-900/50 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-white dark:hover:text-black`;
};

const ProjectCard = ({
    project,
    t,
    isReversed,
    openLightbox
}: {
    project: SoftwareProject & { title?: string; description?: string; scope?: string };
    t: { view: string };
    isReversed: boolean;
    openLightbox: (gallery: string[]) => void;
}) => {
    return (
        <div className="relative flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-[110px] flex-shrink-0 flex md:flex-col md:items-end justify-start md:pt-8 relative pl-6 md:pl-0 z-10">
                <div className="absolute left-[3px] md:left-auto md:right-[-5px] top-[5px] md:top-[38px] w-[11px] h-[11px] rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 z-10 box-border" />
                <div className="text-xs font-bold text-gray-400 dark:text-gray-500 text-right pr-4 md:pr-6">
                    <span className="block">{project.quarter}</span>
                    <span className="block">{project.year}</span>
                </div>
            </div>

            <div className="flex-1">
                <div
                    className="bg-white/10 dark:bg-black/10 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300 group"
                    style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
                >
                    <div className={`flex flex-col md:items-start ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                        <button
                            type="button"
                            onClick={() => openLightbox(project.gallery || [])}
                            className={`w-full md:w-2/5 md:h-[220px] aspect-video md:aspect-auto relative overflow-hidden ${isReversed ? 'md:border-l' : 'md:border-r'} border-b md:border-b-0 border-gray-100 dark:border-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 dark:focus-visible:ring-white/60`}
                        >
                            <img
                                src={project.image}
                                alt={project.title || project.posterTitle}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                            />
                            <div className={`absolute inset-0 ${project.posterGradient} mix-blend-multiply opacity-70`} aria-hidden="true" />
                            <div
                                className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:22px_22px]"
                                aria-hidden="true"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="bg-black/60 text-white px-3 py-1 text-xs font-bold uppercase backdrop-blur-sm border border-white/20">
                                    View Gallery
                                </span>
                            </div>
                            <div className="relative z-10 h-full p-6 flex flex-col justify-end text-white text-left">
                                <div className="text-lg font-bold tracking-tight">{project.posterTitle}</div>
                                <div className="text-xs uppercase tracking-widest text-white/80">{project.posterSubtitle}</div>
                            </div>
                        </button>

                        <div className="flex-1 p-6 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-black dark:bg-white" />
                                    <h3 className="text-xl font-bold tracking-tight dark:text-white transition-colors">
                                        {project.title}
                                    </h3>
                                </div>
                                <span className="text-[10px] font-bold border border-gray-200 dark:border-gray-700 px-2 py-1 uppercase text-gray-500 dark:text-gray-400">
                                    {project.category}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-1 lowercase">
                                {project.description}
                            </p>

                            {project.scope && (
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-6">
                                    <User size={12} />
                                    <span>{project.scope}</span>
                                </div>
                            )}

                            <div className="flex flex-col gap-4 mt-auto">
                                <ProjectTags tags={project.tags} />
                                {project.links && project.links.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                            <span>{t.view}</span>
                                            <ArrowRight size={14} />
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {project.links.map(link => (
                                                <a
                                                    key={`${project.id}-${link.label}`}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={linkStyles(link.kind)}
                                                >
                                                    {link.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Lightbox = ({ images, isOpen, onClose }: { images: string[]; isOpen: boolean; onClose: () => void }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!isOpen) return undefined;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
            if (event.key === 'ArrowLeft') {
                setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
            }
            if (event.key === 'ArrowRight') {
                setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [images.length, isOpen, onClose]);

    if (!isOpen || images.length === 0) return null;
    if (typeof document === 'undefined') return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
            <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
                aria-label="Close gallery"
            >
                <X size={32} />
            </button>

            <button
                type="button"
                onClick={() => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-4 text-white hover:text-gray-300 z-50 p-2"
                aria-label="Previous image"
            >
                <ChevronLeft size={48} />
            </button>

            <img
                src={images[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain select-none"
            />

            <button
                type="button"
                onClick={() => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 text-white hover:text-gray-300 z-50 p-2"
                aria-label="Next image"
            >
                <ChevronRight size={48} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                    <button
                        key={`${images[idx]}-${idx}`}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/30'} cursor-pointer`}
                        aria-label={`Go to image ${idx + 1}`}
                    />
                ))}
            </div>
        </div>,
        document.body
    );
};

const SoftwareSection: React.FC<SoftwareSectionProps> = ({ lang = 'en' }) => {
    const t = translations[lang].software;
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentGallery, setCurrentGallery] = useState<string[]>([]);

    const projects = staticProjectData.map((project, index) => ({
        ...project,
        ...t.projects[index]
    }));

    const openLightbox = (gallery: string[]) => {
        if (gallery && gallery.length > 0) {
            setCurrentGallery(gallery);
            setLightboxOpen(true);
        }
    };

    return (
        <div className="h-full">
            <Lightbox
                key={`${currentGallery[0] || 'empty'}-${currentGallery.length}`}
                images={currentGallery}
                isOpen={lightboxOpen}
                onClose={() => {
                    setLightboxOpen(false);
                    setCurrentGallery([]);
                }}
            />
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-xl font-bold tracking-tighter uppercase transition-colors bg-black text-white dark:bg-white dark:text-black px-2 inline-block mb-1">
                        {t.header}
                    </h2>
                    <div className="text-xs text-gray-500 font-mono">{t.subheader}</div>
                </div>
            </div>

            <div className="relative">
                <div className="absolute left-[8px] md:left-[110px] top-0 bottom-0 w-[1px] bg-gray-200 dark:bg-gray-800 transition-colors" />

                <div className="space-y-12">
                    <div className="mb-16">
                        <div className="flex md:flex-row gap-8 mb-8">
                            <div className="md:w-[110px] flex-shrink-0 flex justify-end relative z-10"></div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold uppercase tracking-tight dark:text-gray-200 text-gray-800 border-b border-gray-200 dark:border-gray-800 pb-2">
                                    {t.projects_title}
                                </h3>
                            </div>
                        </div>

                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                t={t}
                                isReversed={index % 2 === 0}
                                openLightbox={openLightbox}
                            />
                        ))}
                    </div>

                    <div className="relative flex md:flex-row gap-8">
                        <div className="md:w-[110px] flex-shrink-0 flex justify-end relative z-10">
                            <div className="absolute left-[3px] md:left-auto md:right-[-5px] top-0 w-[11px] h-[11px] rounded-full border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 z-10" />
                        </div>
                        <div className="flex-1">
                            <div className="text-xs font-bold text-gray-300 dark:text-gray-600 uppercase tracking-widest pl-8 md:pl-0">
                                {t.next}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoftwareSection;
